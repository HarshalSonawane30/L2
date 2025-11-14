import React from 'react'
import { Link } from 'react-router-dom'

export default function ProfileView(){
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Public Profile</h2>
      <p className="text-gray-600 mb-6">This is how others see your profile.</p>
      <div className="space-y-4">
        <button className="px-4 py-2 bg-gray-200 rounded">View as Guest</button>
        <Link to="/dashboard" className="inline-block ml-2 text-sm text-blue-600">Back to Dashboard</Link>
      </div>
    </div>
  )
}
