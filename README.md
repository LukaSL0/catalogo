# Catálogo de Vinhos

Aplicação web para consulta e gestão de um catálogo de vinhos construída em React + TypeScript. Inclui área pública de navegação, detalhamento dos rótulos, bloqueio opcional de preços, e painel administrativo para CRUD de produtores e vinhos.

## Sumário
- [Stack](#stack)
- [Principais Recursos](#principais-recursos)
- [Arquitetura & Padrões](#arquitetura--padrões)
- [Fluxo de Autenticação](#fluxo-de-autenticação)
- [Segurança & Boas Práticas](#segurança--boas-práticas)

## Stack
- Front-end: React JS + TypeScript
- Estilização: Sass (módulos modernizados com `@use`/`@forward`)
- HTTP Client: Axios (`src/Api.tsx` com interceptor de token)
- Roteamento: React Router DOM
- Gestão de Estado Global: Context API (`DataContext`)
- Build tooling: react-scripts (Webpack/Babel)

## Principais Recursos
- Listagem dinâmica de produtores e vinhos com busca por nome, filtragem por país e agrupamento por região
- Página de detalhes do vinho (`/vinho/:slug`) com características completas
- Bloqueio de exibição de preço, liberado via modal de senha (controle local `localStorage`)
- Painel Admin com:
	- Toggle de status geral do catálogo (manutenção / online)
	- CRUD de Produtores (ordenação automática por `ordem`)
	- CRUD de Vinhos (incremento automático de `id`)
	- Upload de imagens (Cloudinary – detalhes censurados)
	- Controle de visibilidade individual de rótulos
- Autenticação protegendo rotas administrativas (JWT Token + Verificação em `/auth`)

## Arquitetura & Padrões
- Separação por domínio: `components/`, `contexts/`, `style/`, `modules/`
- Tipos fortes centralizados em `components/Types.tsx`
- Interceptor Axios injeta `x-access-token` se existir `_token` no `localStorage`
- Reutilização de mixins Sass (`responsive`, `fontSize`) via módulo `_globals.scss`
- Estilos agregados em `style/style.scss` com `@forward`
- Componentes focados: containers (ex.: `Home`, `Admin`) + componentes específicos (`PasswordModal`, `GerenciarVinho`)

## Fluxo de Autenticação
1. Usuário realiza login (`/login`) enviando credenciais para `/login`
2. Token JWT retornado é salvo em `localStorage` sob `_token`
3. `ProtectedRoute` chama `/auth` => renderiza `Outlet`, se falhar => força `Login`
4. Requests subsequentes enviam header `x-access-token`
5. Logout implícito: remoção manual do token ou expiração server-side

## Segurança & Boas Práticas
- Token sempre enviado em header customizado
- Remoção de token em falha de autenticação
- Tipagem TypeScript para evitar acesso incorreto a campos dinâmicos
- Migração Sass para `@use` elimina avisos de depreciação futuros