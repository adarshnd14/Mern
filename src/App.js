import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';
import Product from './components/Product';
import AdminProduct from './components/AdminProduct';
import { useDispatch, useSelector } from 'react-redux';
import Error from './components/Error';
import { useEffect } from 'react';
import { userAction } from './redux/userReducer';
import NewNav from './components/NewNav';


function App() {
  const state = useSelector(state => state)
  const navState = state.navState
  const role = localStorage.getItem('role')
  const tokenState = localStorage.getItem('login')
  console.log(tokenState);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(userAction.tokenRoute(localStorage.getItem('login')))
  }, [navState]);

  return (
    <div className="App">
      <Router>
        <NewNav />
        <Routes>
          {
            !tokenState && <>
              <Route exact path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
            </>
          }
          {tokenState && <>
            <Route exact path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/product' element={<Product />} />
            {role === 'admin' &&
              <Route path='/adminproduct' element={<AdminProduct />} />}
            <Route path='/logout' element={<Logout />} />
          </>
          }
          <Route path='*' element={<Error />} />

        </Routes>
      </Router>

    </div>
  );
}

export default App;
