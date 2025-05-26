"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, CheckSquare, Clock, AlertCircle } from "lucide-react"
import Link from "next/link"

interface Task {
  id: string
  title: string
  description: string
  due_date: string
  status: "pending" | "completed" | "cancelled"
  priority: "low" | "medium" | "high"
}

interface TasksSectionProps {
  tasks: Task[]
}

export function TasksSection({ tasks }: TasksSectionProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-yellow-100 text-yellow-800"
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "medium":
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <CheckSquare className="h-4 w-4 text-green-500" />
    }
  }

  return (
    <div className="space-y-4">
      {/* SECTION HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <h2 className="text-lg font-semibold text-gray-900">Your Day's Tasks</h2>
          <span className="text-sm text-gray-500">{tasks.length} tasks</span>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <CheckSquare className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Link href="/dashboard/tasks/new">
            <Button size="sm" className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </Link>
        </div>
      </div>

      {/* TASKS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.length === 0 ? (
          <Card className="glass-card border-0 shadow-lg col-span-full">
            <CardContent className="p-8 text-center">
              <CheckSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks yet</h3>
              <p className="text-gray-600 mb-4">Create your first task to get started</p>
              <Link href="/dashboard/tasks/new">
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Task
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          tasks.map((task) => (
            <Card key={task.id} className="glass-card border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    {getPriorityIcon(task.priority)}
                    <CardTitle className="text-base">{task.title}</CardTitle>
                  </div>
                  <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>

                <div className="flex items-center text-xs text-gray-500 mb-4">
                  <Clock className="h-3 w-3 mr-1" />
                  Due: {new Date(task.due_date).toLocaleDateString()}
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1" disabled={task.status === "completed"}>
                    {task.status === "completed" ? "Done" : "Complete"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
