export function calculateLoan(principal, annualRate, months) {
  if (![principal, annualRate, months].every(Number.isFinite) || principal <= 0 || annualRate < 0 || months <= 0) return { emi: 0, interest: 0, total: 0 };
  const r = annualRate / 1200;
  const emi = r === 0 ? principal / months : principal * r / (1 - Math.pow(1 + r, -months));
  return { emi, interest: emi * months - principal, total: emi * months };
}
export function calculateOverdraft(amount, rate, days) { return amount * rate / 100 * days / 365; }
export function amortization(principal, rate, months) {
  const { emi } = calculateLoan(principal, rate, months);
  let balance = principal;
  return Array.from({ length: months }, (_, i) => {
    const interest = balance * rate / 1200;
    const paid = Math.min(balance, emi - interest);
    balance = Math.max(0, balance - paid);
    return { month: i + 1, emi: paid + interest, principal: paid, interest, balance };
  });
}
