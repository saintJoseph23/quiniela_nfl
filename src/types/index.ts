export interface Team {
  id: string
  name: string
  city: string
  abbreviation: string
  logo: string
  primaryColor: string
  secondaryColor: string
  conference: 'AFC' | 'NFC'
  division: 'North' | 'South' | 'East' | 'West'
}

export interface Game {
  id: string
  week: number
  season: number
  homeTeam: Team
  awayTeam: Team
  gameDate: Date
  homeScore?: number
  awayScore?: number
  status: 'scheduled' | 'live' | 'completed'
  isPlayoffs: boolean
}

export interface Prediction {
  id: string
  userId: string
  gameId: string
  predictedWinner: string
  confidence: number
  createdAt: Date
  updatedAt: Date
}

export interface User {
  id: string
  email: string
  username: string
  totalPoints: number
  weeklyPoints: number
  rank: number
  createdAt: Date
}

export interface Leaderboard {
  user: User
  points: number
  correctPredictions: number
  totalPredictions: number
  accuracy: number
}