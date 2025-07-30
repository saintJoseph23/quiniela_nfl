import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export interface Week {
  id: number
  week_number: number
  season: number
  start_date: string
  end_date: string
  is_active: boolean
}

export function useWeeks() {
  const [weeks, setWeeks] = useState<Week[]>([])
  const [currentWeek, setCurrentWeek] = useState<Week | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchWeeks()
  }, [])

  const fetchWeeks = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('weeks')
        .select('*')
        .order('week_number', { ascending: true })

      if (error) throw error

      setWeeks(data)
      
      // Set current week (active week or latest week)
      const activeWeek = data.find(week => week.is_active)
      setCurrentWeek(activeWeek || data[data.length - 1] || null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching weeks')
    } finally {
      setLoading(false)
    }
  }

  return { 
    weeks, 
    currentWeek, 
    setCurrentWeek, 
    loading, 
    error, 
    refetch: fetchWeeks 
  }
}