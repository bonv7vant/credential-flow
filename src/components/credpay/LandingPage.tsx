import { useState, type ReactNode } from "react";
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  Clock3,
  FileCheck2,
  LockKeyhole,
  Menu,
  ShieldCheck,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { Button } from "./Button";
import { calculateInstallment, formatCurrency, MAX_CREDIT, MIN_CREDIT } from "../../lib/credit";

type LandingPageProps = { onStart: () => void };

const navItems = [
  ["Início", "#inicio"],
  ["Como funciona", "#como-funciona"],
  ["Benefícios", "#beneficios"],
  ["Segurança", "#seguranca"],
  ["Dúvidas", "#duvidas"],
] as const;

const benefits = [
  ["01", "Simulação rápida", "Consulte diferentes possibilidades de valor e prazo de forma simples."],
  ["02", "Processo simples", "Tenha uma jornada clara, com cada etapa apresentada de forma objetiva."],
  ["03", "Transparência", "Visualize as principais informações da simulação antes de continuar."],
  ["04", "Segurança", "Uma experiência desenvolvida com foco na proteção das informações."],
] as const;

const articles = [
  ["Como funciona um empréstimo?", "Entenda as etapas entre a solicitação, a análise e a apresentação das condições."],
  ["Como funciona uma simulação?", "Veja por que os valores exibidos são estimativas e o que acontece depois."],
  ["O que influencia o valor das parcelas?", "Conheça a relação entre valor solicitado, prazo, taxa e custo total."],
  ["Como escolher um prazo?", "Compare alternativas de acordo com seu planejamento e sua capacidade de pagamento."],
  ["Cuidados antes de contratar crédito", "Saiba quais informações observar antes de tomar uma decisão financeira."],
] as const;

const faqs = [
  ["Como funciona a simulação?", "Você escolhe um valor e um prazo para visualizar uma estimativa. A simulação não representa aprovação nem contratação."],
  ["A simulação possui algum custo?", "Não. A consulta inicial é gratuita e não gera compromisso de contratação."],
  ["Quais dados são necessários?", "Para continuar, solicitamos informações de identificação e contato relacionadas à análise da solicitação."],
  ["Como funciona a análise?", "As informações enviadas são avaliadas antes da apresentação de qualquer proposta. O envio não garante aprovação."],
  ["Como acompanho minha proposta?", "As orientações de acompanhamento são apresentadas após o envio da solicitação e pelos canais informados no processo."],
  ["Como funciona o pagamento?", "Valores, vencimentos e formas de pagamento devem constar na proposta final antes de qualquer decisão."],
  ["Como meus dados são tratados?", "Os dados informados são usados para esta solicitação e para as comunicações relacionadas ao processo."],
] as const;

export function LandingPage({ onStart }: LandingPageProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [previewAmount, setPreviewAmount] = useState(5000);
  const [previewMonths, setPreviewMonths] = useState(12);
  const preview = calculateInstallment(previewAmount, previewMonths);

  const goTo = (target: string) => {
    setMenuOpen(false);
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="overflow-x-clip bg-background text-foreground">
      <header className="site-header">
        <div className="site-container grid grid-cols-[minmax(0,1fr)_auto] items-center py-4 lg:grid-cols-[auto_1fr_auto] lg:gap-12">
          <Brand />
          <nav className="hidden items-center justify-center gap-8 lg:flex" aria-label="Navegação principal">
            {navItems.map(([label, href]) => <a key={href} href={href} className="nav-link">{label}</a>)}
          </nav>
          <Button className="hidden h-11 lg:inline-flex" onClick={onStart}>Simular empréstimo</Button>
          <Button variant="ghost" className="size-11 px-0 lg:hidden" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen}>
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
        {menuOpen ? <div className="mobile-menu lg:hidden"><nav className="site-container grid gap-1 py-4" aria-label="Navegação móvel">{navItems.map(([label, href]) => <a key={href} href={href} onClick={(event) => { event.preventDefault(); goTo(href); }} className="mobile-nav-link">{label}</a>)}<Button className="mt-3 w-full" onClick={onStart}>Simular empréstimo</Button></nav></div> : null}
      </header>

      <section id="inicio" className="hero-section scroll-mt-20">
        <div className="site-container hero-layout">
          <div className="hero-copy">
            <p className="eyebrow">Crédito simples, claro e digital</p>
            <h1 className="hero-title">Crédito para realizar seus planos.</h1>
            <p className="hero-description">Simule seu empréstimo de forma simples, rápida e transparente.</p>
            <div className="hero-actions">
              <Button className="w-full sm:w-auto" onClick={onStart}>Simular empréstimo <ArrowRight className="size-4" /></Button>
              <Button variant="secondary" className="w-full sm:w-auto" onClick={() => goTo("#como-funciona")}>Como funciona</Button>
            </div>
            <p className="hero-assurance"><ShieldCheck className="size-4" aria-hidden="true" /> Simulação gratuita e sem compromisso.</p>
          </div>
          <HeroVisual onStart={onStart} />
        </div>
      </section>

      <section className="section-light">
        <div className="site-container section-space">
          <SectionHeading eyebrow="Uma jornada objetiva" title="Uma experiência de crédito simples e transparente." text="Informação clara para você avaliar cada etapa com tranquilidade." dark />
          <div className="mt-12 grid border-y border-light-border sm:grid-cols-2 lg:grid-cols-4">
            <TrustPoint icon={<SlidersHorizontal />} title="Simulação online" />
            <TrustPoint icon={<Clock3 />} title="Processo simples" />
            <TrustPoint icon={<FileCheck2 />} title="Informações claras" />
            <TrustPoint icon={<ShieldCheck />} title="Segurança" />
          </div>
        </div>
      </section>

      <section id="beneficios" className="scroll-mt-20 bg-background">
        <div className="site-container section-space">
          <SectionHeading eyebrow="Benefícios" title="Por que escolher a CredPay?" text="Uma experiência construída para facilitar a compreensão e a tomada de decisão." />
          <div className="mt-14 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2">
            {benefits.map(([number, title, text]) => <article key={number} className="benefit-item"><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}
          </div>
        </div>
      </section>

      <section id="como-funciona" className="section-light scroll-mt-20">
        <div className="site-container section-space grid items-center gap-16 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHeading eyebrow="Como funciona" title="Como solicitar seu empréstimo" text="Do primeiro passo à sua proposta, você acompanha cada etapa de forma simples." dark />
            <ol className="mt-12 space-y-8">
              <ProcessStep number="01" title="Faça sua simulação">Escolha o valor que deseja simular e o prazo que melhor se encaixa no seu planejamento.</ProcessStep>
              <ProcessStep number="02" title="Informe seus dados">Preencha as informações necessárias para continuar sua solicitação.</ProcessStep>
              <ProcessStep number="03" title="Confira sua proposta">Revise as condições apresentadas antes de prosseguir.</ProcessStep>
            </ol>
          </div>
          <PhoneSimulator amount={previewAmount} months={previewMonths} installment={preview.installment} onAmount={setPreviewAmount} onMonths={setPreviewMonths} onStart={onStart} />
        </div>
      </section>

      <section className="bg-background">
        <div className="site-container section-space">
          <SectionHeading eyebrow="Informação financeira" title="Entenda sua simulação" text="Cinco informações ajudam você a comparar uma possibilidade de crédito com mais clareza." />
          <div className="mt-12 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-5">
            {[ ["Valor solicitado", "O crédito que você deseja avaliar."], ["Prazo", "O tempo previsto para pagamento."], ["Taxa de juros", "O percentual aplicado ao valor."], ["Parcela estimada", "Uma referência do pagamento mensal."], ["Custo total", "A soma estimada ao fim do prazo."] ].map(([title, text]) => <article key={title} className="definition-item"><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="section-light">
        <div className="site-container section-space grid gap-14 lg:grid-cols-2 lg:gap-24">
          <div><SectionHeading eyebrow="Transparência" title="Clareza em cada etapa." text="Antes de continuar, você deve visualizar as principais informações da simulação e entender que os valores ainda estão sujeitos à análise e às condições finais." dark /></div>
          <div className="statement-table" aria-label="Exemplo visual de informações de uma simulação">
            <StatementRow label="Valor" value="R$ 5.000,00" />
            <StatementRow label="Prazo" value="12 meses" />
            <StatementRow label="Parcela" value="Valor estimado" />
            <StatementRow label="Taxa" value="Conforme análise" />
            <StatementRow label="Total" value="Informado na proposta" strong />
          </div>
        </div>
      </section>

      <section id="seguranca" className="security-section scroll-mt-20">
        <div className="site-container section-space grid items-center gap-12 lg:grid-cols-[auto_1fr] lg:gap-20">
          <div className="security-mark"><LockKeyhole className="size-8" /></div>
          <div><p className="eyebrow">Segurança</p><h2 className="mt-5 text-3xl font-semibold sm:text-4xl">Segurança em primeiro lugar.</h2><p className="mt-5 max-w-2xl leading-7 text-muted-foreground">A proteção das informações faz parte de uma experiência financeira responsável. Por isso, solicitamos apenas os dados necessários para cada etapa e explicamos como eles serão utilizados.</p></div>
        </div>
      </section>

      <section className="section-light">
        <div className="site-container section-space">
          <SectionHeading eyebrow="Conteúdo" title="Entenda melhor o crédito" text="Informação objetiva para apoiar decisões financeiras mais conscientes." dark />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {articles.map(([title, text], index) => <article className="article-card" key={title}><span>0{index + 1}</span><BookOpen className="size-5" /><h3>{title}</h3><p>{text}</p><span className="article-action">Saiba mais <ArrowRight className="size-3.5" /></span></article>)}
          </div>
        </div>
      </section>

      <section id="duvidas" className="bg-background scroll-mt-20">
        <div className="site-container section-space grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <SectionHeading eyebrow="Dúvidas" title="Perguntas frequentes" text="Respostas diretas sobre a experiência de simulação." />
          <div className="faq-list">{faqs.map(([question, answer]) => <details key={question} className="faq-item"><summary><span>{question}</span><ChevronDown className="size-5 shrink-0" /></summary><div><p>{answer}</p></div></details>)}</div>
        </div>
      </section>

      <section className="final-cta">
        <div className="site-container py-20 text-center sm:py-28"><p className="eyebrow">Comece quando quiser</p><h2 className="mx-auto mt-5 max-w-2xl text-4xl font-semibold sm:text-5xl">Faça sua simulação.</h2><p className="mx-auto mt-5 max-w-xl leading-7 text-muted-foreground">Confira as condições disponíveis para o valor e prazo que você procura.</p><Button className="mt-8" onClick={onStart}>Simular empréstimo <ArrowRight className="size-4" /></Button></div>
      </section>

      <footer id="footer" className="border-t border-border bg-background">
        <div className="site-container grid gap-12 py-14 md:grid-cols-[1fr_auto_auto]">
          <div><Brand /><p className="mt-5 max-w-sm text-sm leading-6 text-muted-foreground">Simulação de crédito com uma experiência clara, simples e responsável.</p></div>
          <FooterGroup title="Navegação" items={navItems.map(([label, href]) => ({ label, href }))} />
          <FooterGroup title="Institucional" items={[{ label: "Termos de uso", note: "em preparação" }, { label: "Política de privacidade", note: "em preparação" }, { label: "Suporte", note: "em preparação" }]} />
        </div>
        <div className="site-container border-t border-border py-6 text-xs leading-5 text-muted-foreground">Esta página oferece apenas uma simulação. Valores, taxas e aprovação dependem de análise e da proposta final. A CredPay não cobra pagamento antecipado para liberar crédito.</div>
      </footer>
    </main>
  );
}

function Brand() { return <a href="#inicio" className="inline-flex w-fit items-baseline text-xl font-bold" aria-label="CredPay — início">cred<span className="text-primary">pay</span></a>; }

function SectionHeading({ eyebrow, title, text, dark = false }: { eyebrow: string; title: string; text: string; dark?: boolean }) {
  return <div className="max-w-2xl"><p className="eyebrow">{eyebrow}</p><h2 className={`mt-5 text-3xl font-semibold leading-tight sm:text-4xl ${dark ? "text-light-foreground" : "text-foreground"}`}>{title}</h2><p className={`mt-5 max-w-xl leading-7 ${dark ? "text-light-muted" : "text-muted-foreground"}`}>{text}</p></div>;
}

function HeroVisual({ onStart }: { onStart: () => void }) {
  return (
    <figure className="hero-visual" aria-label="Painel de simulação de crédito CredPay">
      <div className="hero-panel">
        <div className="hero-panel-header">
          <div>
            <span className="hero-panel-kicker">Simulação de crédito</span>
            <p className="hero-panel-caption">Escolha uma possibilidade</p>
          </div>
          <span className="hero-panel-status"><span aria-hidden="true" /> Online</span>
        </div>

        <div className="hero-panel-amount">
          <span>Valor desejado</span>
          <strong>R$ 8.000</strong>
        </div>

        <div className="hero-range" aria-hidden="true">
          <span className="hero-range-fill"><i /></span>
        </div>
        <div className="hero-range-labels" aria-hidden="true"><span>R$ 1 mil</span><span>R$ 30 mil</span></div>

        <div className="hero-panel-details">
          <div><span>Prazo</span><strong>12 meses</strong></div>
          <div><span>Parcela estimada</span><strong>R$ 756,02</strong></div>
        </div>

        <Button className="mt-7 w-full" onClick={onStart}>Simular agora <ArrowRight className="size-4" /></Button>
        <p className="hero-panel-note"><ShieldCheck className="size-4" aria-hidden="true" /> Você revisa as condições antes de continuar.</p>
      </div>
    </figure>
  );
}

function TrustPoint({ icon, title }: { icon: ReactNode; title: string }) { return <div className="trust-point"><span>{icon}</span><h3>{title}</h3></div>; }
function ProcessStep({ number, title, children }: { number: string; title: string; children: ReactNode }) { return <li className="process-step"><span>{number}</span><div><h3>{title}</h3><p>{children}</p></div></li>; }

function PhoneSimulator({ amount, months, installment, onAmount, onMonths, onStart }: { amount: number; months: number; installment: number; onAmount: (value: number) => void; onMonths: (value: number) => void; onStart: () => void }) {
  return <figure className="phone-stage"><div className="phone-shell"><div className="phone-speaker" /><div className="phone-screen"><Brand /><div className="mt-10"><p className="text-sm text-muted-foreground">Simule seu empréstimo</p><h3 className="mt-2 text-2xl font-semibold">Escolha uma possibilidade</h3></div><label className="sim-label"><span>Valor do empréstimo</span><strong>{formatCurrency(amount)}</strong></label><input className="credit-range" type="range" min={MIN_CREDIT} max={MAX_CREDIT} step={500} value={amount} onChange={(event) => onAmount(Number(event.target.value))} aria-label="Valor ilustrativo do empréstimo" /><label className="sim-label"><span>Prazo</span><strong>{months} meses</strong></label><input className="credit-range" type="range" min={6} max={24} step={6} value={months} onChange={(event) => onMonths(Number(event.target.value))} aria-label="Prazo ilustrativo" /><div className="phone-result"><span>Parcela estimada</span><strong>{formatCurrency(installment)}</strong><small>Taxa de exemplo: 1,99% a.m.</small></div><Button className="mt-5 w-full" onClick={onStart}>Continuar</Button><p className="mt-4 text-center text-[11px] leading-4 text-muted-foreground">Valores ilustrativos, sujeitos à análise e à proposta final.</p></div></div><figcaption>Espaço preparado para receber o mockup final</figcaption></figure>;
}

function StatementRow({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) { return <div className="statement-row"><span>{label}</span><strong className={strong ? "text-primary" : undefined}>{value}</strong></div>; }

function FooterGroup({ title, items }: { title: string; items: Array<{ label: string; href?: string; note?: string }> }) {
  return <div><h2 className="text-sm font-semibold">{title}</h2><ul className="mt-4 space-y-3 text-sm text-muted-foreground">{items.map((item) => <li key={item.label}>{item.href ? <a href={item.href} className="footer-link">{item.label}</a> : <span>{item.label} <small>({item.note})</small></span>}</li>)}</ul></div>;
}