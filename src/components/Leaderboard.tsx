import React from 'react'
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react'
import { LeaderboardEntry } from '../hooks/useLeaderboard'
import { cn } from '../lib/utils'

interface LeaderboardProps {
  leaderboard: LeaderboardEntry[]
  loading?: boolean
  currentUserId?: string
}

export function Leaderboard({ leaderboard, loading = false, currentUserId }: LeaderboardProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />
      default:
        return <span className="text-sm font-bold text-gray-500">#{rank}</span>
    }
  }

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white"
      case 2:
        return "bg-gradient-to-r from-gray-300 to-gray-500 text-white"
      case 3:
        return "bg-gradient-to-r from-amber-400 to-amber-600 text-white"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="card">
      <div className="flex items-center space-x-2 mb-6">
        <TrendingUp className="h-6 w-6 text-primary-600" />
        <h2 className="text-2xl font-bold text-gray-900">Clasificación</h2>
      </div>

      <div className="space-y-3">
        {loading ? (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-sm text-gray-500">Cargando clasificación...</p>
          </div>
        ) : leaderboard.length === 0 ? (
          <div className="text-center py-8">
            <Trophy className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No hay datos de clasificación aún</p>
          </div>
        ) : (
          leaderboard.map((entry, index) => {
            const rank = index + 1
            const isCurrentUser = entry.user.id === currentUserId
            
            return (
              <div
                key={entry.user.id}
                className={cn(
                  "flex items-center justify-between p-4 rounded-lg border transition-all",
                  isCurrentUser 
                    ? "border-primary-500 bg-primary-50 shadow-sm" 
                    : "border-gray-200 hover:border-gray-300"
                )}
              >
                <div className="flex items-center space-x-4">
                  <div className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full",
                    getRankBadge(rank)
                  )}>
                    {getRankIcon(rank)}
                  </div>
                  
                  <div>
                    <div className={cn(
                      "font-semibold",
                      isCurrentUser ? "text-primary-900" : "text-gray-900"
                    )}>
                      {entry.user.username}
                      {isCurrentUser && (
                        <span className="ml-2 text-xs bg-primary-600 text-white px-2 py-1 rounded-full">
                          Tú
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-600">
                      {entry.correct_predictions}/{entry.total_predictions} correctas
                      {entry.total_predictions > 0 && (
                        <span className="ml-2">
                          ({Math.round(entry.accuracy)}% precisión)
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className={cn(
                    "text-2xl font-bold",
                    isCurrentUser ? "text-primary-600" : "text-gray-900"
                  )}>
                    {entry.total_points}
                  </div>
                  <div className="text-sm text-gray-500">puntos</div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}