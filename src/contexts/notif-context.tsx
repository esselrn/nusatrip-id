'use client'

import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/auth-context'

type NotifContextType = {
  hasNotif: boolean
  clearNotif: () => void
}

const NotifContext = createContext<NotifContextType>({ hasNotif: false, clearNotif: () => {} })

export function NotifProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [hasNotif, setHasNotif] = useState(false)
  const lastStatusesRef = useRef<Record<string, string>>({})

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      if (!user) return
      const cleared = JSON.parse(localStorage.getItem(`notif_cleared_${user.id}`) ?? '{}') as Record<string, string>
      const [{ data: pb }, { data: db }] = await Promise.all([
        supabase.from('package_bookings').select('id, status').eq('user_id', user.id),
        supabase.from('destination_bookings').select('id, status').eq('user_id', user.id)
      ])
      const all = [...(pb ?? []), ...(db ?? [])]
      const NOTIFY_STATUSES = ['confirmed', 'cancelled', 'done', 'paid']
      const currentStatuses: Record<string, string> = {}
      all.forEach((b) => {
        currentStatuses[b.id] = b.status
      })
      lastStatusesRef.current = currentStatuses
      const hasNew = all.some((b) => NOTIFY_STATUSES.includes(b.status) && cleared[b.id] !== b.status)
      if (!cancelled) setHasNotif(hasNew)
    }
    run()
    const interval = setInterval(run, 30000)
    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [user])

  const clearNotif = useCallback(() => {
    if (!user) return
    localStorage.setItem(`notif_cleared_${user.id}`, JSON.stringify(lastStatusesRef.current))
    setHasNotif(false)
  }, [user])

  return <NotifContext.Provider value={{ hasNotif, clearNotif }}>{children}</NotifContext.Provider>
}

export const useNotif = () => useContext(NotifContext)