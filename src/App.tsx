import { useState } from 'react'
import { Header } from './components/Header'
import { WeekSelector } from './components/WeekSelector'
import { GameCard } from './components/GameCard'
import { Leaderboard } from './components/Leaderboard'
import { AuthModal } from './components/AuthModal'
import { useAuth } from './hooks/useAuth'
import { useWeeks } from './hooks/useWeeks'
import { useGames } from './hooks/useGames'
import { usePredictions } from './hooks/usePredictions'
import { useLeaderboard } from './hooks/useLeaderboard'
import { Game } from './types'

function App() {
  const { user, loading: authLoading } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)
  
  const { weeks, currentWeek, setCurrentWeek, loading: weeksLoading } = useWeeks()
  const { games, loading: gamesLoading } = useGames(currentWeek?.id || 0)
  const { predictions, makePrediction, loading: predictionsLoading } = usePredictions(
    games.map(game => game.id)
  )
  const { leaderboard, loading: leaderboardLoading } = useLeaderboard()
  const [currentUser] = useState(mockUsers[0])

  const weekGames = mockGames.filter(game => game.week === currentWeek)

  const handlePredict = (gameId: string, teamId: string, confidence: number) => {
    setPredictions(prev => {
      const existingIndex = prev.findIndex(p => p.gameId === gameId)
      const newPrediction: Prediction = {
        id: `pred-${gameId}-${Date.now()}`,
        userId: currentUser.id,
        gameId,
        predictedWinner: teamId,
        confidence,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      if (existingIndex >= 0) {
        const updated = [...prev]
        updated[existingIndex] = newPrediction
        return updated
      } else {
        return [...prev, newPrediction]
      }
    })
  }

  // Show auth modal if user is not logged in
  React.useEffect(() => {
    if (!authLoading && !user) {
      setShowAuthModal(true)
    }
  }, [authLoading, user])
      
  const handlePrediction = async (gameId: number, team: string) => {
    if (!user) {
      setShowAuthModal(true)
      return
    }
    
    await makePrediction(gameId, team)
  }

  if (authLoading || weeksLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onAuthClick={() => setShowAuthModal(true)} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <WeekSelector
              weeks={weeks}
              selectedWeek={currentWeek}
              onWeekChange={setCurrentWeek}
            />

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">
                Partidos de la Semana {currentWeek}
              </h2>
              
              {weekGames.length > 0 ? (
                <div className="grid gap-4">
                  {weekGames.map((game: Game) => (
                    <GameCard
                      key={game.id}
                      game={game}
                      prediction={getPredictionForGame(game.id)}
                      onPredict={handlePredict}
                    />
                  ))}
                </div>
              ) : (
            gamesLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Cargando partidos...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {games.map(game => (
                  <GameCard
                    key={game.id}
                    game={game}
                    prediction={predictions[game.id]}
                    onPrediction={handlePrediction}
                    disabled={!user}
                  />
                ))}
              </div>
            ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Leaderboard 
              leaderboard={leaderboard} 
              loading={leaderboardLoading}
              currentUserId={currentUser.id}
            />

            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Reglas del Juego
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start space-x-2">
                  <span className="font-medium text-primary-600">•</span>
                  <span>Predice el ganador de cada partido antes de que comience</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="font-medium text-primary-600">•</span>
                  <span>Gana 10 puntos por cada predicción correcta</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="font-medium text-primary-600">•</span>
                  <span>Puntos extra por predicciones en playoffs</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="font-medium text-primary-600">•</span>
                  <span>Puedes cambiar tus predicciones hasta que comience el partido</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </div>
  )
}

export default App