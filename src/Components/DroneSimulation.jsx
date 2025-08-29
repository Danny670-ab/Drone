import React, { useState, useEffect } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

export default function DroneSimulation() {
  const GRID_SIZE = 8;
  const TOTAL_CROPS = GRID_SIZE * 12; // 8x12 grid

  // Initialize crop states (0: healthy, 1: diseased, 2: dead)
  const initializeCrops = () => {
    const crops = [];
    for (let i = 0; i < TOTAL_CROPS; i++) {
      const rand = Math.random();
      if (rand < 0.7) crops.push(0); // 70% healthy
      else if (rand < 0.85) crops.push(1); // 15% diseased
      else crops.push(2); // 15% dead
    }
    return crops;
  };

  const [crops, setCrops] = useState(initializeCrops);
  const [dronePosition, setDronePosition] = useState({ row: -1, col: -1 });
  const [scannedCrops, setScannedCrops] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Drone scanning animation
  useEffect(() => {
    if (!isRunning || isComplete) return;

    const interval = setInterval(() => {
      setDronePosition((prev) => {
        if (prev.row === -1) {
          setScannedCrops(1);
          return { row: 0, col: 0 };
        }

        const currentIndex = prev.row * 12 + prev.col;
        if (currentIndex >= TOTAL_CROPS - 1) {
          setIsComplete(true);
          setIsRunning(false);
          return prev;
        }

        const nextCol = (prev.col + 1) % 12;
        const nextRow = nextCol === 0 ? prev.row + 1 : prev.row;

        setScannedCrops(currentIndex + 2);
        return { row: nextRow, col: nextCol };
      });
    }, 150);

    return () => clearInterval(interval);
  }, [isRunning, isComplete]);

  const getCropColor = (index) => {
    const currentIndex = dronePosition.row * 12 + dronePosition.col;
    if (dronePosition.row === -1 || index > currentIndex) {
      return "bg-gray-300"; // Unscanned
    }

    switch (crops[index]) {
      case 0:
        return "bg-green-500"; // Healthy
      case 1:
        return "bg-yellow-500"; // Diseased
      case 2:
        return "bg-red-500"; // Dead
      default:
        return "bg-gray-300";
    }
  };

  const getDronePosition = () => {
    if (dronePosition.row === -1) {
      return { top: `-20px`, left: `-20px` };
    }

    const currentIndex = dronePosition.row * 12 + dronePosition.col;
    if (currentIndex >= TOTAL_CROPS || isComplete) return null;

    return {
      top: `${(dronePosition.row * 100) / GRID_SIZE + 12.5}%`,
      left: `${(dronePosition.col * 100) / 12 + 4.17}%`,
    };
  };

  const handleStart = () => {
    if (isComplete) return;
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsComplete(false);
    setDronePosition({ row: -1, col: -1 });
    setScannedCrops(0);
    setCrops(initializeCrops());
  };

  const healthyCount = crops.filter((crop, index) => {
    if (dronePosition.row === -1) return false;
    const currentIndex = dronePosition.row * 12 + dronePosition.col;
    return crop === 0 && (index <= currentIndex || isComplete);
  }).length;

  const diseasedCount = crops.filter((crop, index) => {
    if (dronePosition.row === -1) return false;
    const currentIndex = dronePosition.row * 12 + dronePosition.col;
    return crop === 1 && (index <= currentIndex || isComplete);
  }).length;

  const deadCount = crops.filter((crop, index) => {
    if (dronePosition.row === -1) return false;
    const currentIndex = dronePosition.row * 12 + dronePosition.col;
    return crop === 2 && (index <= currentIndex || isComplete);
  }).length;

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-6 shadow rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold text-gray-800">
          Drone Field Simulation
        </h1>
        <div className="flex gap-2">
          <button
            onClick={handleStart}
            disabled={isRunning || isComplete}
            className="flex items-center gap-2 px-4 py-2 bg-orange-400 text-white rounded-md hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play size={16} />
            Start
          </button>
          <button
            onClick={handlePause}
            disabled={!isRunning}
            className="flex items-center gap-2 px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Pause size={16} />
            Pause
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
          >
            <RotateCcw size={16} />
            Reset
          </button>
        </div>
      </div>

      {/* Field Grid */}
      <div className="relative border-2 border-gray-300 rounded-lg p-4 mb-6 bg-gray-50">
        <div className="grid grid-cols-12 gap-1 relative">
          {crops.map((crop, index) => (
            <div
              key={index}
              className={`w-6 h-6 rounded-full transition-colors duration-200 ${getCropColor(
                index
              )}`}
            />
          ))}

          {/* Drone */}
          {getDronePosition() && (
            <div
              className="absolute w-6 h-6 bg-gray-800 rounded-full border-2 border-white transition-all duration-150 z-10 flex items-center justify-center"
              style={getDronePosition()}
            >
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-6 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-700">Healthy</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
          <span className="text-sm text-gray-700">Diseased</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded-full"></div>
          <span className="text-sm text-gray-700">Dead</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
          <span className="text-sm text-gray-700">Unscanned</span>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Progress: {scannedCrops} / {TOTAL_CROPS} crops scanned
          {isComplete && (
            <span className="text-green-600 font-semibold ml-2">
              Scan Complete!
            </span>
          )}
        </p>
      </div>

      {/* Final Results */}
      {(scannedCrops > 0 || isComplete) && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">
            {isComplete ? "Final Scan Results:" : "Current Scan Results:"}
          </h3>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="font-bold text-green-600">{healthyCount}</div>
              <div className="text-gray-600">Healthy</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-yellow-600">{diseasedCount}</div>
              <div className="text-gray-600">Diseased</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-red-600">{deadCount}</div>
              <div className="text-gray-600">Dead</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
