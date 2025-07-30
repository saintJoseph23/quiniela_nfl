import { Team, Game, User, Leaderboard } from '../types'

export const mockTeams: Team[] = [
  {
    id: 'buf',
    name: 'Bills',
    city: 'Buffalo',
    abbreviation: 'BUF',
    logo: 'https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    primaryColor: '#00338D',
    secondaryColor: '#C60C30',
    conference: 'AFC',
    division: 'East'
  },
  {
    id: 'mia',
    name: 'Dolphins',
    city: 'Miami',
    abbreviation: 'MIA',
    logo: 'https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    primaryColor: '#008E97',
    secondaryColor: '#FC4C02',
    conference: 'AFC',
    division: 'East'
  },
  {
    id: 'ne',
    name: 'Patriots',
    city: 'New England',
    abbreviation: 'NE',
    logo: 'https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    primaryColor: '#002244',
    secondaryColor: '#C60C30',
    conference: 'AFC',
    division: 'East'
  },
  {
    id: 'nyj',
    name: 'Jets',
    city: 'New York',
    abbreviation: 'NYJ',
    logo: 'https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    primaryColor: '#125740',
    secondaryColor: '#FFFFFF',
    conference: 'AFC',
    division: 'East'
  },
  {
    id: 'kc',
    name: 'Chiefs',
    city: 'Kansas City',
    abbreviation: 'KC',
    logo: 'https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    primaryColor: '#E31837',
    secondaryColor: '#FFB81C',
    conference: 'AFC',
    division: 'West'
  },
  {
    id: 'dal',
    name: 'Cowboys',
    city: 'Dallas',
    abbreviation: 'DAL',
    logo: 'https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    primaryColor: '#003594',
    secondaryColor: '#869397',
    conference: 'NFC',
    division: 'East'
  }
]

export const mockGames: Game[] = [
  {
    id: 'game1',
    week: 1,
    season: 2024,
    homeTeam: mockTeams[0], // Bills
    awayTeam: mockTeams[1], // Dolphins
    gameDate: new Date('2024-01-14T18:00:00'),
    status: 'scheduled',
    isPlayoffs: false
  },
  {
    id: 'game2',
    week: 1,
    season: 2024,
    homeTeam: mockTeams[2], // Patriots
    awayTeam: mockTeams[3], // Jets
    gameDate: new Date('2024-01-14T21:30:00'),
    status: 'scheduled',
    isPlayoffs: false
  },
  {
    id: 'game3',
    week: 1,
    season: 2024,
    homeTeam: mockTeams[4], // Chiefs
    awayTeam: mockTeams[5], // Cowboys
    gameDate: new Date('2024-01-15T20:00:00'),
    status: 'completed',
    homeScore: 28,
    awayScore: 21,
    isPlayoffs: false
  }
]

export const mockUsers: User[] = [
  {
    id: 'user1',
    email: 'juan@example.com',
    username: 'JuanPredictor',
    totalPoints: 150,
    weeklyPoints: 25,
    rank: 1,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'user2',
    email: 'maria@example.com',
    username: 'MariaFan',
    totalPoints: 135,
    weeklyPoints: 20,
    rank: 2,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'user3',
    email: 'carlos@example.com',
    username: 'CarlosNFL',
    totalPoints: 120,
    weeklyPoints: 15,
    rank: 3,
    createdAt: new Date('2024-01-01')
  }
]

export const mockLeaderboard: Leaderboard[] = [
  {
    user: mockUsers[0],
    points: 150,
    correctPredictions: 12,
    totalPredictions: 15,
    accuracy: 80
  },
  {
    user: mockUsers[1],
    points: 135,
    correctPredictions: 11,
    totalPredictions: 16,
    accuracy: 68.75
  },
  {
    user: mockUsers[2],
    points: 120,
    correctPredictions: 9,
    totalPredictions: 14,
    accuracy: 64.29
  }
]