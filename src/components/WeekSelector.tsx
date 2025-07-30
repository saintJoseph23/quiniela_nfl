import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Week } from '../hooks/useWeeks'

interface WeekSelectorProps {
  weeks: Week[]
  selectedWeek: Week | null
  onWeekChange: (week: Week) => void
}

export function WeekSelector({ weeks, selectedWeek, onWeekChange }: WeekSelectorProps) {
  const currentWeekIndex = selectedWeek ? weeks.findIndex(week => week.id === selectedWeek.id) : 0
  
  const goToPreviousWeek = () => {
    if (currentWeekIndex > 0) {
      onWeekChange(weeks[currentWeekIndex - 1])
    }
  }
  
  const goToNextWeek = () => {
    if (currentWeekIndex < weeks.length - 1) {
      onWeekChange(weeks[currentWeekIndex + 1])
    }
  }

  if (!selectedWeek) return null

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between">
        <button
          onClick={goToPreviousWeek}
          disabled={currentWeekIndex === 0}
          className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900">Semana {selectedWeek.week_number}</h2>
          <p className="text-sm text-gray-500">Temporada {selectedWeek.season}</p>
        </div>
        
        <button
          onClick={goToNextWeek}
          disabled={currentWeekIndex === weeks.length - 1}
          className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      
      {weeks.length > 1 && (
        <div className="flex justify-center space-x-2 mt-4">
          {weeks.map((week, index) => (
            <button
              key={week.id}
              onClick={() => onWeekChange(week)}
              className={`w-3 h-3 rounded-full transition-colors ${
                week.id === selectedWeek.id
                  ? 'bg-blue-600'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}