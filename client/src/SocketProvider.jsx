import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { SocketContext } from './SocketContext';

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState('');

  useEffect(() => {
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, []);

  return (
    <SocketContext.Provider value={{
      socket,
      username,
      setUsername,
      roomId,
      setRoomId,
    }}>
      {children}
    </SocketContext.Provider>
  );
};
