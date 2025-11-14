import React from 'react'
import { Link } from 'react-router-dom'

export default function ProfileCreate(){
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Create Profile</h2>
      <p className="text-gray-600 mb-6">Fill out your profile to let others find and connect with you.</p>
      <div className="space-y-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Start Creating</button>
        <Link to="/dashboard" className="inline-block ml-2 text-sm text-blue-600">Back to Dashboard</Link>
      </div>
    </div>
  )
}
