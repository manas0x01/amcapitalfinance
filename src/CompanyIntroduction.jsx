import { Link } from 'react-router-dom';
import './company-introduction.css';

export default function CompanyIntroduction() {
  return <section className="container section company-introduction" aria-labelledby="company-introduction-heading">
    <div className="company-introduction-copy">
      <div className="eyebrow"><span/>THE COMPANY</div>
      <h2 id="company-introduction-heading">AM CAPITAL FINANCE.<br/>Guidance for your next step.</h2>
      <p>AM CAPITAL FINANCE is a private limited company established in 2024 and based in Noida, Uttar Pradesh. We provide loan guidance and application support for people planning a home purchase, a new vehicle, personal expenses or flexible access to funds.</p>
      <p>Our services cover home loans, personal loans, auto loans and overdrafts. We help you understand the documentation, repayment structure and costs involved, so you can approach your application with a clearer picture of your options.</p>
      <p>Our approach is personal and straightforward: understand your requirements, explain the next steps and help you navigate the application process. Loan approval and terms remain subject to the respective lender’s assessment.</p>
      <Link className="text-link" to="/services">Explore our loan services</Link>
    </div>
    <aside className="company-facts" aria-label="Company at a glance">
      <h3>Company at a glance</h3>
      <dl>
        <div><dt>Established</dt><dd>2024</dd></div>
        <div><dt>Company structure</dt><dd>Private limited</dd></div>
        <div><dt>Based in</dt><dd>Noida, Uttar Pradesh</dd></div>
        <div><dt>Our focus</dt><dd>Loan guidance &amp; application support</dd></div>
      </dl>
      <p>D-35, Sector 2, Noida – 201301</p>
    </aside>
  </section>;
}
