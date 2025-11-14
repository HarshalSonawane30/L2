import React from 'react'
import { Link } from 'react-router-dom'

export default function Connections(){
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Connections</h2>
      <p className="text-gray-600 mb-6">Browse and manage your connections.</p>
      <ul className="space-y-3">
        <li className="p-3 border rounded">Alice — <button className="ml-2 text-sm text-blue-600">Message</button></li>
        <li className="p-3 border rounded">Bob — <button className="ml-2 text-sm text-blue-600">Message</button></li>
      </ul>
      <div className="mt-4">
        <Link to="/dashboard" className="text-sm text-blue-600">Back to Dashboard</Link>
      </div>
    </div>
  )
}
