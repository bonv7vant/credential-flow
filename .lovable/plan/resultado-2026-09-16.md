Reconstrução da landing page CredPay

## Resultado

Uma landing page longa, institucional e responsiva, com identidade própria da CredPay, mantendo React, TypeScript e o simulador existente.

## Implementação

- Reorganizar a página em componentes reutilizáveis: cabeçalho, hero, confiança, benefícios, processo, demonstração no smartphone, educação financeira, transparência, segurança, conteúdos, FAQ, chamada final e rodapé.
- Preservar integralmente o fluxo atual de simulação, cadastro, revisão e confirmação — incluindo cálculos e validações — alterando somente a ligação dos novos botões e preparando uma futura rota `/simulador` sem criar um link quebrado agora.
- Criar áreas estáveis para as futuras imagens do hero e do smartphone, com proporções, textos alternativos, carregamento e posicionamento já definidos.
- Consolidar o sistema visual em tokens: preto/grafite, branco e verde financeiro; Inter; bordas discretas; raios pequenos; sem brilho, gradientes chamativos ou glassmorphism.
- Implementar menu móvel acessível, accordion navegável por teclado, sliders interativos e microinterações discretas.

## Organização técnica

- Separar os principais blocos da landing page em um conjunto enxuto de componentes dentro da área CredPay.
- Substituir estilos antigos conflitantes, preservando apenas utilitários e cálculos válidos.
- Manter metadados próprios da página e não alterar backend, pagamentos, autenticação ou dados persistentes.

## Validação

- Conferir compilação, imports, console, navegação e funcionamento dos CTAs.
- Revisar visualmente desktop e mobile, incluindo larguras críticas, foco por teclado e ausência de rolagem horizontal.