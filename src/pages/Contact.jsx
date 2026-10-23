import { useState } from 'react'
import { CircleCheck, Clock, Mail, MapPin, Phone, Send } from 'lucide-react'
import sharing from '../assets/images/sharing.webp'
import { SITE } from '../data/site'
import { submitNetlifyForm } from '../utils/netlifyForm'
import '../styles/pages.css'

const EMPTY = { name: '', email: '', phone: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(EMPTY)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await submitNetlifyForm('contact', form)
      setStatus('sent')
      setForm(EMPTY)
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <section className="page-hero" style={{ backgroundImage: `url(${sharing})` }}>
        <div className="container">
          <p className="script">Ciao!</p>
          <h1>Get in touch</h1>
          <p>Questions, parties, catering or just to say the pizza was great — we’d love to hear from you.</p>
        </div>
      </section>

      <section className="section">
        <div className="container contact">
          <div className="contact__info">
            <div className="info-card">
              <MapPin size={22} />
              <div>
                <h3>Find us</h3>
                <p>{SITE.address}</p>
              </div>
            </div>
            <div className="info-card">
              <Phone size={22} />
              <div>
                <h3>Call us</h3>
                <p>
                  <a href={`tel:${SITE.phone}`}>{SITE.phone}</a>
                </p>
              </div>
            </div>
            <div className="info-card">
              <Mail size={22} />
              <div>
                <h3>Email us</h3>
                <p>
                  <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                </p>
              </div>
            </div>
            <div className="info-card">
              <Clock size={22} />
              <div>
                <h3>Opening hours</h3>
                <ul className="hours-list">
                  {SITE.hours.map((h) => (
                    <li key={h.days}>
                      <span>{h.days}</span>
                      <span>{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="card contact__form">
            {status === 'sent' ? (
              <div className="form-success">
                <CircleCheck size={48} />
                <h2>Grazie! Message received.</h2>
                <p>We’ll get back to you within one business day.</p>
                <button className="btn btn--outline" onClick={() => setStatus('idle')}>
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} name="contact">
                <h2>Send us a message</h2>
                <div className="field-row">
                  <div className="field">
                    <label htmlFor="c-name">Full name</label>
                    <input id="c-name" name="name" value={form.name} onChange={update} required autoComplete="name" />
                  </div>
                  <div className="field">
                    <label htmlFor="c-phone">
                      Phone <span>optional</span>
                    </label>
                    <input id="c-phone" name="phone" type="tel" value={form.phone} onChange={update} autoComplete="tel" />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="c-email">Email</label>
                  <input id="c-email" name="email" type="email" value={form.email} onChange={update} required autoComplete="email" />
                </div>
                <div className="field">
                  <label htmlFor="c-message">Message</label>
                  <textarea id="c-message" name="message" rows={5} value={form.message} onChange={update} required />
                </div>
                {status === 'error' && (
                  <p className="form-error" role="alert">
                    Sorry, something went wrong. Please try again or call us on {SITE.phone}.
                  </p>
                )}
                <button className="btn btn--primary btn--lg" disabled={status === 'sending'}>
                  <Send size={18} /> {status === 'sending' ? 'Sending…' : 'Send message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
