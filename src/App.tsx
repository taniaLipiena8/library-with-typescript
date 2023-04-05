import { Route, Routes, useNavigate, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import UserContextProvider from "./context/UserContext";
import Nav from "./components/nav/Nav";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import BookDetail from "./components/book-detail/BookDetail";
import { PrivateRoute } from "./PrivateRoute";
import CartHome from "./components/cart/CartHome";

function App() {
  const auth = localStorage.getItem('user_id')
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    if (!auth) {
      navigate('/login', { replace: true })
    }

    if (pathname.toLowerCase().includes('/login') || pathname === '/') {
      navigate('/book')
    }

  }, [])

  return (
    <div className="App">
      <UserContextProvider>
        <Nav/>
        
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/book" element={<PrivateRoute><Home/></PrivateRoute>}/>
          <Route path='/book/:id' element={<PrivateRoute><BookDetail/></PrivateRoute>}/>
          <Route path="/cart" element={<PrivateRoute><CartHome/></PrivateRoute>}/>
        </Routes>
      </UserContextProvider>
      
    </div>
  );
}

export default App;
