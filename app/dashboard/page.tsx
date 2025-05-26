"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { InterviewsSection } from "@/components/dashboard/interviews-section"
import { TasksSection } from "@/components/dashboard/tasks-section"

// Define your data types based on what your components expect
interface Interview {
  id: string
  company: string
  position: string
  date: string
  location: string
  status: 'passed' | 'failed' | 'pending'
  created_at: string
  // Add other interview properties as needed
  [key: string]: any
}

interface Task {
  id: string
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
  due_date: string
  status: 'completed' | 'pending' | 'cancelled'
  created_at: string
  // Add other task properties as needed
  [key: string]: any
}

interface Stats {
  totalInterviews: number
  passedInterviews: number
  failedInterviews: number
  totalTasks: number
  completedTasks: number
  pendingTasks: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    totalInterviews: 0,
    passedInterviews: 0,
    failedInterviews: 0,
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
  })
  
  // Properly type your state arrays
  const [interviews, setInterviews] = useState<Interview[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const supabase = createClientComponentClient()

  // FETCH DASHBOARD DATA
  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async (): Promise<void> => {
    try {
      // FETCH INTERVIEWS - select specific columns that match your interface
      const { data: interviewsData, error: interviewsError } = await supabase
        .from("interviews")
        .select("id, company, position, date, location, status, created_at")
        .order("created_at", { ascending: false })
        .limit(10)

      // FETCH TASKS - ensure all required fields are selected and have default values
      const { data: tasksData, error: tasksError } = await supabase
        .from("tasks")
        .select("id, title, description, priority, due_date, status, created_at")
        .order("created_at", { ascending: false })
        .limit(10)

      // Handle potential errors
      if (interviewsError) throw interviewsError
      if (tasksError) throw tasksError

      // CALCULATE STATS
      const totalInterviews = interviewsData?.length || 0
      const passedInterviews = interviewsData?.filter((i: Interview) => i.status === "passed").length || 0
      const failedInterviews = interviewsData?.filter((i: Interview) => i.status === "failed").length || 0

      const totalTasks = tasksData?.length || 0
      const completedTasks = tasksData?.filter((t: Task) => t.status === "completed").length || 0
      const pendingTasks = tasksData?.filter((t: Task) => t.status === "pending").length || 0

      setStats({
        totalInterviews,
        passedInterviews,
        failedInterviews,
        totalTasks,
        completedTasks,
        pendingTasks,
      })

      // Transform and ensure all required fields are present
      const transformedTasks = tasksData?.map(task => ({
        ...task,
        description: task.description || '',
        priority: task.priority || 'medium',
        due_date: task.due_date || ''
      })) || []

      setInterviews((interviewsData as Interview[]) || [])
      setTasks(transformedTasks as Task[])
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