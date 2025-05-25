"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { InterviewsSection } from "@/components/dashboard/interviews-section"
import { TasksSection } from "@/components/dashboard/tasks-section"

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalInterviews: 0,
    passedInterviews: 0,
    failedInterviews: 0,
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
  })
  const [interviews, setInterviews] = useState([])
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  const supabase = createClientComponentClient()

  // FETCH DASHBOARD DATA
  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // FETCH INTERVIEWS
      const { data: interviewsData } = await supabase
        .from("interviews")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10)

      // FETCH TASKS
      const { data: tasksData } = await supabase
        .from("tasks")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10)

      // CALCULATE STATS
      const totalInterviews = interviewsData?.length || 0
      const passedInterviews = interviewsData?.filter((i) => i.status === "passed").length || 0
      const failedInterviews = interviewsData?.filter((i) => i.status === "failed").length || 0

      const totalTasks = tasksData?.length || 0
      const completedTasks = tasksData?.filter((t) => t.status === "completed").length || 0
      const pendingTasks = tasksData?.filter((t) => t.status === "pending").length || 0

      setStats({
        totalInterviews,
        passedInterviews,
        failedInterviews,
        totalTasks,
        completedTasks,
        pendingTasks,
      })

      setInterviews(interviewsData || [])
      setTasks(tasksData || [])
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 rounded-xl animate-pulse" />
          ))}
        </div>
        <div className="h-64 bg-gray-200 rounded-xl animate-pulse" />
        <div className="h-64 bg-gray-200 rounded-xl animate-pulse" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* WORKSPACE HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-900">WORKSPACE</h1>
          <div className="px-3 py-1 bg-gray-900 text-white text-sm rounded-full">New Task</div>
        </div>
      </div>

      {/* STATS CARDS */}
      <StatsCards stats={stats} />

      {/* INTERVIEWS SECTION */}
      <InterviewsSection interviews={interviews} />

      {/* TASKS SECTION */}
      <TasksSection tasks={tasks} />
    </div>
  )
}
