'use client'
import { createContext, useState, useContext, useEffect } from 'react'

interface AccentContextValue {
  hue: number
  setHue: (v: number) => void
}

const AccentContext = createContext<AccentContextValue>({ hue: 215, setHue: () => {} })

export const useAccent = () => useContext(AccentContext)

export const AccentProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [hue, setHue] = useState<number>(() => {
    if (typeof window === 'undefined') return 215
    return parseInt(localStorage.getItem('accent-hue') || '215')
  })

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--tw-accent', `${hue} 100% 60%`)
      localStorage.setItem('accent-hue', hue.toString())
    }
  }, [hue])

  return (
    <AccentContext.Provider value={{ hue, setHue }}>
      {children}
    </AccentContext.Provider>
  )
}
