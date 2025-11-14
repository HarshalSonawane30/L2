import React from 'react'
import { Link } from 'react-router-dom'

export default function VideoCall(){
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Video Calls</h2>
      <p className="text-gray-600 mb-6">Start or join video calls with your connections.</p>
      <div className="space-x-2">
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Start Video Call</button>
        <button className="px-4 py-2 border rounded">Schedule Call</button>
      </div>
      <div className="mt-4">
        <Link to="/dashboard" className="text-sm text-blue-600">Back to Dashboard</Link>
      </div>
    </div>
  )
}
