import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
	return (
		<div className="p-6 max-w-7xl mx-auto">
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-blue-700">Your Dashboard</h1>
				<p className="text-gray-600 mt-2">Manage your profile, connections, and learning journey</p>
			</div>

			{/* Quick Actions Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
				{/* Profile Card */}
				<div className="bg-white p-6 rounded-lg shadow-md">
					<div className="flex items-center mb-4">
						<div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
							<svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
							</svg>
						</div>
						<div className="ml-4">
							<h2 className="text-xl font-semibold text-gray-800">Profile</h2>
							<p className="text-gray-600">Update your details</p>
						</div>
					</div>
								<div className="space-x-2">
									<Link to="/profile/edit" className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Edit Profile</Link>
									<Link to="/profile" className="inline-block px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50">View Public Profile</Link>
								</div>
				</div>

				{/* Connections Card */}
				<div className="bg-white p-6 rounded-lg shadow-md">
					<div className="flex items-center mb-4">
						<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
							<svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
							</svg>
						</div>
						<div className="ml-4">
							<h2 className="text-xl font-semibold text-gray-800">Connections</h2>
							<p className="text-gray-600">12 Active Connections</p>
						</div>
					</div>
					  <Link to="/connections" className="w-full inline-block text-center py-2 bg-green-600 text-white rounded hover:bg-green-700">Find New Connections</Link>
				</div>

				{/* Messages Card */}
				<div className="bg-white p-6 rounded-lg shadow-md">
					<div className="flex items-center mb-4">
						<div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
							<svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
							</svg>
						</div>
						<div className="ml-4">
							<h2 className="text-xl font-semibold text-gray-800">Messages</h2>
							<p className="text-gray-600">3 Unread messages</p>
						</div>
					</div>
					  <Link to="/messages" className="w-full inline-block text-center py-2 bg-purple-600 text-white rounded hover:bg-purple-700">Open Messages</Link>
				</div>
			</div>

			{/* Messages and Calls Section */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Recent Messages */}
				<div className="bg-white p-6 rounded-lg shadow-md">
					<h3 className="text-xl font-semibold mb-4">Recent Messages</h3>
					<div className="space-y-4">
						{/* Message Item */}
						<div className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
							<img className="w-10 h-10 rounded-full" src="https://randomuser.me/api/portraits/women/12.jpg" alt="User" />
							<div className="ml-3">
								<p className="font-medium">Sarah Wilson</p>
								<p className="text-sm text-gray-600">Can we schedule a call tomorrow?</p>
							</div>
							<span className="ml-auto text-xs text-gray-500">2m ago</span>
						</div>
						{/* More message items */}
						<div className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
							<img className="w-10 h-10 rounded-full" src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" />
							<div className="ml-3">
								<p className="font-medium">Mike Johnson</p>
								<p className="text-sm text-gray-600">Thanks for the Python tips!</p>
							</div>
							<span className="ml-auto text-xs text-gray-500">1h ago</span>
						</div>
					</div>
				</div>

				{/* Video Calls */}
				<div className="bg-white p-6 rounded-lg shadow-md">
					<h3 className="text-xl font-semibold mb-4">Video Calls</h3>
					<div className="space-y-4">
						{/* Scheduled Call */}
						<div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg">
							<div className="flex items-center">
								<div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
									<svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
									</svg>
								</div>
								<div className="ml-4">
									<p className="font-medium">JavaScript Mentoring Session</p>
									<p className="text-sm text-gray-600">Today at 3:00 PM</p>
								</div>
							</div>
							<button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Join Call</button>
						</div>
            
						{/* Quick Video Call */}
						<div className="flex items-center justify-between p-4 border rounded-lg">
							<div className="flex items-center">
								<div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
									<svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
									</svg>
								</div>
								<div className="ml-4">
									<p className="font-medium">Start New Call</p>
									<p className="text-sm text-gray-600">Connect with a mentor or peer</p>
								</div>
							</div>
							<button className="px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50">New Call</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
