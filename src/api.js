const API_BASE = import.meta.env.VITE_API_BASE?.replace(/\/+$/, '') || 'https://yoh-underground-server.vercel.app'
export const PORTAL_PATH = import.meta.env.VITE_PORTAL_PATH || '/portal'
export const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID || 'mzzjgpqj'

export async function loginWithBackend(email, password) {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(text || 'Invalid credentials')
  }
  return res.json()
}

export async function submitFormspree(payload) {
  const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  if (!res.ok) throw new Error('Submission failed')
  return res.json().catch(() => ({}))
}
