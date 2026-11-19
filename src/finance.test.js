import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calculateLoan, calculateOverdraft, amortization } from './finance.js';
test('reducing balance EMI matches known loan example', () => { assert.ok(Math.abs(calculateLoan(100000, 12, 12).emi - 8884.88) < 0.01); });
test('zero-interest loan and invalid input stay finite', () => { assert.equal(calculateLoan(120000, 0, 12).emi, 10000); assert.equal(calculateLoan(1, 10, 0).emi, 0); });
test('schedule pays down full principal', () => { const rows = amortization(500000, 10.5, 60); assert.ok(rows.at(-1).balance < 0.001); assert.ok(Math.abs(rows.reduce((s, x) => s + x.principal, 0) - 500000) < 0.001); });
test('overdraft charges the drawn amount for specified days', () => { assert.equal(calculateOverdraft(100000, 12, 365), 12000); assert.equal(calculateOverdraft(0, 12, 30), 0); });
