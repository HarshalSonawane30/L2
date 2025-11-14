import React from 'react'
import { Link } from 'react-router-dom'

export default function ProfileEdit(){
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
      <p className="text-gray-600 mb-6">Update your profile details here.</p>
      <div className="space-y-4">
        <button className="px-4 py-2 bg-green-600 text-white rounded">Edit Now</button>
        <Link to="/dashboard" className="inline-block ml-2 text-sm text-blue-600">Back to Dashboard</Link>
      </div>
    </div>
  )
}
