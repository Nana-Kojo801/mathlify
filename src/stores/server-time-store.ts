import { api } from '@convex/_generated/api'
import { useConvex } from 'convex/react'
import { useEffect, useCallback } from 'react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Constants
const STORAGE_KEY = 'server-time-offset'
const SYNC_INTERVAL_MS = 30000 // 30 seconds
const SIGNIFICANT_OFFSET_THRESHOLD_MS = 1000 // 1 second
const LATENCY_CALCULATION_FACTOR = 0.5

// Types
interface ServerTimeState {
  offset: number
  isInitialized: boolean
  lastSyncTimestamp: number | null
  setOffset: (offset: number) => void
  getServerTime: () => number
  markAsInitialized: () => void
}

interface SyncResult {
  success: boolean
  offset?: number
  error?: Error
}

// Zustand store with persistence
const useServerTimeStore = create<ServerTimeState>()(
  persist(
    (set, get) => ({
      offset: 0,
      isInitialized: false,
      lastSyncTimestamp: null,
      
      setOffset: (offset: number) => {
        set({ 
          offset, 
          lastSyncTimestamp: Date.now() 
        })
      },
      
      getServerTime: () => {
        const { offset } = get()
        return Date.now() + offset
      },
      
      markAsInitialized: () => {
        set({ isInitialized: true })
      }
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({ offset: state.offset })
    }
  )
)

// Utility functions
const calculateLatency = (roundTripTime: number): number => {
  return roundTripTime * LATENCY_CALCULATION_FACTOR
}

const shouldUpdateOffset = (newOffset: number, currentOffset: number): boolean => {
  return Math.abs(newOffset - currentOffset) > SIGNIFICANT_OFFSET_THRESHOLD_MS
}

const estimateServerTime = (serverTime: number, latency: number): number => {
  return serverTime + latency
}

// Core sync logic
const performTimeSync = async (convex: ReturnType<typeof useConvex>): Promise<SyncResult> => {
  try {
    const requestTime = Date.now()
    const tempServerTime = await fetch('/.netlify/functions/server-time').then(res => Number(res))
    console.log('[SERVER_TIME_SYNC]: Temporary server time fetched', tempServerTime);
    
    const serverTime = await convex.query(api.serverTime.get)
    const receivedTime = Date.now()
    
    const roundTripTime = receivedTime - requestTime
    const latency = calculateLatency(roundTripTime)
    const estimatedServerTime = estimateServerTime(serverTime, latency)
    const newOffset = estimatedServerTime - receivedTime
    
    return {
      success: true,
      offset: newOffset
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error : new Error('Unknown sync error')
    }
  }
}

// Public API
export const getServerTime = (): number => {
  return useServerTimeStore.getState().getServerTime()
}

export const setServerTimeOffset = (offset: number): void => {
  useServerTimeStore.getState().setOffset(offset)
}

export const getServerTimeOffset = (): number => {
  return useServerTimeStore.getState().offset
}

export const isServerTimeSynced = (): boolean => {
  return useServerTimeStore.getState().isInitialized
}

// Hook for server time synchronization
export const useServerTimeSync = (): void => {
  const convex = useConvex()
  const { offset, markAsInitialized } = useServerTimeStore()

  const syncTime = useCallback(async (): Promise<void> => {
    const result = await performTimeSync(convex)
    
    if (result.success && result.offset !== undefined) {
      if (shouldUpdateOffset(result.offset, offset)) {
        setServerTimeOffset(result.offset)
        console.log('[SERVER_TIME_SYNC]: Offset updated', { 
          newOffset: result.offset,
          previousOffset: offset 
        })
      }
      
      if (!useServerTimeStore.getState().isInitialized) {
        markAsInitialized()
      }
    } else {
      console.error('[SERVER_TIME_SYNC]: Failed to sync', result.error)
    }
  }, [convex, offset, markAsInitialized])

  useEffect(() => {
    // Perform initial sync
    syncTime()

    // Set up periodic sync
    const intervalId = setInterval(syncTime, SYNC_INTERVAL_MS)

    return () => {
      clearInterval(intervalId)
    }
  }, [syncTime])
}

// Legacy support - maintaining the original function name
export const initServerTimeSync = useServerTimeSync