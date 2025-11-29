# Estrutura de Arquivos

```
terabum-mobile-app/
├── src/
│   ├── navigation/
│   │   ├── AppNavigator.tsx          # Stack navigation (auth + tabs + modals)
│   │   └── Tabs.tsx                  # Bottom tabs (Home, Buscar, Cart)
│   │
│   ├── theme/
│   │   └── terabumTheme.js           # Tema do React Native Paper
│   │
│   ├── components/
│   │   ├── Body.tsx                  # Layout base de conteúdo
│   │   ├── CategoryCard.tsx          # Card de categoria
│   │   ├── Footer.tsx                # Rodapé padrão
│   │   ├── Header.tsx                # Cabeçalho global
│   │   ├── Input.tsx                 # Input customizado
│   │   ├── Layout.tsx                # Wrapper (Header + Body + Footer)
│   │   ├── ProductCard.tsx           # Card de produto
│   │   ├── ProductGrid.tsx           # Grade de produtos
│   │   └── TeraButton.tsx            # Botão customizado da marca
│   │
│   ├── context/
│   │   └── AuthContext.tsx           # Login, logout, persistência com AsyncStorage
│   │
│   ├── screens/
│   │   ├── Home.tsx                  # Home / vitrine
│   │   ├── SearchProducts.tsx        # Busca
│   │   ├── ProductDetails.tsx        # Detalhes do produto
│   │   ├── Cart.tsx                  # Carrinho
│   │   ├── Payment.tsx               # Checkout
│   │   ├── PaymentConfirm.tsx        # Confirmação de compra
│   │   ├── Login.tsx                 # Login
│   │   ├── Register.tsx              # Cadastro
│   │   ├── Stock.tsx                 # Estoque (uso interno)
│   │   └── Profile.tsx               # Perfil do usuário
│   │
│   ├── services/
│   │   ├── api.ts                    # Axios + interceptors + baseURL
│   │   ├── userService.ts            # Login, cadastro, perfil
│   │   ├── vitrineService.ts         # Produtos públicos
│   │   ├── estoqueService.ts         # Estoque
│   │   ├── productService.ts         # CRUD de produtos
│   │   ├── warehouseService.ts       # CRUD galpões
│   │   ├── cartService.ts            # Carrinho
│   │   ├── orderService.ts           # Pedidos
│   │   └── paymentService.ts         # Pagamento
│   │
│   ├── types/
│   │   ├── api.ts                    # Tipos de respostas e erros
│   │   ├── models.ts                 # Interfaces: User, Product, Cart, etc.
│   │   └── navigation.ts             # Tipagem das rotas
│   │
│   └── .env                          # Variáveis de ambiente
│
├── App.tsx                           # Ponto de entrada principal
├── app.json                          # Configuração Expo
├── package.json                      # Dependências
├── package-lock.json                 # Gerado automaticamente
├── tsconfig.json                     # Config do TypeScript
├── README.md                         # Documentação do projeto
└── .gitignore                        # Ignora node_modules, build, etc

```

Desenvolvimento no Expo - Snack:
https://snack.expo.dev/@daniassis/github.com-terabum-terabum-mobile-app 
