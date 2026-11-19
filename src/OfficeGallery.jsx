import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Maximize2 } from 'lucide-react';
import './office-gallery.css';

const photos = [
  { file: 'team-gathering.jpg', title: 'Moments together', category: 'TEAM LIFE', alt: 'Group gathered around a cake in the office', position: '50% 45%' },
  { file: 'team-moment.jpg', title: 'The people behind the work', category: 'OUR PEOPLE', alt: 'Colleagues posing together inside the office', position: '50% 35%' },
  { file: 'recognition.jpg', title: 'Celebrating contributions', category: 'RECOGNITION', alt: 'An award being presented beside a display of trophies', position: '50% 35%' },
  { file: 'workspace-team.jpg', title: 'A day at the office', category: 'OUR WORKSPACE', alt: 'Team members working at desks in the open office', position: '50% 45%' },
  { file: 'workspace.jpg', title: 'Where it comes together', category: 'OUR WORKSPACE', alt: 'Office workstations, monitors and desk partitions', position: '50% 45%' },
  { file: 'at-work.jpg', title: 'Everyday focus', category: 'AT WORK', alt: 'Colleagues working with documents at shared desks', position: '50% 35%' },
  { file: 'celebration.jpg', title: 'Shared celebrations', category: 'TEAM LIFE', alt: 'Two colleagues holding a gift together in the office', position: '50% 35%' },
  { file: 'appreciation.jpg', title: 'A moment of appreciation', category: 'TEAM LIFE', alt: 'Colleagues marking an occasion with a gift', position: '50% 35%' },
];

export default function OfficeGallery() {
  const [selected, setSelected] = useState(null);
  const dialog = useRef(null);
  const trigger = useRef(null);
  const touch = useRef(null);
  const open = selected !== null;
  const active = open ? photos[selected] : null;

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const modal = dialog.current;
    document.body.style.overflow = 'hidden';
    modal.showModal();
    return () => {
      if (modal.open) modal.close();
      document.body.style.overflow = previousOverflow;
      trigger.current?.focus({ preventScroll: true });
    };
  }, [open]);

  const move = direction => setSelected(index => index === null ? null : (index + direction + photos.length) % photos.length);
  function openPhoto(index, event) { trigger.current = event.currentTarget; setSelected(index); }
  function onSwipe(event) {
    if (!touch.current) return;
    const end = event.changedTouches[0];
    const dx = end.clientX - touch.current.x;
    const dy = end.clientY - touch.current.y;
    touch.current = null;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5) move(dx < 0 ? 1 : -1);
  }
  function tile(photo, index, featured) {
    return <button key={photo.file} type="button" className={`office-photo ${featured ? 'office-feature' : 'office-small'}`} aria-label={`Open photo: ${photo.title}`} onClick={event => openPhoto(index, event)}>
      <img src={`/images/office/${photo.file}`} alt={photo.alt} loading="lazy" decoding="async" style={{ objectPosition: photo.position }}/>
      <span className="office-photo-shade"/>
      <span className="office-photo-caption">{featured && <span>{photo.category}</span>}<strong>{photo.title}</strong></span>
      <span className="office-photo-expand" aria-hidden="true"><Maximize2 size={17}/></span>
    </button>;
  }

  return <section className="office-gallery section" id="office-gallery" aria-labelledby="office-gallery-heading"><div className="container">
    <div className="section-head"><div><div className="eyebrow"><span/>OUR OFFICE &amp; OUR PEOPLE</div><h2 id="office-gallery-heading">Inside AM CAPITAL FINANCE.</h2></div><div><p>A closer look at our workspace and the people<br/>who make up our everyday story.</p><span className="office-gallery-hint">Select any photo to view it in full.</span></div></div>
    <div className="office-feature-grid">{photos.slice(0, 3).map((photo, index) => tile(photo, index, true))}</div>
    <div className="office-photo-strip" role="group" aria-label="More office photographs">{photos.slice(3).map((photo, index) => tile(photo, index + 3, false))}</div>
    <div className="office-gallery-bottom"><p>Our office. Our team. Our shared moments.</p><Link to="/contact" className="text-link">Arrange an office visit</Link></div>
    <dialog ref={dialog} className="office-lightbox" aria-labelledby="office-lightbox-title" aria-describedby="office-lightbox-help" onCancel={event => { event.preventDefault(); setSelected(null); }} onClick={event => { if(event.target === event.currentTarget) setSelected(null); }} onKeyDown={event => { if(event.key === 'ArrowRight'){event.preventDefault();move(1);} if(event.key === 'ArrowLeft'){event.preventDefault();move(-1);} }}>
      {active && <div className="office-lightbox-content">
        <header className="office-lightbox-top"><div><span>AM CAPITAL FINANCE · OFFICE GALLERY</span><h2 id="office-lightbox-title">{active.title}</h2></div><button type="button" className="office-lightbox-close" autoFocus aria-label="Close photo viewer" onClick={() => setSelected(null)}><X size={23}/></button></header>
        <div className="office-lightbox-image" onTouchStart={event => { if(event.touches.length === 1) touch.current = {x:event.touches[0].clientX,y:event.touches[0].clientY}; }} onTouchEnd={onSwipe} onTouchCancel={() => {touch.current = null;}}><img src={`/images/office/${active.file}`} alt={active.alt}/></div>
        <div className="office-lightbox-controls"><button type="button" onClick={() => move(-1)}>Previous</button><span role="status" aria-live="polite">{selected + 1} / {photos.length}</span><button type="button" onClick={() => move(1)}>Next</button></div>
        <p id="office-lightbox-help">Swipe or use the arrow keys to browse. Press Escape to close.</p>
      </div>}
    </dialog>
  </div></section>;
}
