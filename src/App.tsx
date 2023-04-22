import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom';
import Routing from './routes/Routing';
import { Provider } from 'react-redux';
import { store } from './store';

function App(): JSX.Element {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </Provider>
  )
}

export default App
