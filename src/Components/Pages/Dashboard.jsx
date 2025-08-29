import React from "react";
import DroneSimulation from "../DroneSimulation";
import CropStatus from "../CropStatus";
import ImageGallery from "../ImageGallery";
import Recommendations from "../Recommendations";

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6 ">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-green-700 text-center">
        Agricultural Drone Monitoring System
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Monitor crop health and optimize farming operations with real-time
        drone surveillance and AI-powered insights.
      </p>

      {/* Drone Simulation Section */}
      <section className=" p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Drone Field Simulation</h2>
        <DroneSimulation />
      </section>

      {/* Crop Status Section */}
      <section className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Crop Status</h2>
        <CropStatus />
      </section>

      {/* Image Gallery Section */}
      <section className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Captured Images</h2>
        <ImageGallery />
      </section>

      {/* Recommendations Section */}
      <section className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
        <Recommendations />
      </section>
    </div>
  );
}
