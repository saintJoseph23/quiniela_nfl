import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export interface LeaderboardEntry {
  id: number
  user_id: string
  name: string
  total_points: number
  correct_predictions: number
  total_predictions: number
  accuracy: number
}

export function useLeaderboard(weekId?: number) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchLeaderboard()
  }, [weekId])

  const fetchLeaderboard = async () => {
    try {
      setLoading(true)
      
      let query = supabase
        .from('leaderboard')
        .select(`
          *,
          users!inner(name)
        `)
        .order('total_points', { ascending: false })

      if (weekId) {
        query = query.eq('week_id', weekId)
      }

      const { data, error } = await query

      if (error) throw error

      const formattedData: LeaderboardEntry[] = data.map(entry => ({
        id: entry.id,
        user_id: entry.user_id,
        name: (entry.users as any).name,
        total_points: entry.total_points,
        correct_predictions: entry.correct_predictions,
        total_predictions: entry.total_predictions,
        accuracy: entry.total_predictions > 0 
          ? Math.round((entry.correct_predictions / entry.total_predictions) * 100)
          : 0
      }))

      setLeaderboard(formattedData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching leaderboard')
    } finally {
      setLoading(false)
    }
  }

  return { leaderboard, loading, error, refetch: fetchLeaderboard }
}