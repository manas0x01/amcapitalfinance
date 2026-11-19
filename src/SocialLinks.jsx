import { Instagram, Facebook, MessageCircle, Phone } from 'lucide-react';
import { company } from './config';
import './social-links.css';

export function GmailIcon({ size = 19 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M3 19V7l9 7 9-7v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 7V5l9 7 9-7v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>;
}

export default function SocialLinks() {
  return <div className="socials" role="group" aria-label="Social media and contact">
    {[[Instagram, 'Instagram', company.instagram], [Facebook, 'Facebook', company.facebook]].map(([Icon, name, url]) =>
      url ? <a key={name} href={url} aria-label={name} title={name} target="_blank" rel="noreferrer"><Icon size={19} aria-hidden="true"/></a>
        : <button key={name} className="social-pending" type="button" aria-disabled="true" aria-label={`${name} — link coming soon`}>
          <Icon size={19} aria-hidden="true"/><span className="social-tooltip">{name} · Link coming soon</span>
        </button>
    )}
    <a href={`mailto:${company.email}`} aria-label={`Email AM Capital at ${company.email}`} title={company.email}><GmailIcon/></a>
    <a href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent('Hello AM Capital, I would like to discuss a loan.')}`} aria-label="Chat on WhatsApp" title="WhatsApp" target="_blank" rel="noreferrer"><MessageCircle size={19} aria-hidden="true"/></a>
    <a href={company.phoneHref} aria-label="Call AM Capital" title="Call AM Capital"><Phone size={19} aria-hidden="true"/></a>
  </div>;
}
