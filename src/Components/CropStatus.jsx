import React from "react"

// Example scanned crop data (normally this would come from drone analysis API)
const scannedCrops = [
  {
    id: 1,
    name: "Maize Plant #1",
    status: "Healthy",
    image: "https://via.placeholder.com/150/00ff00/ffffff?text=Healthy",
    recommendation: "✅ No action needed. Keep monitoring."
  },
  {
    id: 2,
    name: "Maize Plant #2",
    status: "Diseased",
    image: "https://via.placeholder.com/150/ff0000/ffffff?text=Diseased",
    recommendation: "💊 Apply pesticide treatment immediately."
  },
  {
    id: 3,
    name: "Maize Plant #3",
    status: "Dry/Dead",
    image: "https://via.placeholder.com/150/808080/ffffff?text=Dry",
    recommendation: "💧 Irrigation required or consider replanting."
  }
]

export default function CropStatus() {
  return (
    <div className="p-6 bg-green-50 min-h-screen">
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
        🌱 Crop Health Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {scannedCrops.map((crop) => (
          <div
            key={crop.id}
            className="bg-white shadow-md rounded-2xl p-4 flex flex-col items-center hover:shadow-lg transition"
          >
            <img
              src={crop.image}
              alt={crop.name}
              className="w-32 h-32 object-cover rounded-xl mb-3"
            />
            <h2 className="text-xl font-semibold text-gray-800">{crop.name}</h2>
            <p
              className={`mt-2 font-bold ${
                crop.status === "Healthy"
                  ? "text-green-600"
                  : crop.status === "Diseased"
                  ? "text-red-600"
                  : "text-gray-600"
              }`}
            >
              {crop.status}
            </p>
            <p className="mt-2 text-sm text-gray-600 text-center">
              {crop.recommendation}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
