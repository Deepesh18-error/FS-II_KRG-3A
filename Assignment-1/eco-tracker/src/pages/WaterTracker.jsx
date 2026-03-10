import { useState, useEffect, useCallback } from "react";
import CounterDisplay from "../components/CounterDisplay";

function WaterTracker() {
  const [count, setCount] = useState(0);
  const [goal, setGoal] = useState(8);

  // Load previous value on refresh
  useEffect(() => {
    const savedCount = localStorage.getItem("waterCount");
    if (savedCount) setCount(Number(savedCount));
  }, []);

  // Save count in localStorage
  useEffect(() => {
    localStorage.setItem("waterCount", count);
  }, [count]);

  // Optimized functions using useCallback
  const addWater = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  const removeWater = useCallback(() => {
    setCount(prev => (prev > 0 ? prev - 1 : 0));
  }, []);

  const reset = () => setCount(0);

  return (
    <div className="flex justify-center mt-10">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border">
        <h2 className="text-2xl font-bold text-center mb-6">Water Tracker</h2>

        <div className="text-center mb-6">
          <CounterDisplay count={count} goal={goal} />
          {count >= goal && (
            <p className="text-green-600 font-bold mt-2">Goal Reached 🎉</p>
          )}
        </div>

        <div className="flex justify-center space-x-4 mb-8">
          <button onClick={addWater} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
            + Add
          </button>
          <button onClick={removeWater} className="bg-gray-200 px-6 py-2 rounded-lg hover:bg-gray-300">
            - Remove
          </button>
          <button onClick={reset} className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600">
            Reset
          </button>
        </div>

        <div className="border-t pt-4">
          <label className="block mb-2 font-medium">Daily Goal (glasses)</label>
          <input
            type="number"
            value={goal}
            onChange={(e) => setGoal(Number(e.target.value))}
            className="w-full border p-2 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default WaterTracker;