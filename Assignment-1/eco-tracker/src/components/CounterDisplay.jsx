import React from "react";

const CounterDisplay = React.memo(({ count, goal }) => {
  console.log("CounterDisplay Rendered");
  return (
    <p className="text-lg font-medium">
      {count} / {goal} glasses completed
    </p>
  );
});

export default CounterDisplay;