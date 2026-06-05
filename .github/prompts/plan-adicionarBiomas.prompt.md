## Plan: Adicionar biomas brasileiros completos

TL;DR: Expandir a enumeração de biomas e atualizar todos os controles de seleção / filtro de biomas para incluir os seis biomas brasileiros (Amazônia, Cerrado, Mata Atlântica, Caatinga, Pantanal e Pampa), sem duplicar os que já existem.

**Steps**
1. Atualizar `src/types.ts` para incluir `'Pampa'` no tipo `BiomeType`.
2. Atualizar `src/components/AuthModal.tsx` para adicionar a opção `Pampa` no seletor de "Bioma de Atuação".
3. Atualizar `src/components/ExplorarBiomas.tsx`:
   - incluir `Pampa` em `BIOME_IMAGES` com `src` e `alt` apropriados;
   - incluir `Pampa` na lista de botões de filtro (`['Cerrado', 'Amazônia', 'Mata Atlântica', 'Caatinga', 'Pantanal', 'Pampa', 'Todos']`);
   - ajustar o título/legenda para não exibir "Cerrado" quando `selectedBiome === 'Todos'`, mostrando "Todos os Biomas".
4. Atualizar `src/components/RitualContribuicao.tsx` para adicionar o botão `Pampa` na barra de seleção de biomas.

**Relevant files**
- `/workspaces/Teoria-e-Futuro-do-Design/src/types.ts`
- `/workspaces/Teoria-e-Futuro-do-Design/src/components/AuthModal.tsx`
- `/workspaces/Teoria-e-Futuro-do-Design/src/components/ExplorarBiomas.tsx`
- `/workspaces/Teoria-e-Futuro-do-Design/src/components/RitualContribuicao.tsx`

**Verification**
1. Verificar compilação do TypeScript após a atualização.
2. Validar manualmente se `Pampa` aparece nas seleções de bioma em `AuthModal`, `ExplorarBiomas` e `RitualContribuicao`.
3. Confirmar que `ExplorarBiomas` não quebra ao selecionar `Pampa` e que `Todos` exibe um texto correto.

**Decisions**
- O foco é adicionar a possibilidade de `Pampa` sem duplicar biomas já existentes.
- Não serão criados novos dados de amostra para `Pampa`, apenas a opção de seleção nos controles existentes.
