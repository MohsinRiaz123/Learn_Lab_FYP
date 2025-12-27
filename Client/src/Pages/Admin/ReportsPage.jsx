import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/Card"
import { Button } from "../../components/Button"
import { Input } from "../../components/Input"
import { Label } from "../../components/Label"
import React from 'react'

const ReportsPage = () => {
   const [dateRange, setDateRange] = useState({
    startDate: "2024-01-01",
    endDate: "2024-01-31",
  })

  const handleGenerateReport = (type) => {
    console.log(`Generating ${type} report for ${dateRange.startDate} to ${dateRange.endDate}`)
    alert(`${type} report generated successfully!`)
  }

  const handleExport = (format, type) => {
    console.log(`Exporting ${type} report as ${format}`)
    alert(`${type} report exported as ${format}!`)
  }

  const reports = [
    {
      title: "Student Enrollment Report",
      description: "Detailed report of student enrollments and course completions",
      icon: "👥",
    },
    {
      title: "Revenue Report",
      description: "Financial overview including course sales and revenue trends",
      icon: "💰",
    },
    {
      title: "Course Performance Report",
      description: "Analytics on course popularity and completion rates",
      icon: "📚",
    },
    {
      title: "Instructor Activity Report",
      description: "Overview of instructor performance and course creation",
      icon: "👨‍🏫",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <p className="text-gray-600">Generate and export platform reports</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Date Range</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={dateRange.startDate}
                onChange={(e) => setDateRange((prev) => ({ ...prev, startDate: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={dateRange.endDate}
                onChange={(e) => setDateRange((prev) => ({ ...prev, endDate: e.target.value }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map((report, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{report.icon}</span>
                <div>
                  <CardTitle className="text-lg">{report.title}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full" onClick={() => handleGenerateReport(report.title)}>
                  Generate Report
                </Button>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleExport("PDF", report.title)}>
                    Export PDF
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleExport("CSV", report.title)}>
                    Export CSV
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default ReportsPage

