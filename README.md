# Credential Flow

🏗️ ESPECIFICAÇÃO TÉCNICA: PROJETO CREDPAY (FUNNEL DE CONVERSÃO HIGH-END)

Contexto: A CredPay é uma plataforma de conversão de alto impacto baseada em um modelo de crédito rápido. O objetivo é criar uma experiência que simule uma Fintech de elite (estilo C6 Bank), mas estruturada para um funil de vendas agressivo para tráfego pago (Ads).

🎯 1. OBJETIVO PRINCIPAL DO PROJETO

O objetivo não é um site institucional, mas sim uma Landing Page de Alta Conversão. A página deve guiar o usuário por um funil psicológico: Curiosidade \rightarrow Simulação \rightarrow Proposta \rightarrow Conversão (Taxa) \rightarrow Retenção (Manutenção).

A experiência deve ser visualmente impecável, transmitindo autoridade, segurança e profissionalismo, escondendo a natureza do fluxo por trás de uma estética de banco digital premium.

🎨 2. IDENTIDADE VISUAL E ESTÉTICA (DESIGN SYSTEM)

O design deve ser Premium, Sóbrio e Institucional. Evite o visual "futurista/neon" ou "site de IA".

Paleta de Cores (Strictly Follow):

Base: Preto Profundo (#080909), Grafite (#121212).

Destaque (CTAs): Verde Esmeralda (#00C853) para botões de ação e indicadores de sucesso.

Texto: Off-White (#F5F7F7) para leitura e Cinza Médio (#8E9AAF) para informações secundárias.

Diretrizes de Design:

Estilo: Glassmorphism sutil, sombras suaves (depth), bordas arredondadas discretas (border-radius) e tipografia forte (Inter/Poppins).

Hierarquia: Uso agressivo de espaços negativos para focar a atenção no conteúdo principal.

Componentes: Cards sólidos, botões com estados de hover profissionais e micro-interações de transição suave.

Responsividade: O foco é Mobile-First. O site deve parecer um Web-App nativo em smartphones (otimizado para tráfego de TikTok/Instagram).

🔄 3. O FUNNEL DE CONVERSÃO (USER JOURNEY)

O projeto deve ser construído para suportar o seguinte fluxo de navegação:

Fase 1: Landing Page (O Gancho)

Hero Section: Headline de alto impacto sobre "Crédito Imediato". Deve conter um mockup de smartphone exibindo um dashboard de "Crédito Aprovado".

Seção de Autoridade: Elementos que transmitam segurança (Simulação Online, Processo Rápido, Segurança de Dados).

CTA Principal: Botão de alto contraste para "Simular Empréstimo".

Fase 2: Simulador (O Engajamento)

Interação: O usuário deve selecionar o valor desejado (Slider/Input) e o prazo (meses).

Dinâmica: Mostrar o cálculo de parcelas e o valor total de forma clara, mas mantendo o aspecto de simulação.

Fase 3: Cadastro (A Captura)

Fluxo: Após a simulação, o usuário é direcionado para uma etapa de cadastro rápido (Nome, CPF, Telefone, E-mail).

Validação: Implementar máscaras de input (CPF, Telefone) e validação de campos para manter o profissionalismo.

Fase 4: Checkout (A Conversão - Taxa de Ativação)

O Gatilho: Após o cadastro, o usuário é levado para a tela de pagamento da "Taxa de Ativação do Limite".

Métodos de Pagamento: Implementar interface para seleção entre PIX (Instantâneo) e Cartão de Crédito (Simulado).

Experiência de Pagamento: Implementar um overlay de "Processando Pagamento" com mensagens de status (ex: "Validando transação...", "Sincronizando com o banco...").

Fase 5: Manutenção (O Fechamento do Ciclo)

O Desfecho: Após o checkout simulado, o usuário é redirecionado para uma tela de "Manutenção de Sistema".

Mensagem de Retenção: "Sua ativação foi processada. Devido ao alto volume de acessos, o limite será liberado em sua conta em até 72 horas. Acompanhe pelo seu e-mail."

🛠️ 4. REQUISITOS TÉCNICOS E ARQUITETURA

Arquitetura de Código: Modular (Componentes, Páginas, Estilos e Utils separados).

Gerenciamento de Estado: Implementar um StateController para gerenciar o fluxo do usuário (simulação, dados de cadastro, status de pagamento).

Performance: Carregamento rápido, animações leves e otimização para dispositivos móveis.

Segurança Visual: O site deve parecer um banco real, utilizando termos profissionais e design institucional.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/3ba6907c-164a-46fd-9c2a-a2e6293ac789).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
