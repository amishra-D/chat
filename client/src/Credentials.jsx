import { useContext, useState } from 'react';
import { SocketContext } from './SocketContext';
import { useNavigate } from 'react-router-dom';

const Credentials = () => {
  const { socket, setUsername, setRoomId } = useContext(SocketContext);
  const [usernameInput, setUsernameInput] = useState('');
  const [roomIdInput, setRoomIdInput] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    setUsername(usernameInput);
    setRoomId(roomIdInput);
    socket.emit('room_entered', {
      username: usernameInput,
      roomId: roomIdInput,
    });
    navigate('/room');
  };

  return (
    <div className='min-h-screen w-full md:max-w-xl flex flex-col gap-2 justify-center items-center'>
      <input value={usernameInput} className='text-xl p-2' onChange={e => setUsernameInput(e.target.value)} placeholder="Username" />
      <input value={roomIdInput} className='text-xl p-2 focus:outline-emerald-100' onChange={e => setRoomIdInput(e.target.value)} placeholder="Room ID" />
      <button onClick={handleSubmit} className='bg-white text-black px-4 py-2'>Join</button>
    </div>
  );
};

export default Credentials;
