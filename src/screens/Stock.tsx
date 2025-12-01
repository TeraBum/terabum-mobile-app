import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import {
  ActivityIndicator,
  Button,
  Card,
  Divider,
  Switch,
  Text,
  TextInput,
} from "react-native-paper";
import axios from "axios";
import Layout from "../components/Layout";
import { estoqueService } from "../services/estoqueService";
import { useAuth } from "../context/AuthContext";

type StockItem = {
  product_id: string | null;
  warehouse_id: string | null;
  quantity: number | null;
  reserved: number | null;
  updated_at?: string | null;
};

type StockProduct = {
  id: string | null;
  name: string | null;
  description: string | null;
  price: number | null;
  category: string | null;
  imagesJson?: unknown;
  isActive: boolean | null;
};

type CreateFormState = {
  product_id: string;
  warehouse_id: string;
  quantity: string;
  reserved: string;
};

type EditFormState = {
  quantity: string;
  reserved: string;
};

type BaixaFormState = {
  product_id: string;
  warehouse_id: string;
  quantity: string;
};

type ProductFormState = {
  name: string;
  description: string;
  price: string;
  category: string;
  imagesJson: string;
  isActive: boolean;
};

type ActionLoadingState = {
  createStock: boolean;
  updateStock: boolean;
  deleteStock: boolean;
  baixaStock: boolean;
  createProduct: boolean;
  updateProduct: boolean;
  deleteProduct: boolean;
};

const initialCreateState: CreateFormState = {
  product_id: "",
  warehouse_id: "",
  quantity: "",
  reserved: "",
};

const initialEditState: EditFormState = {
  quantity: "",
  reserved: "",
};

const initialBaixaState: BaixaFormState = {
  product_id: "",
  warehouse_id: "",
  quantity: "",
};

const initialProductCreateState: ProductFormState = {
  name: "",
  description: "",
  price: "",
  category: "",
  imagesJson: "",
  isActive: true,
};

const initialProductEditState: ProductFormState = {
  name: "",
  description: "",
  price: "",
  category: "",
  imagesJson: "",
  isActive: false,
};

const PRODUCT_PAGE_SIZE = 10;

const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as {
      msg?: string;
      message?: string;
      error?: string;
      detail?: string;
    };
    return (
      data?.msg ||
      data?.message ||
      data?.error ||
      data?.detail ||
      "Erro ao comunicar com o serviço de estoque."
    );
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "Erro inesperado ao comunicar com o serviço de estoque.";
};

const parseImagesJson = (raw: string): unknown | undefined => {
  const trimmed = raw.trim();
  if (!trimmed) {
    return undefined;
  }
  try {
    return JSON.parse(trimmed);
  } catch (err) {
    throw new Error("Formato de JSON de imagens inválido.");
  }
};

export default function Stock({ navigation }) {
  const { initializing, isAdmin } = useAuth();
  const [items, setItems] = useState<StockItem[]>([]);
  const [products, setProducts] = useState<StockProduct[]>([]);
  const [selectedItem, setSelectedItem] = useState<StockItem | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<StockProduct | null>(
    null
  );
  const [createForm, setCreateForm] = useState<CreateFormState>(
    initialCreateState
  );
  const [editForm, setEditForm] = useState<EditFormState>(initialEditState);
  const [baixaForm, setBaixaForm] = useState<BaixaFormState>(initialBaixaState);
  const [productCreateForm, setProductCreateForm] =
    useState<ProductFormState>(initialProductCreateState);
  const [productEditForm, setProductEditForm] = useState<ProductFormState>(
    initialProductEditState
  );
  const [actionLoading, setActionLoading] = useState<ActionLoadingState>({
    createStock: false,
    updateStock: false,
    deleteStock: false,
    baixaStock: false,
    createProduct: false,
    updateProduct: false,
    deleteProduct: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [productPage, setProductPage] = useState(1);

  useEffect(() => {
    if (!isAdmin || initializing) {
      return;
    }

    const loadData = async () => {
      resetMessages();
      setLoading(true);
      await Promise.all([fetchItems(), fetchProducts()]);
      setLoading(false);
    };

    loadData();
  }, [isAdmin, initializing]);

  useEffect(() => {
    setProductPage((prev) => {
      const totalPages = Math.max(
        1,
        Math.ceil(products.length / PRODUCT_PAGE_SIZE)
      );
      if (prev < 1) {
        return 1;
      }
      if (prev > totalPages) {
        return totalPages;
      }
      return prev;
    });
  }, [products.length]);

  const resetMessages = () => {
    setError(null);
    setFeedback(null);
  };

  const fetchItems = async (): Promise<StockItem[]> => {
    try {
      const list = await estoqueService.listStock();
      const parsed = Array.isArray(list) ? list : [];
      setItems(parsed);
      return parsed;
    } catch (err) {
      setError(getErrorMessage(err));
      return [];
    }
  };

  const fetchProducts = async (preservePage = false): Promise<StockProduct[]> => {
    try {
      const list = await estoqueService.listStockProducts();
      const parsed = Array.isArray(list) ? list : [];
      setProducts(parsed);
      if (!preservePage) {
        setProductPage(1);
      }
      return parsed;
    } catch (err) {
      setError(getErrorMessage(err));
      return [];
    }
  };

  const handleSelectItem = (item: StockItem) => {
    resetMessages();
    setSelectedItem(item);
    setEditForm({
      quantity:
        item.quantity !== null && item.quantity !== undefined
          ? String(item.quantity)
          : "",
      reserved:
        item.reserved !== null && item.reserved !== undefined
          ? String(item.reserved)
          : "",
    });
    setBaixaForm((prev) => ({
      ...prev,
      product_id: item.product_id ?? "",
      warehouse_id: item.warehouse_id ?? "",
    }));
  };

  const handleCreateStock = async () => {
    resetMessages();

    if (
      !createForm.product_id.trim() ||
      !createForm.warehouse_id.trim() ||
      createForm.quantity.trim() === "" ||
      createForm.reserved.trim() === ""
    ) {
      setError("Preencha todos os campos para cadastrar um item.");
      return;
    }

    const quantity = parseInt(createForm.quantity, 10);
    const reserved = parseInt(createForm.reserved, 10);

    if (Number.isNaN(quantity) || quantity < 0) {
      setError("Quantidade deve ser um número inteiro maior ou igual a zero.");
      return;
    }

    if (Number.isNaN(reserved) || reserved < 0) {
      setError("Reservado deve ser um número inteiro maior ou igual a zero.");
      return;
    }

    setActionLoading((prev) => ({ ...prev, createStock: true }));

    try {
      await estoqueService.createStockItem({
        product_id: createForm.product_id.trim(),
        warehouse_id: createForm.warehouse_id.trim(),
        quantity,
        reserved,
      });
      setFeedback("Item de estoque criado com sucesso.");
      setCreateForm(initialCreateState);
      setBaixaForm((prev) => ({
        ...prev,
        product_id: "",
        warehouse_id: "",
      }));
      await fetchItems();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setActionLoading((prev) => ({ ...prev, createStock: false }));
    }
  };

  const handleUpdateStock = async () => {
    if (!selectedItem || !selectedItem.product_id || !selectedItem.warehouse_id) {
      setError("Selecione um item válido para atualizar.");
      return;
    }

    resetMessages();

    if (!editForm.quantity.trim() && !editForm.reserved.trim()) {
      setError("Informe a nova quantidade e/ou reservado para atualizar.");
      return;
    }

    const payload: Record<string, string | number> = {
      product_id: selectedItem.product_id,
      warehouse_id: selectedItem.warehouse_id,
    };

    if (editForm.quantity.trim()) {
      const quantity = parseInt(editForm.quantity, 10);
      if (Number.isNaN(quantity) || quantity < 0) {
        setError("Quantidade deve ser um número inteiro maior ou igual a zero.");
        return;
      }
      payload.quantity = quantity;
    }

    if (editForm.reserved.trim()) {
      const reserved = parseInt(editForm.reserved, 10);
      if (Number.isNaN(reserved) || reserved < 0) {
        setError("Reservado deve ser um número inteiro maior ou igual a zero.");
        return;
      }
      payload.reserved = reserved;
    }

    setActionLoading((prev) => ({ ...prev, updateStock: true }));

    try {
      await estoqueService.updateStock(
        selectedItem.warehouse_id,
        selectedItem.product_id,
        payload
      );
      setFeedback("Item de estoque atualizado com sucesso.");
      const updated = await fetchItems();
      const refreshed = updated.find(
        (item) =>
          item.product_id === selectedItem.product_id &&
          item.warehouse_id === selectedItem.warehouse_id
      );
      setSelectedItem(refreshed ?? null);
      if (refreshed) {
        setEditForm({
          quantity:
            refreshed.quantity !== null && refreshed.quantity !== undefined
              ? String(refreshed.quantity)
              : "",
          reserved:
            refreshed.reserved !== null && refreshed.reserved !== undefined
              ? String(refreshed.reserved)
              : "",
        });
      } else {
        setEditForm(initialEditState);
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setActionLoading((prev) => ({ ...prev, updateStock: false }));
    }
  };

  const handleDeleteStock = (item: StockItem) => {
    if (!item.product_id || !item.warehouse_id) {
      setError("Não foi possível identificar o item selecionado.");
      return;
    }

    Alert.alert(
      "Remover item",
      "Tem certeza que deseja remover este item do estoque?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover",
          style: "destructive",
          onPress: async () => {
            resetMessages();
            setActionLoading((prev) => ({ ...prev, deleteStock: true }));
            try {
              await estoqueService.deleteStock(
                item.warehouse_id as string,
                item.product_id as string
              );
              setFeedback("Item removido do estoque.");
              const updated = await fetchItems();
              if (
                selectedItem &&
                selectedItem.product_id === item.product_id &&
                selectedItem.warehouse_id === item.warehouse_id
              ) {
                const refreshed = updated.find(
                  (it) =>
                    it.product_id === item.product_id &&
                    it.warehouse_id === item.warehouse_id
                );
                if (!refreshed) {
                  setSelectedItem(null);
                  setEditForm(initialEditState);
                }
              }
            } catch (err) {
              setError(getErrorMessage(err));
            } finally {
              setActionLoading((prev) => ({ ...prev, deleteStock: false }));
            }
          },
        },
      ]
    );
  };

  const handleBaixa = async () => {
    resetMessages();

    if (
      !baixaForm.product_id.trim() ||
      !baixaForm.warehouse_id.trim() ||
      baixaForm.quantity.trim() === ""
    ) {
      setError("Preencha produto, armazém e quantidade para registrar a baixa.");
      return;
    }

    const quantity = parseInt(baixaForm.quantity, 10);
    if (Number.isNaN(quantity) || quantity <= 0) {
      setError("Quantidade da baixa deve ser um inteiro maior que zero.");
      return;
    }

    setActionLoading((prev) => ({ ...prev, baixaStock: true }));

    try {
      await estoqueService.baixaEstoque({
        product_id: baixaForm.product_id.trim(),
        warehouse_id: baixaForm.warehouse_id.trim(),
        quantity,
      });
      setFeedback("Baixa registrada com sucesso.");
      setBaixaForm((prev) => ({ ...prev, quantity: "" }));
      const updated = await fetchItems();
      if (selectedItem) {
        const refreshed = updated.find(
          (item) =>
            item.product_id === selectedItem.product_id &&
            item.warehouse_id === selectedItem.warehouse_id
        );
        setSelectedItem(refreshed ?? null);
        if (refreshed) {
          setEditForm({
            quantity:
              refreshed.quantity !== null && refreshed.quantity !== undefined
                ? String(refreshed.quantity)
                : "",
            reserved:
              refreshed.reserved !== null && refreshed.reserved !== undefined
                ? String(refreshed.reserved)
                : "",
          });
        }
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setActionLoading((prev) => ({ ...prev, baixaStock: false }));
    }
  };

  const handleProductSelect = (product: StockProduct) => {
    resetMessages();
    setSelectedProduct(product);
    setProductEditForm({
      name: product.name ?? "",
      description: product.description ?? "",
      price:
        product.price !== null && product.price !== undefined
          ? String(product.price)
          : "",
      category: product.category ?? "",
      imagesJson: product.imagesJson ? JSON.stringify(product.imagesJson) : "",
      isActive: product.isActive ?? false,
    });
  };

  const handleProductCreate = async () => {
    resetMessages();

    if (
      !productCreateForm.name.trim() ||
      !productCreateForm.description.trim() ||
      !productCreateForm.category.trim() ||
      !productCreateForm.price.trim()
    ) {
      setError("Preencha os campos obrigatórios para cadastrar um produto.");
      return;
    }

    const price = Number(productCreateForm.price);
    if (Number.isNaN(price) || price <= 0) {
      setError("Preço deve ser um número maior que zero.");
      return;
    }

    let imagesJson: unknown | undefined;
    try {
      imagesJson = parseImagesJson(productCreateForm.imagesJson);
    } catch (err) {
      setError(getErrorMessage(err));
      return;
    }

    setActionLoading((prev) => ({ ...prev, createProduct: true }));

    try {
      await estoqueService.createStockProduct({
        name: productCreateForm.name.trim(),
        description: productCreateForm.description.trim(),
        category: productCreateForm.category.trim(),
        price,
        imagesJson,
        isActive: productCreateForm.isActive,
      });
      setFeedback("Produto cadastrado com sucesso.");
      setProductCreateForm(initialProductCreateState);
      await fetchProducts();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setActionLoading((prev) => ({ ...prev, createProduct: false }));
    }
  };

  const handleProductUpdate = async () => {
    if (!selectedProduct || !selectedProduct.id) {
      setError("Selecione um produto para atualizar.");
      return;
    }

    resetMessages();

    if (
      !productEditForm.name.trim() ||
      !productEditForm.description.trim() ||
      !productEditForm.category.trim() ||
      !productEditForm.price.trim()
    ) {
      setError("Preencha os campos obrigatórios para atualizar o produto.");
      return;
    }

    const price = Number(productEditForm.price);
    if (Number.isNaN(price) || price <= 0) {
      setError("Preço deve ser um número maior que zero.");
      return;
    }

    let imagesJson: unknown | undefined;
    try {
      imagesJson = parseImagesJson(productEditForm.imagesJson);
    } catch (err) {
      setError(getErrorMessage(err));
      return;
    }

    setActionLoading((prev) => ({ ...prev, updateProduct: true }));

    try {
      await estoqueService.updateStockProduct(selectedProduct.id, {
        name: productEditForm.name.trim(),
        description: productEditForm.description.trim(),
        category: productEditForm.category.trim(),
        price,
        imagesJson,
        isActive: productEditForm.isActive,
      });
      setFeedback("Produto atualizado com sucesso.");
      const updated = await fetchProducts(true);
      const refreshed = updated.find((product) => product.id === selectedProduct.id);
      setSelectedProduct(refreshed ?? null);
      if (refreshed) {
        setProductEditForm({
          name: refreshed.name ?? "",
          description: refreshed.description ?? "",
          price:
            refreshed.price !== null && refreshed.price !== undefined
              ? String(refreshed.price)
              : "",
          category: refreshed.category ?? "",
          imagesJson: refreshed.imagesJson
            ? JSON.stringify(refreshed.imagesJson)
            : "",
          isActive: refreshed.isActive ?? false,
        });
      } else {
        setProductEditForm(initialProductEditState);
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setActionLoading((prev) => ({ ...prev, updateProduct: false }));
    }
  };

  const handleProductDelete = (product: StockProduct) => {
    if (!product.id) {
      setError("Não foi possível identificar o produto selecionado.");
      return;
    }

    Alert.alert(
      "Remover produto",
      "Tem certeza que deseja remover este produto?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover",
          style: "destructive",
          onPress: async () => {
            resetMessages();
            setActionLoading((prev) => ({ ...prev, deleteProduct: true }));
            try {
              await estoqueService.deleteStockProduct(product.id as string);
              setFeedback("Produto removido com sucesso.");
              const updated = await fetchProducts(true);
              if (
                selectedProduct &&
                selectedProduct.id &&
                selectedProduct.id === product.id
              ) {
                const refreshed = updated.find(
                  (item) => item.id === selectedProduct.id
                );
                if (!refreshed) {
                  setSelectedProduct(null);
                  setProductEditForm(initialProductEditState);
                }
              }
            } catch (err) {
              setError(getErrorMessage(err));
            } finally {
              setActionLoading((prev) => ({ ...prev, deleteProduct: false }));
            }
          },
        },
      ]
    );
  };

  const totalProductPages = Math.max(
    1,
    Math.ceil(products.length / PRODUCT_PAGE_SIZE)
  );

  const productRangeStart =
    products.length === 0 ? 0 : (productPage - 1) * PRODUCT_PAGE_SIZE + 1;
  const productRangeEnd = Math.min(
    productPage * PRODUCT_PAGE_SIZE,
    products.length
  );

  const visibleProducts = useMemo(() => {
    const start = (productPage - 1) * PRODUCT_PAGE_SIZE;
    return products.slice(start, start + PRODUCT_PAGE_SIZE);
  }, [products, productPage]);

  if (initializing) {
    return (
      <Layout navigation={navigation}>
        <View style={styles.centered}>
          <ActivityIndicator />
        </View>
      </Layout>
    );
  }

  if (!isAdmin) {
    return (
      <Layout navigation={navigation}>
        <View style={styles.centered}>
          <Text variant="titleMedium" style={{ textAlign: "center" }}>
            Você precisa ser Administrador para acessar esta área.
          </Text>
          <Button
            mode="contained"
            style={{ marginTop: 16 }}
            onPress={() => navigation.goBack()}
          >
            Voltar
          </Button>
        </View>
      </Layout>
    );
  }

  return (
    <Layout navigation={navigation}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text variant="headlineSmall" style={styles.title}>
          Administração de Estoque
        </Text>

        {error && (
          <Card style={[styles.messageCard, styles.errorCard]}>
            <Card.Content>
              <Text style={{ color: "#B00020" }}>{error}</Text>
            </Card.Content>
          </Card>
        )}

        {feedback && (
          <Card style={[styles.messageCard, styles.successCard]}>
            <Card.Content>
              <Text style={{ color: "#1B5E20" }}>{feedback}</Text>
            </Card.Content>
          </Card>
        )}

        {loading ? (
          <View style={styles.centered}>
            <ActivityIndicator />
          </View>
        ) : (
          <>
            <Card style={styles.section}>
              <Card.Title
                title="Itens em estoque"
                subtitle="Clique em um item para carregar os detalhes"
                right={() => (
                  <Button
                    compact
                    onPress={() => {
                      resetMessages();
                      fetchItems();
                    }}
                  >
                    Atualizar
                  </Button>
                )}
              />
              <Card.Content>
                {items.length === 0 ? (
                  <Text>Nenhum item cadastrado ainda.</Text>
                ) : (
                  items.map((item, idx) => {
                    const isSelected =
                      selectedItem &&
                      selectedItem.product_id === item.product_id &&
                      selectedItem.warehouse_id === item.warehouse_id;
                    return (
                      <View
                        key={`${item.warehouse_id}-${item.product_id}-${idx}`}
                        style={[
                          styles.stockItem,
                          isSelected && styles.selectedCard,
                        ]}
                      >
                        <Text variant="titleMedium" style={styles.bold}>
                          Produto: {item.product_id ?? "-"}
                        </Text>
                        <Text>Armazém: {item.warehouse_id ?? "-"}</Text>
                        <Text>Quantidade: {item.quantity ?? 0}</Text>
                        <Text>Reservado: {item.reserved ?? 0}</Text>
                        <View style={styles.row}>
                          <Button
                            mode="outlined"
                            style={styles.rowButton}
                            onPress={() => handleSelectItem(item)}
                          >
                            Selecionar
                          </Button>
                          <Button
                            mode="text"
                            textColor="#B00020"
                            style={[styles.rowButton, styles.rowButtonLast]}
                            loading={actionLoading.deleteStock}
                            onPress={() => handleDeleteStock(item)}
                          >
                            Remover
                          </Button>
                        </View>
                      </View>
                    );
                  })
                )}
              </Card.Content>
            </Card>

            <Card style={styles.section}>
              <Card.Title title="Criar item de estoque" />
              <Card.Content>
                <TextInput
                  label="ID do produto"
                  value={createForm.product_id}
                  onChangeText={(value) =>
                    setCreateForm((prev) => ({ ...prev, product_id: value }))
                  }
                  style={styles.input}
                />
                <TextInput
                  label="ID do armazém"
                  value={createForm.warehouse_id}
                  onChangeText={(value) =>
                    setCreateForm((prev) => ({ ...prev, warehouse_id: value }))
                  }
                  style={styles.input}
                />
                <View style={styles.row}>
                  <View style={styles.rowInput}>
                    <TextInput
                      label="Quantidade"
                      value={createForm.quantity}
                      onChangeText={(value) =>
                        setCreateForm((prev) => ({ ...prev, quantity: value }))
                      }
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={styles.rowInput}>
                    <TextInput
                      label="Reservado"
                      value={createForm.reserved}
                      onChangeText={(value) =>
                        setCreateForm((prev) => ({ ...prev, reserved: value }))
                      }
                      keyboardType="numeric"
                    />
                  </View>
                </View>
                <Button
                  mode="contained"
                  style={styles.submitButton}
                  onPress={handleCreateStock}
                  loading={actionLoading.createStock}
                >
                  Cadastrar item
                </Button>

                <Divider style={styles.divider} />

                <Text variant="titleMedium">Atualizar item selecionado</Text>
                <View style={styles.row}>
                  <View style={styles.rowInput}>
                    <TextInput
                      label="Nova quantidade"
                      value={editForm.quantity}
                      onChangeText={(value) =>
                        setEditForm((prev) => ({ ...prev, quantity: value }))
                      }
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={styles.rowInput}>
                    <TextInput
                      label="Novo reservado"
                      value={editForm.reserved}
                      onChangeText={(value) =>
                        setEditForm((prev) => ({ ...prev, reserved: value }))
                      }
                      keyboardType="numeric"
                    />
                  </View>
                </View>
                <Button
                  mode="contained-tonal"
                  style={styles.submitButton}
                  onPress={handleUpdateStock}
                  loading={actionLoading.updateStock}
                  disabled={!selectedItem}
                >
                  Atualizar item
                </Button>

                <Divider style={styles.divider} />

                <Text variant="titleMedium">Registrar baixa</Text>
                <TextInput
                  label="ID do produto"
                  value={baixaForm.product_id}
                  onChangeText={(value) =>
                    setBaixaForm((prev) => ({ ...prev, product_id: value }))
                  }
                  style={styles.input}
                />
                <TextInput
                  label="ID do armazém"
                  value={baixaForm.warehouse_id}
                  onChangeText={(value) =>
                    setBaixaForm((prev) => ({ ...prev, warehouse_id: value }))
                  }
                  style={styles.input}
                />
                <TextInput
                  label="Quantidade a dar baixa"
                  value={baixaForm.quantity}
                  onChangeText={(value) =>
                    setBaixaForm((prev) => ({ ...prev, quantity: value }))
                  }
                  keyboardType="numeric"
                />
                <Button
                  mode="contained-tonal"
                  style={styles.submitButton}
                  onPress={handleBaixa}
                  loading={actionLoading.baixaStock}
                >
                  Registrar baixa
                </Button>
              </Card.Content>
            </Card>

            <Card style={styles.section}>
              <Card.Title
                title="Produtos cadastrados"
                subtitle={`Exibindo ${productRangeStart}-${productRangeEnd} de ${products.length}`}
                right={() => (
                  <Button
                    compact
                    onPress={() => {
                      resetMessages();
                      fetchProducts();
                    }}
                  >
                    Atualizar
                  </Button>
                )}
              />
              <Card.Content>
                {visibleProducts.length === 0 ? (
                  <Text>Nenhum produto cadastrado.</Text>
                ) : (
                  visibleProducts.map((product, idx) => {
                    const isSelected = product.id === selectedProduct?.id;
                    return (
                      <View
                        key={product.id ?? `product-${productRangeStart + idx}`}
                        style={[
                          styles.productCard,
                          isSelected && styles.selectedCard,
                        ]}
                      >
                        <Text variant="titleMedium" style={styles.bold}>
                          {product.name ?? "Sem nome"}
                        </Text>
                        <Text>Categoria: {product.category ?? "-"}</Text>
                        <Text>Preço: R$ {product.price ?? 0}</Text>
                        <Text>
                          Status: {product.isActive ? "Ativo" : "Inativo"}
                        </Text>
                        <View style={styles.row}>
                          <Button
                            mode="outlined"
                            style={styles.rowButton}
                            onPress={() => handleProductSelect(product)}
                          >
                            Editar
                          </Button>
                          <Button
                            mode="text"
                            textColor="#B00020"
                            style={[styles.rowButton, styles.rowButtonLast]}
                            loading={actionLoading.deleteProduct}
                            onPress={() => handleProductDelete(product)}
                          >
                            Remover
                          </Button>
                        </View>
                      </View>
                    );
                  })
                )}

                <View style={styles.pagination}>
                  <Button
                    compact
                    mode="outlined"
                    onPress={() => setProductPage((prev) => prev - 1)}
                    disabled={productPage <= 1}
                  >
                    Anterior
                  </Button>
                  <Text>
                    Página {productPage} de {totalProductPages}
                  </Text>
                  <Button
                    compact
                    mode="outlined"
                    onPress={() => setProductPage((prev) => prev + 1)}
                    disabled={productPage >= totalProductPages}
                  >
                    Próxima
                  </Button>
                </View>
              </Card.Content>
            </Card>

            <Card style={styles.section}>
              <Card.Title title="Cadastrar produto" />
              <Card.Content>
                <TextInput
                  label="Nome"
                  value={productCreateForm.name}
                  onChangeText={(value) =>
                    setProductCreateForm((prev) => ({ ...prev, name: value }))
                  }
                  style={styles.input}
                />
                <TextInput
                  label="Descrição"
                  value={productCreateForm.description}
                  onChangeText={(value) =>
                    setProductCreateForm((prev) => ({
                      ...prev,
                      description: value,
                    }))
                  }
                  multiline
                  style={styles.input}
                />
                <TextInput
                  label="Categoria"
                  value={productCreateForm.category}
                  onChangeText={(value) =>
                    setProductCreateForm((prev) => ({
                      ...prev,
                      category: value,
                    }))
                  }
                  style={styles.input}
                />
                <TextInput
                  label="Preço"
                  value={productCreateForm.price}
                  onChangeText={(value) =>
                    setProductCreateForm((prev) => ({ ...prev, price: value }))
                  }
                  keyboardType="numeric"
                  style={styles.input}
                />
                <TextInput
                  label="JSON de imagens (opcional)"
                  value={productCreateForm.imagesJson}
                  onChangeText={(value) =>
                    setProductCreateForm((prev) => ({
                      ...prev,
                      imagesJson: value,
                    }))
                  }
                  multiline
                  style={styles.input}
                />
                <View style={styles.switchRow}>
                  <Text>Produto ativo?</Text>
                  <Switch
                    value={productCreateForm.isActive}
                    onValueChange={(value) =>
                      setProductCreateForm((prev) => ({
                        ...prev,
                        isActive: value,
                      }))
                    }
                  />
                </View>
                <Button
                  mode="contained"
                  style={styles.submitButton}
                  onPress={handleProductCreate}
                  loading={actionLoading.createProduct}
                >
                  Cadastrar produto
                </Button>

                <Divider style={styles.divider} />

                <Text variant="titleMedium">Editar produto selecionado</Text>
                <TextInput
                  label="Nome"
                  value={productEditForm.name}
                  onChangeText={(value) =>
                    setProductEditForm((prev) => ({ ...prev, name: value }))
                  }
                  style={styles.input}
                />
                <TextInput
                  label="Descrição"
                  value={productEditForm.description}
                  onChangeText={(value) =>
                    setProductEditForm((prev) => ({
                      ...prev,
                      description: value,
                    }))
                  }
                  multiline
                  style={styles.input}
                />
                <TextInput
                  label="Categoria"
                  value={productEditForm.category}
                  onChangeText={(value) =>
                    setProductEditForm((prev) => ({
                      ...prev,
                      category: value,
                    }))
                  }
                  style={styles.input}
                />
                <TextInput
                  label="Preço"
                  value={productEditForm.price}
                  onChangeText={(value) =>
                    setProductEditForm((prev) => ({ ...prev, price: value }))
                  }
                  keyboardType="numeric"
                  style={styles.input}
                />
                <TextInput
                  label="JSON de imagens"
                  value={productEditForm.imagesJson}
                  onChangeText={(value) =>
                    setProductEditForm((prev) => ({
                      ...prev,
                      imagesJson: value,
                    }))
                  }
                  multiline
                  style={styles.input}
                />
                <View style={styles.switchRow}>
                  <Text>Produto ativo?</Text>
                  <Switch
                    value={productEditForm.isActive}
                    onValueChange={(value) =>
                      setProductEditForm((prev) => ({
                        ...prev,
                        isActive: value,
                      }))
                    }
                  />
                </View>
                <Button
                  mode="contained-tonal"
                  style={styles.submitButton}
                  onPress={handleProductUpdate}
                  loading={actionLoading.updateProduct}
                  disabled={!selectedProduct}
                >
                  Atualizar produto
                </Button>
              </Card.Content>
            </Card>
          </>
        )}
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  messageCard: {
    marginBottom: 16,
  },
  errorCard: {
    backgroundColor: "#FDECEA",
  },
  successCard: {
    backgroundColor: "#E8F5E9",
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 32,
  },
  stockItem: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  selectedCard: {
    borderColor: "#2D7DF4",
  },
  bold: {
    fontWeight: "600",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
  },
  rowButton: {
    flex: 1,
    marginRight: 8,
  },
  rowButtonLast: {
    marginRight: 0,
  },
  input: {
    marginBottom: 12,
  },
  rowInput: {
    flex: 1,
    marginRight: 8,
  },
  submitButton: {
    marginTop: 12,
  },
  divider: {
    marginVertical: 16,
  },
  productCard: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  pagination: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
});
