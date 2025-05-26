"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Calendar, MapPin, Building } from "lucide-react"
import Link from "next/link"

interface Interview {
  id: string
  company: string
  position: string
  date: string
  location: string
  status: "pending" | "passed" | "failed" | "rescheduled"
  image_url?: string
}

interface InterviewsSectionProps {
  interviews: Interview[]
}

export function InterviewsSection({ interviews }: InterviewsSectionProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "passed":
        return "bg-green-100 text-green-800"
      case "failed":
        return "bg-red-100 text-red-800"
      case "rescheduled":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  return (
    <div className="space-y-4">
      {/* SECTION HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col space-x-3 md:flex-row md:items-center">
          <h2 className="text-lg font-semibold text-gray-900">Interviews</h2>
          <span className="text-sm text-gray-500">{interviews.length} interviews</span>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Link href="/dashboard/interviews/new">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-0" />
            </Button>
          </Link>
        </div>
      </div>

      {/* INTERVIEWS HORIZONTAL SCROLL */}
      <div className="overflow-x-auto custom-scrollbar">
        <div className="flex space-x-4 pb-4" style={{ width: "max-content" }}>
          {interviews.length === 0 ? (
            <Card className="w-80 glass-card border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No interviews yet</h3>
                <p className="text-gray-600 mb-4">Start by adding your first interview</p>
                <Link href="/dashboard/interviews/new">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Interview
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            interviews.map((interview) => (
              <Card key={interview.id} className="w-80 glass-card border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <Building className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{interview.company}</CardTitle>
                        <p className="text-sm text-gray-600">{interview.position}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(interview.status)}>{interview.status}</Badge>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(interview.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {interview.location}
                    </div>
                  </div>

                  <div className="mt-4 flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Reschedule
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
