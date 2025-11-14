import React from "react";

function Contact() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-semibold text-blue-700 mb-4">Contact Us</h1>
      <p className="text-gray-700 mb-6">We’d love to hear from you! Drop us a message below.</p>

      <form className="max-w-md mx-auto bg-gray-100 p-6 rounded-lg shadow-md">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full mb-4 p-2 border rounded"
        />
        <textarea
          placeholder="Your Message"
          className="w-full mb-4 p-2 border rounded"
        ></textarea>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Send Message
        </button>
      </form>
    </div>
  );
}

export default Contact;
