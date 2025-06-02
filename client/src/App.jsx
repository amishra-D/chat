import React from 'react'

import Jhatroom from './Jhatroom';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Credentials from './Credentials';


const App = () => {
  return (
    <div className='bg-black w-full min-h-screen flex flex-col gap-3 justify-center items-center'>
     <Routes>
          <Route path='/' element={<Credentials/>}></Route>
    <Route path='/room' element={<Jhatroom/>}></Route>
  </Routes>
  </div>
     
  )
}

export default App
