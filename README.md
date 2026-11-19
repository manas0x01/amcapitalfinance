# AM Capital

Responsive multi-page React website for AM Capital, Noida. Built with React, React Router, Vite and Lucide icons. Includes original supplied logo and Anil Gaur portrait.

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

## Loan discovery and homepage

The original static hero is restored: headline, supporting copy, two primary links and a property photograph. Loan selection remains in the services section. The private limited company description and formal icon cleanup are retained.

Company copy describes AM Capital as a private limited company, as supplied by the business owner. The exact registered legal name and CIN have not been supplied and are not invented. Decorative sparkle and CTA icons are removed; functional controls, loan-category and contact icons remain.

The header begins directly at the top of the page. Home and Services share image cards with purpose filters, expandable borrowing details, and links to the relevant calculator preset. Loan pages provide a visible Back to home link when opened from a homepage card, or Back to all loans when opened from Services or a direct link.

The homepage borrowing guide has selectable budget, total-cost and tenure topics plus a document checklist for salaried or self-employed applicants. These are general educational points, not eligibility decisions.

Card copy and interactions are in `src/LoanExplorer.jsx`, with responsive styles in `src/loan-explorer.css`. Generic card photographs are the `loan-*.jpg` files in `public/images/`; the original hero imagery is preserved.

## Update business information

Edit `src/config.js`. The business email is amcapitalfinance1@gmail.com. Instagram and Facebook icons remain visible with a “Link coming soon” state until their URLs are configured. They automatically become external links once provided. Email icons open the visitor’s default mail app. Anil Gaur's name and 7+ years of experience use user-supplied information; no unverified title, credentials, partner logos, ratings or testimonials have been invented.

Loan content lives in `src/data.js`. Review actual lender terms before adding specific rates, eligibility thresholds, fees or approval promises.

## Contact behaviour

The enquiry form validates name, Indian mobile number and consent, then displays a draft. The visitor explicitly opens WhatsApp and sends it there. There is no email service, submission database, CRM or automatic callback queue. No enquiry is represented as delivered before the visitor sends it. Telephone and maps links use the supplied phone and address.

## Calculators

Monthly reducing-balance EMI calculation with zero-interest handling. Home, personal and auto loan presets are illustrative, not offers. Overdraft mode uses daily simple interest on a constant utilised balance and a 365-day year. Downloadable CSV repayment schedules are available on the calculator and loan detail pages. Fees and taxes are excluded.

## Assets and references

The About page includes an office and team gallery after the company and Anil Gaur introductions. Eight user-supplied photos from `D:/amcapital/office photos` are copied, without retouching, into `public/images/office/`. The gallery uses a featured desktop composition and a touch-scrollable photo strip on mobile. Photos open in a native modal dialog with full-image display, previous/next buttons, keyboard arrows, Escape to close, touch swipes and focus restoration. The footer links directly to `/about#office-gallery`.

Gallery captions describe visible scenes without inventing staff names, award titles or dates. Implementation: `src/OfficeGallery.jsx` and `src/office-gallery.css`.

- UI reference: https://www.vitalassure.com/ — adapted into AM Capital’s red, black and white identity; no content or business claims copied.
- Logo and portrait: user-supplied.
- Illustrative lifestyle imagery: Unsplash (local images in `public/images/`). Photos are not company premises or clients.
- Google Fonts: DM Sans and Manrope, with local system fallback.
- Educational source links are included per loan in `src/data.js`.

## Deployment

Static hosting configuration is in `.openai/hosting.json`. The `scripts/static-routes.mjs` build step supports direct links to all known pages. For other hosts, deploy `dist/` and enable SPA fallback or the generated route directories.
