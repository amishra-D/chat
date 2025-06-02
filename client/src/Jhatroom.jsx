import React from 'react'
import { useState} from 'react';
import { SocketContext } from './SocketContext';
import { useContext } from 'react';
import { useEffect } from 'react';

function Jhatroom() {
    const[message,setmessage]=useState("");
const [messages, setmessages] = useState([]);
  const { socket, username, roomId } = useContext(SocketContext);

  const handlesend=()=>{
    if(message==""){
      alert("Enter a message");
    }
    else{
    socket.emit("message",message)
    setmessage("");
    }
  }
  const handlechange=(e)=>{
    setmessage(e.target.value)
  }
   useEffect(() => {
    socket.on("new_message", ({ message, sender }) => {
      setmessages((prev) => [...prev, { message, sender }]);
    });
    return () => {
      socket.off("new_message");
    };
  }, [socket]);
  return (
    <div className='bg-gradient-to-r from-[#F2994A] to-[#F2C94C] w-full min-h-screen flex flex-col justify-center items-center gap-2'>
        <h1 className='text-white text-2xl font-bold absolute top-0 left-2'>{username}</h1>
      <p className='text-white text-md absolute top-0 right-2'>Room Id-{roomId}</p>
<input type="text" value={message} placeholder="Type Something...." className='p-2' onChange={handlechange}/>
<button className='px-4 py-2 text-white font-semibold rounded-md bg-neutral-900 focus:border-white focus:border-2'onClick={handlesend}>Send</button>
<div className="w-full max-w-xl h-96 relative overflow-y-auto bg-black border-2 flex flex-col border-white p-4 rounded">
  {messages.map((msg, idx) => (
    <div
      key={idx}
      className={`mb-2 px-4 py-2 rounded max-w-xs ${
        msg.sender === username ? 'bg-blue-500 text-white self-end ml-auto' : 'bg-gray-300 text-black self-start mr-auto'
      }`}
    >
      {msg.message}
    </div>
  ))}
</div>
    </div>
  )
}

export default Jhatroom
