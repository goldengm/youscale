import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom';
import Routing from './routes/Routing';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store } from './store';
import { setToken } from './services/auth/setToken';
import { setUserData } from './services/auth/setUserData';

function App(): JSX.Element {

  const parmsConnx = () => {
    var url = new URL(window.location.href);

    var params = new URLSearchParams(url.search);

    var token = params.get("token");
    var userData = params.get("userData");
    
    if (token && userData) {
      setToken(token)
      setUserData(JSON.parse(userData))
    }
  }

  useEffect(() => {
    parmsConnx()
  }, [])
  

  return (
    <Provider store={store}>
      <ToastContainer />
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </Provider>
  )
}

export default App
