import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { House, Wallet, CarFront, ChartNoAxesCombined, Check, Plus, Minus, Calculator, FileCheck2 } from 'lucide-react';
import { loans } from './data';
import './loan-explorer.css';

const cardContent = {
  'home-loan': { icon: House, image: 'loan-home.jpg', alt: 'House keys and a model home', category: 'Property finance', purpose: 'Buy a home', text: 'Finance a home purchase or construction, or explore transferring an existing home loan.', repayment: 'Monthly instalments', security: 'Property being financed' },
  'personal-loan': { icon: Wallet, image: 'loan-personal.jpg', alt: 'Reviewing paperwork at a desk', category: 'Personal finance', purpose: 'Personal needs', text: 'Plan for a renovation, a family milestone or other eligible personal expenses.', repayment: 'Monthly instalments', security: 'Generally no collateral' },
  'auto-loan': { icon: CarFront, image: 'loan-auto.jpg', alt: 'A car parked outdoors', category: 'Vehicle finance', purpose: 'Buy a car', text: 'Explore finance for an eligible new or used car and plan your down payment.', repayment: 'Monthly instalments', security: 'Vehicle hypothecation' },
  overdraft: { icon: ChartNoAxesCombined, image: 'loan-overdraft.jpg', alt: 'A calculator and financial paperwork', category: 'Flexible credit', purpose: 'Manage cash flow', text: 'Access funds within an approved limit, with interest generally based on the amount used.', repayment: 'As per facility terms', security: 'Depends on the facility' },
};

function LoanCard({ loan, index }) {
  const [expanded, setExpanded] = useState(false);
  const { pathname } = useLocation();
  const detail = cardContent[loan.slug];
  const Icon = detail.icon;
  const target = `/services/${loan.slug}`;
  return <article className={`loan-card loan-card-${loan.slug} ${expanded ? 'is-expanded' : ''}`}>
    <Link to={target} state={{ from: pathname }} className="loan-card-photo" aria-label={`View ${loan.name.toLowerCase()}`}>
      <img src={`/images/${detail.image}`} alt={detail.alt} loading="lazy" width="800" height="500"/>
      <span className="loan-card-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
      <span className="loan-card-badge" aria-hidden="true"><Icon size={26}/></span>
      <span className="loan-card-image-caption">{detail.purpose}<span>{loan.short}</span></span>
    </Link>
    <div className="loan-card-body">
      <div className="loan-card-heading"><span className="loan-card-category">{detail.category}</span></div>
      <h3><Link to={target} state={{ from: pathname }}>{loan.name}</Link></h3>
      <p>{detail.text}</p>
      <div className="loan-card-repayment"><span>Repayment</span><strong>{detail.repayment}</strong></div>
      <div className="loan-card-chips">{loan.features.slice(0, 2).map(f => <span key={f}><Check size={13} aria-hidden="true"/>{f}</span>)}</div>
      <button className="loan-card-toggle" aria-expanded={expanded} aria-controls={`summary-${loan.slug}`} onClick={() => setExpanded(!expanded)}>
        {expanded ? 'Hide details' : 'At a glance'}{expanded ? <Minus size={17}/> : <Plus size={17}/>}
      </button>
      <div className="loan-card-actions">
        <Link className="button" to={target} state={{ from: pathname }} aria-label={`Explore ${loan.name.toLowerCase()}`}>Explore loan</Link>
        <Link className="loan-card-calc" to={`/calculators?loan=${loan.slug}`} aria-label={loan.slug === 'overdraft' ? 'Estimate overdraft interest' : `Calculate ${loan.name.toLowerCase()} EMI`}><Calculator size={20}/><span>{loan.slug === 'overdraft' ? 'Interest' : 'EMI'}</span></Link>
      </div>
    </div>
    <div className="loan-card-details" id={`summary-${loan.slug}`} hidden={!expanded}>
      <dl><div><dt>Security</dt><dd>{detail.security}</dd></div></dl>
      <ul>{loan.features.map(feature => <li key={feature}><Check size={15} aria-hidden="true"/><span>{feature}</span></li>)}</ul>
      <p>Eligibility, costs and terms are decided by the lender.</p>
    </div>
  </article>;
}

export function LoanExplorer() {
  const [filter, setFilter] = useState('all');
  const visible = filter === 'all' ? loans : loans.filter(loan => loan.slug === filter);
  return <div className="loan-explorer">
    <div className="loan-filter-bar"><span>What are you planning?</span><div className="loan-filters" role="group" aria-label="Filter loans by purpose">
      <button aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>All loans</button>
      {loans.map(loan => <button key={loan.slug} aria-pressed={filter === loan.slug} onClick={() => setFilter(loan.slug)}>{cardContent[loan.slug].purpose}</button>)}
    </div></div>
    <p className="sr-only" role="status">Showing {visible.length} loan {visible.length === 1 ? 'option' : 'options'}</p>
    <div className={`loan-card-grid ${filter !== 'all' ? 'is-filtered' : ''}`}>{visible.map(loan => <LoanCard loan={loan} index={loans.indexOf(loan)} key={loan.slug}/>)}</div>
  </div>;
}

const planningTopics = [
  { label: 'Monthly budget', title: 'Start with a repayment you can live with.', text: 'Look at your regular income, essential spending and existing EMIs before deciding how much to borrow. Leave room for unexpected expenses.', points: ['Estimate the monthly repayment with our calculator.', 'For a car, allow for insurance, fuel and maintenance.', 'For a home, budget separately for your own contribution and purchase expenses.'] },
  { label: 'Total cost', title: 'Look beyond the headline interest rate.', text: 'Ask for the lender’s written cost breakdown. The rate is only one part of the decision; fees and repayment terms also matter.', points: ['Compare APR and the total repayment where applicable.', 'Check processing fees, taxes and other applicable charges.', 'Understand prepayment terms and late-payment charges before accepting.'] },
  { label: 'Loan tenure', title: 'Balance a comfortable EMI with total interest.', text: 'A longer tenure usually reduces each monthly instalment, but can increase the interest you pay overall. Try different durations to understand the trade-off.', points: ['Compare two tenures using the same amount and rate.', 'Ask how a floating-rate change could affect EMI or tenure.', 'For overdrafts, check interest servicing and facility review dates.'] },
];

export function BorrowingGuide() {
  const [topic, setTopic] = useState(0);
  const [employment, setEmployment] = useState('salaried');
  const current = planningTopics[topic];
  return <section className="borrowing-guide section"><div className="container">
    <div className="section-head"><div><div className="eyebrow"><span/>KNOW MORE. BORROW THOUGHTFULLY.</div><h2>A clearer plan,<br/>before you apply.</h2></div><p>Understand the costs and prepare the essentials.<br/>A little groundwork makes the next step easier.</p></div>
    <div className="borrowing-layout"><div className="planning-panel">
      <div className="planning-tabs" role="group" aria-label="Borrowing planning topics">{planningTopics.map((item, index) => <button key={item.label} aria-pressed={topic === index} onClick={() => setTopic(index)}>{item.label}</button>)}</div>
      <div className="planning-content" aria-live="polite"><h3>{current.title}</h3><p>{current.text}</p><ul>{current.points.map(point => <li key={point}><Check size={18} aria-hidden="true"/><span>{point}</span></li>)}</ul></div>
      <Link to="/calculators" className="text-link"><Calculator size={18}/> Explore the loan calculators</Link>
    </div><aside className="documents-panel"><div className="documents-heading"><FileCheck2 size={25}/><h3>Your starting checklist</h3></div><p>Common documents lenders may request.</p>
      <label htmlFor="employment-checklist">Your work profile</label><select id="employment-checklist" value={employment} onChange={event => setEmployment(event.target.value)}><option value="salaried">Salaried</option><option value="self-employed">Self-employed</option></select>
      <ul aria-live="polite">{['PAN and accepted identity / address proof', ...(employment === 'salaried' ? ['Recent salary slips and Form 16'] : ['ITRs and business financials']), 'Recent bank statements', 'Property or vehicle documents, if applicable'].map(item => <li key={item}><span>{item}</span></li>)}</ul>
      <p className="fine-print">Exact requirements depend on the product and lender. Share documents only through the appropriate secure application process.</p>
      <Link to="/contact" className="text-link">Ask about your application</Link>
    </aside></div>
  </div></section>;
}
