# AM Capital

Responsive multi-page React website for AM Capital, Noida. Built with React, React Router, Vite and Lucide icons. Includes original supplied logo and Anil Yadav portrait.

## Run locally

```sh
npm install
npm run dev
```

## Check and build

```sh
npm test
npm run build
npm run preview
```

The production output is `dist/`. The build copies the app shell into each known route for direct static-host visits. Unknown routes use the React 404 page when the host serves `404.html` or has an SPA fallback.

## Pages

Home, About, Services, Home Loan, Personal Loan, Auto Loan, Overdraft, Calculators, Contact, Privacy Policy, Terms & Disclosures, and a not-found page.

## Update business information

Edit `src/config.js`. Email, Facebook and Instagram are intentionally empty until the business supplies them. Their UI links appear automatically when configured. Anil Yadav's name and 7+ years of experience use user-supplied information; no unverified title, credentials, partner logos, ratings or testimonials have been invented.

Loan content lives in `src/data.js`. Review actual lender terms before adding specific rates, eligibility thresholds, fees or approval promises.

## Contact behaviour

The enquiry form validates name, Indian mobile number and consent, then displays a draft. The visitor explicitly opens WhatsApp and sends it there. There is no email service, submission database, CRM or automatic callback queue. No enquiry is represented as delivered before the visitor sends it. Telephone and maps links use the supplied phone and address.

## Calculators

Monthly reducing-balance EMI calculation with zero-interest handling. Home, personal and auto loan presets are illustrative, not offers. Overdraft mode uses daily simple interest on a constant utilised balance and a 365-day year. Downloadable CSV repayment schedules are available on the calculator and loan detail pages. Fees and taxes are excluded.

## Assets and references

- UI reference: https://www.vitalassure.com/ — adapted into AM Capital’s red, black and white identity; no content or business claims copied.
- Logo and portrait: user-supplied.
- Illustrative lifestyle imagery: Unsplash (local images in `public/images/`). Photos are not company premises or clients.
- Google Fonts: DM Sans and Manrope, with local system fallback.
- Educational source links are included per loan in `src/data.js`.

## Deployment

Static hosting configuration is in `.openai/hosting.json`. The `scripts/static-routes.mjs` build step supports direct links to all known pages. For other hosts, deploy `dist/` and enable SPA fallback or the generated route directories.
