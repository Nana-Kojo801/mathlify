import { api } from '@convex/_generated/api'
import { useConvex } from 'convex/react'
import { useCallback, useEffect, useRef } from 'react'
import { create } from 'zustand'

type ServerTimeStore = {
  offset: number
  actions: {
    getOffset: () => number
    getServerTime: () => number
    setOffset: (offset: number) => void
  }
}

const useServerTimeSTore = create<ServerTimeStore>((set, get) => ({
  offset: parseInt(localStorage.getItem('serverTimeOffset') || "0"),
  actions: {
    getOffset: () => get().offset,
    getServerTime: () => Date.now() + get().offset,
    setOffset: (offset: number) => set({ offset }),
  },
}))

export const useActions = () => useServerTimeSTore((state) => state.actions)

export const initSyncServerTime = () => {
  const { setOffset } = useActions()
  const convex = useConvex()

  const sync = useCallback(async () => {
    const startTime = Date.now()
    const serverTime = await convex.query(api.serverTime.get)
    const clientReceiveTime = Date.now()
    const roundTrip = clientReceiveTime - startTime
    const latency = Math.floor(roundTrip / 2)
    const offset = serverTime - (clientReceiveTime + latency)
    localStorage.setItem('serverTimeOffset', offset.toString())
    setOffset(offset)
  }, [setOffset, convex])

  const interval = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    sync()
    interval.current = setInterval(sync, 10 * 1000)
    return () => {
      if (interval.current) {
        clearInterval(interval.current)
      }
    }
  }, [sync])
}
