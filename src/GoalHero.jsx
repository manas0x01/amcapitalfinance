import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './goal-hero.css';

const goals = [
  { slug: 'home-loan', label: 'Home', name: 'Home loan', title: 'A place of your own.', description: 'Explore finance for a home purchase, construction or balance transfer.', image: 'home.jpg', alt: 'Contemporary home with a garden', action: 'Explore home loans' },
  { slug: 'personal-loan', label: 'Personal', name: 'Personal loan', title: 'Room for your plans.', description: 'Understand borrowing for personal needs, with repayments you can plan around.', image: 'loan-personal.jpg', alt: 'Reviewing financial paperwork at a desk', action: 'Explore personal loans' },
  { slug: 'auto-loan', label: 'Auto', name: 'Auto loan', title: 'Your next move.', description: 'Plan the down payment and repayments for an eligible new or used car.', image: 'loan-auto.jpg', alt: 'A car parked outdoors', action: 'Explore auto loans' },
  { slug: 'overdraft', label: 'Overdraft', name: 'Overdraft', title: 'Flexibility for cash flow.', description: 'Understand your borrowing limit, utilisation and interest before drawing funds.', image: 'loan-overdraft.jpg', alt: 'Calculator and financial paperwork', action: 'Explore overdrafts' },
];

export default function GoalHero() {
  const [selected, setSelected] = useState(0);
  const touch = useRef(null);
  const goal = goals[selected];
  function swipe(event) {
    if (!touch.current) return;
    const end = event.changedTouches[0];
    const dx = end.clientX - touch.current.x;
    const dy = end.clientY - touch.current.y;
    touch.current = null;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      setSelected(index => (index + (dx < 0 ? 1 : -1) + goals.length) % goals.length);
    }
  }
  return <section className="goal-hero" aria-label="Explore loan solutions">
    <div className="container goal-hero-grid">
      <div className="goal-intro">
        <p className="goal-kicker">AM CAPITAL <span>PRIVATE LIMITED COMPANY</span></p>
        <h1>Your plans.<br/><em>Our expertise.</em></h1>
        <p>Personal guidance for your next financial decision. Explore your options with a team that understands your ambitions.</p>
      </div>
      <div className="goal-choice">
        <span className="goal-choice-label" id="goal-choice-label">What would you like to finance?</span>
        <div className="goal-selector" role="group" aria-labelledby="goal-choice-label">
          {goals.map((item, index) => <button key={item.slug} type="button" aria-pressed={selected === index} aria-controls="selected-goal" onClick={() => setSelected(index)}>{item.label}</button>)}
        </div>
      </div>
      <div className="goal-visual" id="selected-goal" aria-live="polite" aria-atomic="true">
        <div className="goal-picture" onTouchStart={event => { if(event.touches.length === 1) touch.current = {x:event.touches[0].clientX,y:event.touches[0].clientY}; }} onTouchEnd={swipe} onTouchCancel={() => { touch.current = null; }}>
          <img key={goal.slug} src={`/images/${goal.image}`} alt={goal.alt} fetchPriority={selected === 0 ? 'high' : 'auto'}/>
          <div className="goal-picture-shade"/>
          <span className="goal-category">{goal.name}</span>
          <div className="goal-story"><h2>{goal.title}</h2><p>{goal.description}</p></div>
        </div>
        <div className="goal-picture-nav"><span className="goal-swipe-hint">Select a goal or swipe to explore</span><span className="goal-desktop-hint">Guidance for every chapter</span><div><button type="button" aria-label="Previous loan goal" onClick={() => setSelected((selected + goals.length - 1) % goals.length)}>Previous</button><button type="button" aria-label="Next loan goal" onClick={() => setSelected((selected + 1) % goals.length)}>Next</button></div></div>
      </div>
      <div className="goal-actions">
        <div className="goal-action-links"><Link className="button" to={`/services/${goal.slug}`} state={{from:'/'}}>{goal.action}</Link><Link className="button button-outline" to={`/contact?loan=${goal.slug}`}>Discuss my requirements</Link></div>
        <p>7+ years of industry experience <span>Established 2024</span></p>
      </div>
    </div>
  </section>;
}
