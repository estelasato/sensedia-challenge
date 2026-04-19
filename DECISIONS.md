## Decisão: seleção da font
**Contexto:** definir uma fonte padrão para a interface do sistema.

**Decisão:** fonte Inter do `next/font/google` no `layout` raiz (`variable: "--font-sans"`), aplicada no `<html>`.

**Trade-offs:** boa legibilidade; pouca personalidade .



## Decisão: gerenciar estado do formulário e validação

**Contexto:** definir estratégia para gerenciamento de estado do formulário do user e validação 
dos dados.

**Opções consideradas:** utilizar useState + validação manual; Formik; React Hook Form.

**Decisão:** React Hook Form + Zod , com `Controller`.

**Trade-offs:** menos re-renders e regras centralizadas no schema; um pouco mais de complexidade para integrar as duas bibliotecas.



## Decisão: navegação por query string (lista de usuários)

**Contexto:** paginação, busca e ordenação usam searchParams; atualizar a URL sem disparar `router.replace` à toa evita `useTransition` pendente e re-fetch desnecessário.

**Decisão:** hook `useUrlNavigation`: compara os parametros atuais com o estado anterior, chama o router.replace em `startTransition` para centralizar fluxo

**Trade-offs:** evita re-render desnecessário e flicker de loading, comparação simples, menos robusta; sem normalização dos parametros 



## Decisão: fetching de dados

**Contexto:** a API retorna usuários, posts e álbuns; as opções de dias da semana e cidades é simulada no Next pois não existe no back.

**Opções consideradas:** `fetch` no cliente; Server Actions; Route Handlers .

**Decisão:**

- **Leituras em páginas RSC:** `page.tsx` chama funções em `src/lib` (ex.: `getUsersWithCounts`, `getUserById`) que fazem `fetch` à API externa, com cache/tags conforme cada service e agregação (posts/álbuns por usuário quando necessário).

- **Mutações:** Server Actions chamam o `userService` e depois `updateTag("users")` para atualizar com dados cacheados por tag.

- **Route Handlers:** para os dados mockados (user logado e opções de cidades e dias da semana)

- **Cliente após mutação:** `router.refresh()` onde faz sentido para reexecutar os Server Components com dados atualizados.

**Trade-offs:** RSC mantém a maior parte do JS fora do bundle do cliente; Server Actions evitam expor detalhes de mutação em vários lugares; mais camadas/conceitos a serem mantidos
