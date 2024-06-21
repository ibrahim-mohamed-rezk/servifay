import React, { useEffect, useState } from "react";
import echo from "../echo";

function NotificationComponent() {
  const [message, setMessage] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const channel = echo.channel("Servifay");

    echo.connector.pusher.connection.bind("connected", () => {
      setConnected(true);
      console.log("Connected to Pusher");
    });

    // Listen for disconnection
    echo.connector.pusher.connection.bind("disconnected", () => {
      setConnected(false);
      console.log("Disconnected from Pusher");
    });

    // Listen for reconnection attempts
    echo.connector.pusher.connection.bind("connecting", () => {
      setConnected(false);
      console.log("Reconnecting to Pusher...");
    });

    // Listen for reconnection success
    echo.connector.pusher.connection.bind("reconnected", () => {
      setConnected(true);
      console.log("Reconnected to Pusher");
    });

    // Listen for state change
    echo.connector.pusher.connection.bind("state_change", (states) => {
      console.log("Pusher connection state changed:", states);
    });

    // Handle events
    console.log(channel);
    channel.listen("App.Events.BookingEvent", (event) => {
      console.log("Booking event received:", event);
      setMessage(event);
    });

    // Cleanup
    return () => {
      echo.leaveChannel("Servifay");
    };
  }, []);

  useEffect(() => {
    console.log(message);
  }, [message]);

  return (
    <div>
      <p>Connection Status: {connected ? "Connected" : "Disconnected"}</p>
      {message ? (
        <div>
          <p>New Notification:</p>
          <ul>
            <li>Booking ID: {message.booking_id}</li>
            <li>User ID: {message.user_id}</li>
            {/* Add more details as needed */}
          </ul>
        </div>
      ) : (
        <p>No new notifications</p>
      )}
    </div>
  );
}

export default NotificationComponent;
