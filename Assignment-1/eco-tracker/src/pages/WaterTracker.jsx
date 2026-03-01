import { useState, useEffect, useCallback } from "react";
import CounterDisplay from "../components/CounterDisplay";

function WaterTracker() {
  const [count, setCount] = useState(0);
  const [goal, setGoal] = useState(8);
  const [tip, setTip] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedCount = localStorage.getItem("waterCount");
    if (savedCount) setCount(Number(savedCount));


  }, []);

  useEffect(() => {
    localStorage.setItem("waterCount", count);


  }, [count]);

  const addWater = useCallback(() => {
    setCount(prev => prev + 1);

    
  }, []);

  const removeWater = useCallback(() => {
    setCount(prev => (prev > 0 ? prev - 1 : 0));
  }, []);

  const reset = () => setCount(0);

  const fetchTip = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("https://api.adviceslip.com/advice");
      const data = await res.json();
      setTip(data.slip.advice);
    } catch {
      setError("Failed to fetch advice.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center">Water Intake Tracker</h2>

        <CounterDisplay count={count} goal={goal} />

        <div className="flex justify-center space-x-4">
          <button onClick={addWater} className="bg-primary text-white px-4 py-2 rounded-lg">+</button>
         
          <button onClick={removeWater} className="bg-gray-300 px-4 py-2 rounded-lg">-</button>
          <button onClick={reset} className="bg-red-400 text-white px-4 py-2 rounded-lg">Reset</button>
        </div>

        {count >= goal && <p className="text-green-600 font-semibold text-center">Goal Reached 🎉</p>}

        <div>
          <label className="block mb-1 font-medium">Set Daily Goal</label>
          <input
            type="number"
            value={goal}

            onChange={(e) => setGoal(Number(e.target.value))}
            className="w-full border p-2 rounded-lg"
          />
        </div>

        <div className="text-center"
        
        >

          <button onClick={fetchTip} className="bg-primary text-white px-6 py-2 rounded-xl">
            Get Health Tip
          </button>


          {loading&&<p className="mt-2">Loading...</p>}
          {error      && <p className="mt-2 text-red-500">{error}</p>}
          {tip     && <p className="mt-2 text-gray-700">Today's Health Tip: {tip}</p>}
        </div>
      </div>
    </div>
  );
}

export default WaterTracker;