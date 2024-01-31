"use client"
import { useState, useEffect } from "react";

function LoadingPage() {
  const [dotCount, setDotCount] = useState(3);

  useEffect(() => {
    const timer = setTimeout(() => setDotCount((count) => (count >= 5 ? 3 : count + 1)), 500);
    return () => clearTimeout(timer);
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <div className="flex flex-col space-y-4 mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Loading
          {new Array(dotCount).fill(".").join("")}
        </h1>
        <p className="text-base text-gray-600">Please wait while we get things ready.</p>
      </div>
    </div>
  );
}

export default LoadingPage;
