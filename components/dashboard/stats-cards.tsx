"use client"

import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Calendar } from "lucide-react"

interface StatsCardsProps {
  stats: {
    totalInterviews: number
    passedInterviews: number
    failedInterviews: number
    totalTasks: number
    completedTasks: number
    pendingTasks: number
  }
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: "Total Interviews",
      value: stats.totalInterviews,
      subtitle: "Month",
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Interviews Won",
      value: stats.passedInterviews,
      subtitle: "Won",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Interviews Lost",
      value: stats.failedInterviews,
      subtitle: "Lost",
      icon: TrendingDown,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <Card key={index} className="glass-card border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-3xl font-bold text-gray-900">{card.value}</span>
                  <span className={`text-sm px-2 py-1 rounded-full ${card.bgColor} ${card.color}`}>
                    {card.subtitle}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{card.title}</p>
              </div>

              <div className={`p-3 rounded-xl ${card.bgColor}`}>
                <card.icon className={`h-6 w-6 ${card.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
