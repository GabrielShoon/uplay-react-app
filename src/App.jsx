import './App.css';
import { useState, useEffect } from 'react';
import { Container, AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./themes/MyTheme";
import http from './http';
import UserContext from './contexts/UserContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Logo from "./assets/Logo.png";


// Bookings pages
import Home from './pages/Home';
import Carts from './pages/Bookings/Carts';
import AddCart from './pages/Bookings/AddCart';
import EditCart from './pages/Bookings/EditCart';
import Register from './pages/Bookings/Register';
import Login from './pages/Bookings/Login';
import Checkout from './pages/Bookings/Checkout';
import CheckoutSuccess from './pages/Bookings/CheckoutSuccess';
import Orders from './pages/Bookings/Orders';
import UserOrders from './pages/Bookings/UserOrders';
import SetBudget from './pages/Bookings/SetBudget';

function App() {

  const [theme, colorMode] = useMode();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      http.get('/user/auth').then((res) => {
        setUser(res.data.user);
      });
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location = "/";
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="static" className="AppBar">
              <Container>
                <Toolbar disableGutters={true}>
                  <Link to="/">
                    <Typography variant="h6" component="div" >
                      <img src={Logo} alt="" />
                    </Typography>
                  </Link>

                  {/* Links */}
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', flexGrow: 1 }}>
                    {/* User Side */}
                    {user && (
                      <>
                        <Link to="/addcart"><Typography>Add Cart</Typography></Link>
                        <Link to="/setbudget"><Typography>Set Budget</Typography></Link>
                        <Link to="/userorders"><Typography>My Orders</Typography></Link>

                        <Link to="/checkout"><ShoppingCartIcon /></Link>
                        <Typography sx={{ color: '#fe9e0d', marginRight: 1 }}>{user.name}</Typography>
                        <Button onClick={logout}>Logout</Button>
                      </>
                    )}

                    {/* Admin Side */}
                    {!user && (
                      <>
                        <Link to="/carts"><Typography>Carts</Typography></Link>
                        <Link to="/orders"><Typography>Orders</Typography></Link>

                        <Link to="/register"><Typography>Register</Typography></Link>
                        <Link to="/login"><Typography>Login</Typography></Link>
                      </>
                    )}
                  </Box>
                </Toolbar>
              </Container>
            </AppBar>

            <Container>
              <Routes>
                <Route path={"/"} element={<Home />} />

                {/* User Side */}
                <Route path={"/addcart"} element={<AddCart />} />
                <Route path={"/editcart/:id"} element={<EditCart />} />
                <Route path={"/checkout"} element={<Checkout />} />
                <Route path={"/checkoutsuccess"} element={<CheckoutSuccess />} />
                <Route path={"/userorders"} element={<UserOrders />} />
                <Route path={"/setbudget"} element={<SetBudget />} />


                {/* Admin Side */}
                <Route path={"/carts"} element={<Carts />} />
                <Route path={"/orders"} element={<Orders />} />


                <Route path={"/register"} element={<Register />} />
                <Route path={"/login"} element={<Login />} />

              </Routes>
            </Container>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </Router>
    </UserContext.Provider>


  );
}

export default App;
