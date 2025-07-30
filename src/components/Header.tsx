import { Trophy, User, LogOut } from 'lucide-react'
import { cn } from '../lib/utils'

interface HeaderProps {
  user?: {
    username: string
    totalPoints: number
  }
  onSignOut?: () => void
import { Trophy, User, LogOut } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import type { User as SupabaseUser } from '@supabase/supabase-js'

interface HeaderProps {
  user: SupabaseUser | null
  onAuthClick: () => void
}

export function Header({ user, onAuthClick }: HeaderProps) {
  const { signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Trophy className="h-8 w-8 text-nfl-blue" />
              <h1 className="text-2xl font-bold text-nfl-blue">NFL Quiniela</h1>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            {user ? (
              <>
                <div className="flex items-center space-x-2 bg-blue-800 px-3 py-2 rounded-lg">
                  <User className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {user.user_metadata?.name || user.email}
                  </span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-1 text-blue-200 hover:text-white transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">Salir</span>
                </button>
              </>
            ) : (
              <button
                onClick={onAuthClick}
                className="bg-blue-700 hover:bg-blue-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Iniciar Sesión
              </button>
            )}
            </a>
          </nav>

          {user ? (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2">
                <User className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-900">{user.username}</span>
                <span className="text-xs text-gray-500">|</span>
                <span className="text-sm font-bold text-primary-600">{user.totalPoints} pts</span>
              </div>
              <button
                onClick={onSignOut}
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                title="Cerrar sesión"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <button className="btn-secondary">Iniciar Sesión</button>
              <button className="btn-primary">Registrarse</button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}