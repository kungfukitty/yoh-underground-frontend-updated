import React, { useState, useEffect } from 'react'
import { loginWithBackend, submitFormspree, PORTAL_PATH } from './api'

// Firebase config – present for completeness but NOT used client-side
const firebaseConfig = {
  apiKey: "AIzaSyAS-OMWRh926vhcRV8vz4Rj_vQX5TKhGnU",
  authDomain: "yoh-underground.firebaseapp.com",
  projectId: "yoh-underground",
  storageBucket: "yoh-underground.firebasestorage.app",
  messagingSenderId: "826666263588",
  appId: "1:826666263588:web:490febf9d37299d32ca4b1",
  measurementId: "G-VY9W86XETW"
};

export default function YOHLanding() {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showApplicationForm, setShowApplicationForm] = useState(false)
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', social: '', message: '' })
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('animate-in') })
    }, observerOptions)
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleLogin = async () => {
    setLoginError('')
    setLoginLoading(true)
    try {
      const data = await loginWithBackend(loginEmail, loginPassword)
      localStorage.setItem('yoh_token', data.token)
      window.location.href = PORTAL_PATH
    } catch (err) {
      setLoginError('Invalid credentials. Please try again.')
    } finally {
      setLoginLoading(false)
    }
  }

  const handleFormSubmit = async () => {
    setSubmitError('')
    if (!formData.fullName || !formData.email || !formData.social || !formData.message) {
      setSubmitError('Please fill in all required fields.')
      return
    }
    try {
      await submitFormspree(formData)
      setFormSubmitted(true)
    } catch {
      setSubmitError('Submission failed. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl tracking-wider serif font-semibold">YOH</div>
          <button onClick={() => setShowLoginModal(true)} className="text-sm text-gray-600 hover:text-gray-900 transition-colors tracking-wide">
            Member Access
          </button>
        </div>
      </header>

      <section className="min-h-screen flex items-center justify-center px-6 pt-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mx-auto mb-8" style={{ width: 60, height: 1, background: '#C0A062' }} />
          <h1 className="text-5xl md:text-7xl mb-6 leading-tight">South Africa.<br />Reimagined.</h1>
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            For a select few, we curate what cannot be found.<br />Private consultations. Bespoke journeys. Crafted around you.
          </p>
          <button onClick={() => setShowApplicationForm(true)} className="inline-block bg-gray-900 text-white px-12 py-4 text-sm tracking-widest hover:bg-gray-800 transition-colors">
            REQUEST MEMBERSHIP
          </button>
        </div>
      </section>

      <section className="py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 fade-up">
            <div className="mx-auto mb-6" style={{ width: 60, height: 1, background: '#C0A062' }} />
            <h2 className="text-4xl md:text-5xl mb-4">The Experience</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-16">
            <div className="text-center fade-up">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-gray-200 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl mb-4 serif">Architected Experiences</h3>
              <p className="text-gray-600 leading-relaxed">We don't offer tours. Through private consultation, we design South Africa around you—not the other way around.</p>
            </div>
            <div className="text-center fade-up" style={{ transitionDelay: '0.1s' }}>
              <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-gray-200 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <h3 className="text-xl mb-4 serif">Access, Elevated</h3>
              <p className="text-gray-600 leading-relaxed">From private estates to closed venues, we open doors that don't appear on maps.</p>
            </div>
            <div className="text-center fade-up" style={{ transitionDelay: '0.2s' }}>
              <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-gray-200 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl mb-4 serif">Your Dedicated Team</h3>
              <p className="text-gray-600 leading-relaxed">Personal curators. Drivers. Chefs. Every detail handled, every request fulfilled.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20 fade-up">
            <div className="mx-auto mb-6" style={{ width: 60, height: 1, background: '#C0A062' }} />
            <h2 className="text-4xl md:text-5xl mb-4">The Process</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-12">
            {[
              { number: '01', title: 'Apply', desc: 'Submit your interest through our membership request.' },
              { number: '02', title: 'Review', desc: 'Our team evaluates your request with discretion.' },
              { number: '03', title: 'Consultation', desc: 'Virtual meeting with your personal curator.' },
              { number: '04', title: 'Activate', desc: 'Receive your credentials and begin your journey.' }
            ].map((step, idx) => (
              <div key={idx} className="text-center fade-up" style={{ transitionDelay: `${idx * 0.1}s` }}>
                <div className="text-5xl serif text-gray-300 mb-4">{step.number}</div>
                <h3 className="text-lg font-medium mb-3">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-2xl serif mb-4">YOH</div>
          <p className="text-sm text-gray-500 mb-2">Johannesburg | Cape Town | Beyond</p>
          <p className="text-sm text-gray-400">Membership by invitation and application</p>
          <p className="text-xs text-gray-400 mt-6">© {new Date().getFullYear()} YOH Underground. All rights reserved.</p>
        </div>
      </footer>

      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
          <div className="bg-white max-w-md w-full p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl serif">Member Access</h3>
              <button onClick={() => { setShowLoginModal(false); setLoginError('') }} className="text-gray-400 hover:text-gray-600" aria-label="Close modal">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <input type="email" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className="w-full px-4 py-3 border border-gray-200 text-sm focus:border-gray-900 transition-colors" />
              <input type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="w-full px-4 py-3 border border-gray-200 text-sm focus:border-gray-900 transition-colors" />
              {loginError && <p className="text-sm text-red-600">{loginError}</p>}
              <button onClick={handleLogin} disabled={loginLoading} className="w-full bg-gray-900 text-white py-3 text-sm tracking-widest hover:bg-gray-800 transition-colors disabled:opacity-50">
                {loginLoading ? 'AUTHENTICATING...' : 'ACCESS PORTAL'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showApplicationForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md overflow-y-auto">
          <div className="bg-white max-w-2xl w-full p-8 shadow-2xl my-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl serif">Membership Request</h3>
              <button onClick={() => {
                  setShowApplicationForm(false)
                  setFormSubmitted(false)
                  setFormData({ fullName: '', email: '', phone: '', social: '', message: '' })
                  setSubmitError('')
                }} className="text-gray-400 hover:text-gray-600" aria-label="Close modal">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {formSubmitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-gray-900 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-xl serif mb-3">Request Received</h4>
                <p className="text-gray-600 mb-6">Our team will review your application and contact you shortly.</p>
                <button onClick={() => {
                    setShowApplicationForm(false)
                    setFormSubmitted(false)
                    setFormData({ fullName: '', email: '', phone: '', social: '', message: '' })
                  }} className="text-sm text-gray-600 hover:text-gray-900">
                  Close
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Full Name *" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} className="w-full px-4 py-3 border border-gray-200 text-sm focus:border-gray-900 transition-colors" />
                  <input type="email" placeholder="Email *" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 border border-gray-200 text-sm focus:border-gray-900 transition-colors" />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <input type="tel" placeholder="Phone (Optional)" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 border border-gray-200 text-sm focus:border-gray-900 transition-colors" />
                  <input type="text" placeholder="LinkedIn/Instagram Handle *" value={formData.social} onChange={(e) => setFormData({ ...formData, social: e.target.value })} className="w-full px-4 py-3 border border-gray-200 text-sm focus:border-gray-900 transition-colors" />
                </div>
                <textarea placeholder="Why YOH? (150 characters) *" maxLength={150} rows={3} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 border border-gray-200 text-sm focus:border-gray-900 transition-colors resize-none" />
                <p className="text-xs text-gray-500">By submitting this request, you acknowledge that membership is subject to review and approval.</p>
                {submitError && <p className="text-sm text-red-600">{submitError}</p>}
                <button onClick={handleFormSubmit} className="w-full bg-gray-900 text-white py-3 text-sm tracking-widest hover:bg-gray-800 transition-colors">SUBMIT REQUEST</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
