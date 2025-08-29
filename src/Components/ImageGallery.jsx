import React, { useState } from "react"
import dev1 from "../assets/dev1.png"
import dev2 from "../assets/dev2.png"
import dev3 from "../assets/dev3.png"

const cropImages = [
  {
    id: 1,
    src: dev3,
    title: "Corn Field - Section A1",
    location: "North Field",
    timestamp: "2024-01-15 10:30 AM",
    status: "healthy",
    coordinates: "40.7128°N, 74.0060°W",
  },
  {
    id: 2,
    src: dev2,
    title: "Wheat Field - Section B2",
    location: "East Field",
    timestamp: "2024-01-15 11:15 AM",
    status: "diseased",
    coordinates: "40.7130°N, 74.0058°W",
  },
  {
    id: 3,
    src: dev1,
    title: "Soybean Field - Section C3",
    location: "South Field",
    timestamp: "2024-01-15 12:00 PM",
    status: "dead",
    coordinates: "40.7125°N, 74.0062°W",
  },
]

export default function ImageGallery() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [filter, setFilter] = useState("all")

  const filteredImages =
    filter === "all" ? cropImages : cropImages.filter((img) => img.status === filter)

  const getStatusColor = (status) => {
    switch (status) {
      case "healthy":
        return "bg-green-500"
      case "diseased":
        return "bg-yellow-500"
      case "dead":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Captured Images</h2>

      {/* Filters */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1 rounded ${filter === "all" ? "bg-green-600 text-white" : "bg-gray-200"}`}
        >
          All ({cropImages.length})
        </button>
        <button
          onClick={() => setFilter("healthy")}
          className={`px-3 py-1 rounded ${filter === "healthy" ? "bg-green-600 text-white" : "bg-gray-200"}`}
        >
          Healthy
        </button>
        <button
          onClick={() => setFilter("diseased")}
          className={`px-3 py-1 rounded ${filter === "diseased" ? "bg-green-600 text-white" : "bg-gray-200"}`}
        >
          Diseased
        </button>
        <button
          onClick={() => setFilter("dead")}
          className={`px-3 py-1 rounded ${filter === "dead" ? "bg-green-600 text-white" : "bg-gray-200"}`}
        >
          Dead
        </button>
      </div>

      {/* Gallery */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredImages.map((img) => (
          <div
            key={img.id}
            className="border rounded-lg overflow-hidden shadow cursor-pointer"
            onClick={() => setSelectedImage(img)}
          >
            <img src={img.src} alt={img.title} className="h-40 w-full object-cover" />
            <div className="p-2">
              <h3 className="font-semibold text-sm">{img.title}</h3>
              <p className="text-xs text-gray-500">{img.location}</p>
              <span className={`inline-block mt-1 px-2 py-1 text-xs rounded text-white ${getStatusColor(img.status)}`}>
                {img.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-bold mb-2">{selectedImage.title}</h3>
            <img src={selectedImage.src} alt={selectedImage.title} className="w-full h-64 object-cover rounded mb-2" />
            <p><strong>Location:</strong> {selectedImage.location}</p>
            <p><strong>Captured:</strong> {selectedImage.timestamp}</p>
            <p><strong>Coordinates:</strong> {selectedImage.coordinates}</p>
            <p><strong>Status:</strong> {selectedImage.status}</p>
            <button
              onClick={() => setSelectedImage(null)}
              className="mt-3 px-4 py-2 bg-red-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
