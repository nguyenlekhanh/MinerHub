import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { setCookie, getCookie, deleteCookie } from '../library/cookieUtils';

// Create a context for WebSocket
const WebSocketContext = createContext();

// WebSocket Provider to wrap the application
export const WebSocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const [isServerConnected, setIsServerConnected] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [machines, setMachines] = useState([]);
  const [key, setKey] = useState('');

  // Function to initialize socket connection
  const initializeSocket = () => {
    const isLocalhost = window.location.hostname === "localhost";

    // Create socket connection
    socketRef.current = window.io(
        isLocalhost ? "http://localhost:5000" : "wss://python-websocket-server-b31b.onrender.com"
      )

    // Socket events handling
    socketRef.current.on('connect', () => {
      console.log('Connected to server!');
      setIsServerConnected(true);
    });

    socketRef.current.on('disconnect', () => {
      setIsServerConnected(false);
      console.log('Disconnected from server');
    });

    socketRef.current.on('connect_error', (error) => {
      console.error('Connection error: ', error);
    });

    socketRef.current.on('manager-message', (data) => {
      setAlertMessage(data.message);
    });

    socketRef.current.on('manager-key-success', (data) => {
      console.log('cookie save: ' + data.managerKey);
      setCookie('manager_key', data.managerKey, 360); 
    });

    socketRef.current.on('update-client-list', (data) => {
      setMachines([]);

      if (data.client_ids && data.client_ids.length > 0) {
        const newMachines = [];

        data.client_ids.forEach(client_id => {
          const newMachine = { client_id: client_id, name: `${client_id}` };

          // Avoid duplicates
          if (!newMachines.some(machine => machine.client_id === client_id)) {
            newMachines.push(newMachine);
          }
        });
        setMachines(prevMachines => [...prevMachines, ...newMachines]);
      } else {
        setMachines([]);
      }
    });

    socketRef.current.on('client-assigned', (data) => {
      const newMachine = { client_id: data.client_name, name: data.client_name };
      setMachines(prevMachines => {
        if (!prevMachines.some(machine => machine.client_id === newMachine.client_id)) {
          return [...prevMachines, newMachine];
        }
        return prevMachines;
      });
      console.log('Client added to the select box:', data.client_name);
    });

    socketRef.current.on('client-disconnected', (data) => {
      console.log('Client disconnected:', data);
      const clientName = data.client_name;
      setMachines(prevMachines => prevMachines.filter(machine => machine.client_id !== clientName));
    });
  };

  // Check if socket.io is loaded and initialize
  useEffect(() => {
    if (!window.io) {
      const script = document.createElement('script');
      script.src = 'https://cdn.socket.io/4.0.1/socket.io.min.js';
      script.async = true;
      script.onload = initializeSocket;
      script.onerror = (error) => console.error('Error loading Socket.IO script:', error);
      document.head.appendChild(script);
    } else {
      initializeSocket();
    }

    // Cleanup socket connection on component unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        console.log('server disconnect!');
      }
    };
  }, []);

  return (
    <WebSocketContext.Provider
      value={{
        isServerConnected,
        setIsServerConnected,
        alertMessage,
        machines,
        key,
        setKey,
        setMachines,
        setAlertMessage,
        socketRef
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

// Custom hook to use WebSocket context
export const useWebSocket = () => {
  return useContext(WebSocketContext);
};