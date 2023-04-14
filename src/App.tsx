import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom';
import Routing from './routes/Routing';

function App(): JSX.Element {

  return (
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  )
}

export default App
