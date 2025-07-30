import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Game } from '../types'

export function useGames(weekId: number) {
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchGames()
  }, [weekId])

  const fetchGames = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .eq('week_id', weekId)
        .order('game_date', { ascending: true })

      if (error) throw error

      const formattedGames: Game[] = data.map(game => ({
        id: game.id,
        homeTeam: game.home_team,
        awayTeam: game.away_team,
        date: new Date(game.game_date),
        homeScore: game.home_score,
        awayScore: game.away_score,
        status: game.status,
        prediction: null // Will be loaded separately
      }))

      setGames(formattedGames)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching games')
    } finally {
      setLoading(false)
    }
  }

  return { games, loading, error, refetch: fetchGames }
}