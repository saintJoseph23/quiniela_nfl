import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './useAuth'

export function usePredictions(gameIds: number[]) {
  const { user } = useAuth()
  const [predictions, setPredictions] = useState<Record<number, string>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (user && gameIds.length > 0) {
      fetchPredictions()
    } else {
      setLoading(false)
    }
  }, [user, gameIds])

  const fetchPredictions = async () => {
    if (!user) return

    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('predictions')
        .select('game_id, predicted_winner')
        .eq('user_id', user.id)
        .in('game_id', gameIds)

      if (error) throw error

      const predictionsMap: Record<number, string> = {}
      data.forEach(prediction => {
        predictionsMap[prediction.game_id] = prediction.predicted_winner
      })

      setPredictions(predictionsMap)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching predictions')
    } finally {
      setLoading(false)
    }
  }

  const makePrediction = async (gameId: number, predictedWinner: string) => {
    if (!user) return { error: 'User not authenticated' }

    try {
      const { error } = await supabase
        .from('predictions')
        .upsert({
          user_id: user.id,
          game_id: gameId,
          predicted_winner: predictedWinner,
          updated_at: new Date().toISOString()
        })

      if (error) throw error

      setPredictions(prev => ({
        ...prev,
        [gameId]: predictedWinner
      }))

      return { error: null }
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Error making prediction' }
    }
  }

  return { 
    predictions, 
    loading, 
    error, 
    makePrediction, 
    refetch: fetchPredictions 
  }
}