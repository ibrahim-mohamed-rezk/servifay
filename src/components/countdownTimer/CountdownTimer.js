import React, { useEffect, useState } from "react";

const CountdownTimer = ({ initialTime }) => {
  const [expiryTime, setExpiryTime] = useState(initialTime);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setExpiryTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(timerInterval);
          // Call the onExpire callback when the timer reaches 0
          return 0;
        }
      });
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(timerInterval);
  }, [initialTime]);

  // Format the remaining time for display
  const formattedTime = `${Math.floor(expiryTime / 60)
    .toString()
    .padStart(2, " 0")}:${(expiryTime % 60)
    .toString()
    .padStart(2, "0")}`;
    

  return <>{formattedTime}</>;
};

export default CountdownTimer;
