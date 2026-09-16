import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, ChevronLeft, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { z } from "zod";
import { Button } from "../components/credpay/Button";
import { LandingPage } from "../components/credpay/LandingPage";
import { calculateInstallment, formatCurrency, maskCpf, maskPhone, MAX_CREDIT, MIN_CREDIT } from "../lib/credit";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "CredPay — Simulação de crédito pessoal" },
    { name: "description", content: "Simule seu crédito pessoal online com transparência, segurança e sem cobrança antecipada." },
    { property: "og:title", content: "CredPay — Crédito no seu ritmo" },
    { property: "og:description", content: "Faça uma simulação gratuita e receba uma proposta personalizada." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

type Step = "home" | "simulation" | "registration" | "review" | "success";

const registrationSchema = z.object({
  name: z.string().trim().min(3, "Informe seu nome completo").max(100),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF incompleto"),
  phone: z.string().regex(/^\(\d{2}\) \d{5}-\d{4}$/, "Telefone incompleto"),
  email: z.string().trim().email("Informe um e-mail válido").max(255),
});

function Index() {
  const [step, setStep] = useState<Step>("home");
  const [amount, setAmount] = useState(8000);
  const [months, setMonths] = useState(12);
  const [form, setForm] = useState({ name: "", cpf: "", phone: "", email: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const result = useMemo(() => calculateInstallment(amount, months), [amount, months]);

  const start = () => { setStep("simulation"); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const back = () => setStep(step === "registration" ? "simulation" : "home");

  if (step !== "home") {
    return (
      <main className="min-h-screen bg-background px-5 py-6 text-foreground sm:px-8">
        <div className="mx-auto max-w-lg">
          <header className="mb-10 flex items-center justify-between">
            <button onClick={step === "success" ? () => setStep("home") : back} className="grid size-10 place-items-center rounded-md border border-border bg-secondary text-foreground" aria-label="Voltar"><ChevronLeft className="size-5" /></button>
            <span className="text-lg font-extrabold">cred<span className="text-primary">pay</span></span>
            <span className="text-xs font-medium text-muted-foreground">{step === "simulation" ? "1 de 3" : step === "registration" ? "2 de 3" : "3 de 3"}</span>
          </header>

          {step === "simulation" && <section>
            <p className="mb-3 text-sm font-semibold text-primary">SIMULAÇÃO GRATUITA</p>
            <h1 className="text-3xl font-bold leading-tight">Quanto você precisa?</h1>
            <p className="mt-3 text-muted-foreground">Ajuste os valores para visualizar uma estimativa. Nenhuma contratação acontece nesta etapa.</p>
            <div className="surface-glass mt-8 rounded-lg p-6">
              <p className="text-sm text-muted-foreground">Valor desejado</p>
              <p className="mt-2 text-4xl font-extrabold">{formatCurrency(amount)}</p>
              <input aria-label="Valor do crédito" className="mt-7 w-full accent-primary" type="range" min={MIN_CREDIT} max={MAX_CREDIT} step={500} value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
              <div className="mt-2 flex justify-between text-xs text-muted-foreground"><span>R$ 1 mil</span><span>R$ 30 mil</span></div>
              <div className="mt-7 border-t border-border pt-6">
                <p className="text-sm text-muted-foreground">Escolha o prazo</p>
                <div className="mt-3 grid grid-cols-4 gap-2">{[6, 12, 18, 24].map((item) => <button key={item} onClick={() => setMonths(item)} className={`h-11 rounded-md border text-sm font-semibold transition ${months === item ? "border-primary bg-primary text-primary-foreground" : "border-border bg-secondary text-secondary-foreground"}`}>{item}x</button>)}</div>
              </div>
            </div>
            <div className="my-5 flex items-end justify-between rounded-lg bg-secondary p-5"><div><p className="text-xs text-muted-foreground">Parcela estimada</p><p className="mt-1 text-2xl font-bold">{formatCurrency(result.installment)}</p></div><p className="text-right text-xs text-muted-foreground">Total estimado<br />{formatCurrency(result.total)}</p></div>
            <p className="mb-5 text-xs leading-relaxed text-muted-foreground">Taxa estimada de 1,99% a.m. Sujeito à análise, disponibilidade e condições finais da proposta.</p>
            <Button className="w-full" onClick={() => setStep("registration")}>Continuar <ArrowRight className="size-4" /></Button>
          </section>}

          {step === "registration" && <Registration form={form} errors={errors} onChange={(key, value) => setForm((old) => ({ ...old, [key]: value }))} onSubmit={() => {
            const parsed = registrationSchema.safeParse(form);
            if (!parsed.success) { setErrors(Object.fromEntries(parsed.error.issues.map((issue) => [String(issue.path[0]), issue.message]))); return; }
            setErrors({}); setStep("review");
          }} />}

          {step === "review" && <section>
            <p className="mb-3 text-sm font-semibold text-primary">RESUMO DA SIMULAÇÃO</p>
            <h1 className="text-3xl font-bold">Tudo certo, {form.name.split(" ")[0]}.</h1>
            <p className="mt-3 text-muted-foreground">Confira sua estimativa antes de enviar para análise.</p>
            <div className="surface-glass mt-8 rounded-lg p-6"><div className="flex justify-between border-b border-border pb-5"><span className="text-muted-foreground">Crédito solicitado</span><strong>{formatCurrency(amount)}</strong></div><div className="flex justify-between py-5"><span className="text-muted-foreground">Pagamento estimado</span><strong>{months}x de {formatCurrency(result.installment)}</strong></div><div className="rounded-md bg-accent p-4 text-sm text-muted-foreground"><ShieldCheck className="mb-2 size-5 text-primary" />O envio não garante aprovação nem gera cobrança. A proposta final exibirá todas as taxas e condições.</div></div>
            <Button className="mt-6 w-full" onClick={() => setStep("success")}>Enviar para análise <ArrowRight className="size-4" /></Button>
          </section>}

          {step === "success" && <section className="pt-12 text-center"><div className="mx-auto grid size-18 place-items-center rounded-full bg-primary/15 text-primary"><Check className="size-9" /></div><h1 className="mt-7 text-3xl font-bold">Solicitação recebida</h1><p className="mx-auto mt-4 max-w-sm text-muted-foreground">Enviamos a confirmação para {form.email}. Se houver uma proposta disponível, você receberá os termos completos antes de decidir.</p><div className="mt-8 rounded-lg border border-border bg-secondary p-5 text-left text-sm"><p className="font-semibold">Importante</p><p className="mt-2 text-muted-foreground">A CredPay não cobra depósito ou taxa antecipada para liberar crédito.</p></div><Button variant="secondary" className="mt-8 w-full" onClick={() => setStep("home")}>Voltar ao início</Button></section>}
        </div>
      </main>
    );
  }

  return <LandingPage onStart={start} />;
}

function Registration({ form, errors, onChange, onSubmit }: { form: Record<string,string>; errors: Record<string,string>; onChange: (key:string,value:string) => void; onSubmit: () => void }) {
  const fields = [{ key:"name", label:"Nome completo", type:"text", placeholder:"Como aparece no documento" },{ key:"cpf", label:"CPF", type:"text", placeholder:"000.000.000-00" },{ key:"phone", label:"Celular", type:"tel", placeholder:"(00) 00000-0000" },{ key:"email", label:"E-mail", type:"email", placeholder:"voce@email.com" }];
  return <section><p className="mb-3 text-sm font-semibold text-primary">SEUS DADOS</p><h1 className="text-3xl font-bold">Vamos conhecer você.</h1><p className="mt-3 text-muted-foreground">Usaremos seus dados apenas para esta solicitação e comunicações relacionadas.</p><div className="mt-8 space-y-5">{fields.map((field) => <label key={field.key} className="block"><span className="mb-2 block text-sm font-medium">{field.label}</span><input value={form[field.key]} onChange={(e) => onChange(field.key, field.key === "cpf" ? maskCpf(e.target.value) : field.key === "phone" ? maskPhone(e.target.value) : e.target.value)} type={field.type} placeholder={field.placeholder} className="h-13 w-full rounded-md border border-input bg-secondary px-4 text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20" />{errors[field.key] ? <span className="mt-1.5 block text-xs text-destructive">{errors[field.key]}</span> : null}</label>)}</div><label className="mt-6 flex gap-3 text-xs leading-relaxed text-muted-foreground"><input required type="checkbox" className="mt-0.5 size-4 accent-primary" /> Autorizo o uso dos dados para análise desta solicitação, conforme a política de privacidade.</label><Button className="mt-7 w-full" onClick={onSubmit}>Ver resumo <ArrowRight className="size-4" /></Button></section>;
}
