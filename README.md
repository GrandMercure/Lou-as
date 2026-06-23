# Sistema de Controle de Louças e Utensílios

**Grand Mercure Curitiba Rayon** — MVP demonstrativo para gestão de estoque de louças, talheres e utensílios.

## Tecnologias

- React + Vite
- Tailwind CSS
- React Router
- Recharts
- Local Storage (sessão e inventário)

## Como executar

```bash
npm install
npm run dev
```

## Estrutura

```
src/
├── assets/          # Logo e imagens
├── components/      # UI, layout e estoque
├── contexts/        # Auth, inventário, unidade, toast
├── data/            # Dados mockados (JSON)
├── firebase/        # Preparação para integração Firebase
├── hooks/           # Hooks customizados
├── pages/           # Login, Dashboard, Estoque, Relatórios, Config
├── routes/          # Rotas e proteção de acesso
├── services/        # Auth, inventário e storage
└── utils/           # Constantes, helpers e cálculos
```

## Próximas integrações

- Firebase Authentication
- Firestore (inventário multiunidade)
- Controle de permissões
- Exportação PDF / Excel
- Dashboard em tempo real
