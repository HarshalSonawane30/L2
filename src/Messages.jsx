import React from 'react'
import { Link } from 'react-router-dom'

export default function Messages(){
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Messages</h2>
      <p className="text-gray-600 mb-6">Your message inbox.</p>
      <div className="space-y-3">
        <div className="p-3 border rounded">Sarah: Can we schedule a call? <button className="ml-2 text-sm text-blue-600">Open</button></div>
        <div className="p-3 border rounded">Mike: Thanks! <button className="ml-2 text-sm text-blue-600">Open</button></div>
      </div>
      <div className="mt-4">
        <Link to="/dashboard" className="text-sm text-blue-600">Back to Dashboard</Link>
      </div>
    </div>
  )
}
