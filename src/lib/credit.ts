export const MIN_CREDIT = 1_000;
export const MAX_CREDIT = 30_000;
export const CREDIT_STEP = 500;
export const MONTHLY_RATE = 0.0199;

export function calculateInstallment(amount: number, months: number) {
  const factor = Math.pow(1 + MONTHLY_RATE, months);
  const installment = amount * ((MONTHLY_RATE * factor) / (factor - 1));
  return { installment, total: installment * months };
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}

export function maskCpf(value: string) {
  return value.replace(/\D/g, "").slice(0, 11).replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

export function maskPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  return digits.replace(/^(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");
}