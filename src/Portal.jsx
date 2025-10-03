import React, { useEffect, useState } from 'react'

export default function Portal() {
  const [ready, setReady] = useState(false)
  const [token, setToken] = useState(null)

  useEffect(() => {
    const t = localStorage.getItem('yoh_token')
    setToken(t)
    setReady(true)
  }, [])

  if (!ready) return null

  if (!token) {
    window.location.href = '/'
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="px-6 py-4 bg-white border-b border-gray-100 flex justify-between">
        <div className="text-2xl serif">YOH</div>
        <button
          onClick={() => { localStorage.removeItem('yoh_token'); window.location.href = '/' }}
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          Sign out
        </button>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl serif mb-4">Member Portal</h1>
        <p className="text-gray-600 mb-8">You’re signed in. Replace this with your real portal content.</p>
        <div className="p-6 bg-white border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500">Stored token:</p>
          <code className="block break-all text-xs mt-2 bg-gray-50 p-3 border border-gray-100">{token}</code>
        </div>
      </main>

      <footer className="py-12 px-6 bg-white border-t border-gray-100 text-center">
        <p className="text-xs text-gray-400">© {new Date().getFullYear()} YOH Underground. All rights reserved.</p>
      </footer>
    </div>
  )
}
