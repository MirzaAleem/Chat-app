import React, { useContext } from'react';
import Register from './pages/register';
import Login from './pages/login';
import Home from './pages/home';
import './style.scss'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { AuthContext } from './context/authContext';

function App() {
  const {currentUser} = useContext(AuthContext)

  //instead of conditions in routes, we will create a protected route that will check if the user is logged in or not
  const ProtectedRoute = ({children}) => {
    if(!currentUser) {
      return <Navigate to='/login'/>
    }
    return children
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
    )
}

export default App;
