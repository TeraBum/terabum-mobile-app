# Estrutura de Arquivos

terabum-mobile-app/
├── src/
│   ├── navigation/
│   │   ├── AppNavigator.tsx      <- pilha principal de navegação (auth + app)
│   │   └── tabs.tsx              <- bottom tab navigation (Home, Buscar, Carrinho)
│   │
│   ├── theme/
│   │   └── theme.ts              <- tema global do React Native Paper (cores TeraBum)
│   │
│   ├── components/
│   │   ├── Header.tsx            <- cabeçalho global com identidade visual
│   │   ├── Footer.tsx            <- rodapé global do app
│   │   ├── Layout.tsx            <- wrapper com padrão de telas (header + footer)
│   │   └── ProductCard.tsx       <- card de produto usado em Home e Buscar
│   │
│   ├── screens/
│   │   ├── Home.tsx              <- página inicial (vitrine + categorias)
│   │   ├── SearchProducts.tsx    <- busca de produtos
│   │   ├── ProductDetails.tsx    <- detalhes de produto (API: vitrine/product/{id})
│   │   ├── Login.tsx             <- tela de login (UserService.login)
│   │   ├── Register.tsx          <- cadastro de usuário (UserService.register)
│   │   ├── Stock.tsx             <- estoque (listar, consultar item)
│   │   ├── Cart.tsx              <- carrinho do usuário
│   │   ├── Payment.tsx           <- checkout e pagamento
│   │   └── PaymentConfirm.tsx    <- confirmação de pagamento
│   │
│   ├── services/
│   │   ├── api.ts                <- axios configurado + baseURL
│   │   ├── userService.ts        <- autenticação, perfil e usuários
│   │   ├── vitrineService.ts     <- vitrine e produtos públicos
│   │   ├── estoqueService.ts     <- estoque e movimentações
│   │   ├── productService.ts     <- CRUD de produtos
│   │   ├── warehouseService.ts   <- CRUD de galpões
│   │   ├── cartService.ts        <- carrinho e checkout
│   │   └── paymentService.ts     <- pagamentos e status
│   │
│   ├── types/
│   │   ├── models.ts             <- interfaces (User, Product, StockItem, Cart, Order, etc.)
│   │   └── api.ts                <- tipos para erros, respostas, requisições
│   │
│   └── context/
│       └── AuthContext.tsx       <- contexto de autenticação + persistência (AsyncStorage)
│
├── .gitignore                    <- ignorar node_modules, build, expo cache
├── app.json                      <- configurações Expo (nome, ícone, slug, splash)
├── App.tsx                       <- ponto de entrada do aplicativo (providers + navigator)
├── package.json                  <- dependências do app
├── README.md                     <- documentação do projeto
└── tsconfig.json                 <- configuração TypeScript

Desenvolvimento no Expo - Snack:
https://snack.expo.dev/@daniassis/github.com-terabum-terabum-mobile-app 