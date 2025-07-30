import { Calendar, Clock, Trophy } from 'lucide-react'
import { Game, Prediction } from '../types'
import { formatDate, formatTime, cn } from '../lib/utils'

interface GameCardProps {
  game: Game
  prediction?: Prediction
  onPredict?: (gameId: string, teamId: string, confidence: number) => void
  disabled?: boolean
}

export function GameCard({ game, prediction, onPredict, disabled = false }: GameCardProps) {
  const isCompleted = game.status === 'completed'
  const isLive = game.status === 'live'
  
  const handleTeamSelect = (teamId: string) => {
    if (disabled || isCompleted || isLive) return
    onPredict?.(game.id, teamId, prediction?.confidence || 5)
  }

  const getTeamScore = (isHome: boolean) => {
    if (!isCompleted) return null
    return isHome ? game.homeScore : game.awayScore
  }

  const isWinner = (teamId: string) => {
    if (!isCompleted || game.homeScore === undefined || game.awayScore === undefined) return false
    const isHome = teamId === game.homeTeam.id
    return isHome ? game.homeScore > game.awayScore : game.awayScore > game.homeScore
  }

  const isPredictionCorrect = () => {
    if (!prediction || !isCompleted) return null
    return prediction.predictedWinner === (game.homeScore! > game.awayScore! ? game.homeTeam.id : game.awayTeam.id)
  }

  return (
    <div className={cn(
      "card transition-all duration-200 hover:shadow-md",
      isCompleted && "bg-gray-50",
      isLive && "ring-2 ring-red-500 ring-opacity-50"
    )}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          <span>{formatDate(game.gameDate)}</span>
          <Clock className="h-4 w-4 ml-2" />
          <span>{formatTime(game.gameDate)}</span>
        </div>
        
        {isLive && (
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
            EN VIVO
          </span>
        )}
        
        {isCompleted && prediction && (
          <div className={cn(
            "flex items-center space-x-1 text-xs font-medium px-2 py-1 rounded-full",
            isPredictionCorrect() 
              ? "bg-green-100 text-green-800" 
              : "bg-red-100 text-red-800"
          )}>
            <Trophy className="h-3 w-3" />
            <span>{isPredictionCorrect() ? 'Correcto' : 'Incorrecto'}</span>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {/* Away Team */}
        <div 
          className={cn(
            "flex items-center justify-between p-3 rounded-lg border-2 transition-all cursor-pointer",
            prediction?.predictedWinner === game.awayTeam.id 
              ? "border-primary-500 bg-primary-50" 
              : "border-gray-200 hover:border-gray-300",
            isCompleted && isWinner(game.awayTeam.id) && "border-green-500 bg-green-50",
            (disabled || isCompleted || isLive) && "cursor-not-allowed opacity-75"
          )}
          onClick={() => handleTeamSelect(game.awayTeam.id)}
        >
          <div className="flex items-center space-x-3">
            <img 
              src={game.awayTeam.logo} 
              alt={game.awayTeam.name}
              className="h-8 w-8 object-contain"
            />
            <div>
              <div className="font-semibold text-gray-900">
                {game.awayTeam.city} {game.awayTeam.name}
              </div>
              <div className="text-sm text-gray-500">{game.awayTeam.abbreviation}</div>
            </div>
          </div>
          
          {isCompleted && (
            <div className={cn(
              "text-2xl font-bold",
              isWinner(game.awayTeam.id) ? "text-green-600" : "text-gray-600"
            )}>
              {getTeamScore(false)}
            </div>
          )}
        </div>

        <div className="text-center text-sm font-medium text-gray-500">VS</div>

        {/* Home Team */}
        <div 
          className={cn(
            "flex items-center justify-between p-3 rounded-lg border-2 transition-all cursor-pointer",
            prediction?.predictedWinner === game.homeTeam.id 
              ? "border-primary-500 bg-primary-50" 
              : "border-gray-200 hover:border-gray-300",
            isCompleted && isWinner(game.homeTeam.id) && "border-green-500 bg-green-50",
            (disabled || isCompleted || isLive) && "cursor-not-allowed opacity-75"
          )}
          onClick={() => handleTeamSelect(game.homeTeam.id)}
        >
          <div className="flex items-center space-x-3">
            <img 
              src={game.homeTeam.logo} 
              alt={game.homeTeam.name}
              className="h-8 w-8 object-contain"
            />
            <div>
              <div className="font-semibold text-gray-900">
                {game.homeTeam.city} {game.homeTeam.name}
              </div>
              <div className="text-sm text-gray-500">{game.homeTeam.abbreviation}</div>
            </div>
          </div>
          
          {isCompleted && (
            <div className={cn(
              "text-2xl font-bold",
              isWinner(game.homeTeam.id) ? "text-green-600" : "text-gray-600"
            )}>
              {getTeamScore(true)}
            </div>
          )}
        </div>
      </div>

      {prediction && !isCompleted && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Confianza:</span>
            <span className="font-medium">{prediction.confidence}/10</span>
          </div>
        </div>
      )}
    </div>
  )
}