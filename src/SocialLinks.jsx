import { Instagram, MessageCircle, Phone } from 'lucide-react';
import { company } from './config';
import './social-links.css';

function InstagramBrandIcon() {
  return <span className="brand-icon instagram-brand" aria-hidden="true"><Instagram size={21} strokeWidth={2}/></span>;
}

function FacebookBrandIcon() {
  return <svg className="brand-icon facebook-brand" width="28" height="28" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="12" fill="#0866ff"/>
    <path fill="#fff" d="M13.6 24v-9.2h3.1l.46-3.6H13.6V8.9c0-1.04.29-1.75 1.79-1.75h1.91V3.94a25.55 25.55 0 0 0-2.79-.14c-2.77 0-4.67 1.69-4.67 4.79v2.61H6.7v3.6h3.14V24z"/>
  </svg>;
}

export function GmailIcon({ size = 19 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M3 19V7l9 7 9-7v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 7V5l9 7 9-7v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>;
}

export default function SocialLinks() {
  return <div className="socials" role="group" aria-label="Social media and contact">
    {[[InstagramBrandIcon, 'Instagram', company.instagram], [FacebookBrandIcon, 'Facebook', company.facebook]].map(([Icon, name, url]) =>
      url ? <a key={name} className={`social-brand social-${name.toLowerCase()}`} href={url} aria-label={name === 'Instagram' ? 'Instagram — @amcapitalfinance' : name} title={name === 'Instagram' ? '@amcapitalfinance' : name} target="_blank" rel="noreferrer"><Icon/></a>
        : <button key={name} className={`social-pending social-brand social-${name.toLowerCase()}`} type="button" aria-disabled="true" aria-label={`${name} — link coming soon`}>
          <Icon/><span className="social-tooltip">{name} · Link coming soon</span>
        </button>
    )}
    <a href={`mailto:${company.email}`} aria-label={`Email AM Capital at ${company.email}`} title={company.email}><GmailIcon/></a>
    <a href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent('Hello AM Capital, I would like to discuss a loan.')}`} aria-label="Chat on WhatsApp" title="WhatsApp" target="_blank" rel="noreferrer"><MessageCircle size={19} aria-hidden="true"/></a>
    <a href={company.phoneHref} aria-label="Call AM Capital" title="Call AM Capital"><Phone size={19} aria-hidden="true"/></a>
  </div>;
}
