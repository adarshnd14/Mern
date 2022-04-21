// import React, { useState } from 'react'
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import Container from '@mui/material/Container';
// import Button from '@mui/material/Button';
// import MenuItem from '@mui/material/MenuItem';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { userAction } from '../redux/userReducer';


// function Navbar() {
//     // console.log(props);
//     const [anchorElNav, setAnchorElNav] = useState(null);
//     const [anchorElUser, setAnchorElUser] = useState(null);

//     const navigate = useNavigate()
//     //accessing store
//     const state = useSelector(state => state)
//     // const navState = state.navState
//     // const navRole = state.navRole
//     // const isToken = state.isToken
//     const navRole = localStorage.getItem('role')
//     // console.log(navRole);
//     const navState = localStorage.getItem('isLogin')
//     const isToken = localStorage.getItem('login')
//     // console.log(isToken);

//     const dispatch = useDispatch()

//     const handleOpenNavMenu = (event) => {
//         setAnchorElNav(event.currentTarget);
//     };
//     const handleOpenUserMenu = (event) => {
//         setAnchorElUser(event.currentTarget);
//     };

//     const handleCloseNavMenu = () => {
//         setAnchorElNav(null);
//     };

//     const handleCloseUserMenu = () => {
//         setAnchorElUser(null);
//     };

//     return (
//         <div>
//             <AppBar position="static">
//                 <Container maxWidth="xl">
//                     <Toolbar disableGutters>
//                         <Typography
//                             id="typography"
//                             variant="h6"
//                             noWrap
//                             component="div"
//                             sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
//                             onClick={() => {
//                                 navigate('/')
//                             }}
//                         >
//                             <img src='https://ionicframework.com/docs/icons/logo-react-icon.png'
//                                 alt='logo' height={'50px'}
//                             />
//                         </Typography>

//                         <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
//                             <IconButton
//                                 size="large"
//                                 aria-label="account of current user"
//                                 aria-controls="menu-appbar"
//                                 aria-haspopup="true"
//                                 onClick={handleOpenNavMenu}
//                                 color="inherit"
//                             >
//                                 <MenuIcon />
//                             </IconButton>
//                             <Menu
//                                 id="menu-appbar"
//                                 anchorEl={anchorElNav}
//                                 anchorOrigin={{
//                                     vertical: 'bottom',
//                                     horizontal: 'left',
//                                 }}
//                                 keepMounted
//                                 transformOrigin={{
//                                     vertical: 'top',
//                                     horizontal: 'left',
//                                 }}
//                                 open={Boolean(anchorElNav)}
//                                 onClose={handleCloseNavMenu}
//                                 sx={{
//                                     display: { xs: 'block', md: 'none' },
//                                 }}
//                             >
//                                 {(!isToken || navState === 'logout') && <>
//                                     <MenuItem onClick={handleCloseNavMenu}>
//                                         <Typography textAlign="center"
//                                             onClick={() => {
//                                                 navigate('/register')
//                                             }}
//                                         >Register</Typography>
//                                     </MenuItem>

//                                     <MenuItem onClick={handleCloseNavMenu}>
//                                         <Typography textAlign="center"
//                                             onClick={() => {
//                                                 navigate('/login')
//                                             }}>Login</Typography>
//                                     </MenuItem></>}

//                                 {(isToken && navState === 'login') && <>
//                                     <MenuItem onClick={handleCloseNavMenu}>
//                                         <Typography textAlign="center"
//                                             onClick={() => {
//                                                 navigate('/product')
//                                             }}>Products</Typography>
//                                     </MenuItem>

//                                     {navRole === 'admin' && navState === 'login' &&
//                                         < MenuItem onClick={handleCloseNavMenu}>
//                                             <Typography textAlign="center"
//                                                 onClick={() => {
//                                                     navigate('/adminproduct')
//                                                 }}>Add Product</Typography>
//                                         </MenuItem>}

//                                     <MenuItem onClick={handleCloseNavMenu}>
//                                         <Typography textAlign="center"
//                                             onClick={() => {
//                                                 navigate('/')
//                                                 dispatch(userAction.navRoute('logout'))
//                                                 localStorage.clear()
//                                                 localStorage.setItem('isLogin','logout')
//                                             }}>Logout</Typography>
//                                     </MenuItem>
//                                 </>}

//                             </Menu>
//                         </Box>
//                         <Typography
//                             variant="h6"
//                             noWrap
//                             component="div"
//                             sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
//                             onClick={() =>
//                                 navigate('/')
//                             }
//                         >
//                             <img src='https://ionicframework.com/docs/icons/logo-react-icon.png'
//                                 alt='logo' height={'50px'}

//                             />
//                         </Typography>

//                         {(isToken) && <> <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
//                             {navState === 'login' && <Button
//                                 onClick={() =>
//                                     navigate("/product")
//                                 }
//                                 sx={{ my: 2, color: 'white', display: 'block' }}
//                             >
//                                 Products
//                             </Button>}

//                             {(navRole === 'admin' && navState === 'login')  &&
//                                 <Button
//                                     onClick={() =>
//                                         navigate("/adminproduct")
//                                     }
//                                     sx={{ my: 2, color: 'white', display: 'block' }}
//                                 >
//                                     Add products
//                                 </Button>}

//                             {navState === 'login' && <Button
//                                 onClick={() => {
//                                     navigate("/")
//                                     dispatch(userAction.navRoute('logout'))
//                                     localStorage.clear()
//                                     // localStorage.setItem('isLogin','logout')
//                                 }}
//                                 sx={{ my: 2, color: 'white', display: 'block' }}
//                             >
//                                 Logout
//                             </Button>}
//                         </Box></>}

//                         {(!isToken) && <> <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: 'end' } }}>
//                             <Button

//                                 sx={{ my: 2, color: 'white', display: 'block' }}
//                                 onClick={() => {
//                                     navigate('/register')
//                                 }}
//                             >
//                                 Register
//                             </Button>
//                             <Button
//                                 onClick={() => {
//                                     navigate('/login')
//                                 }}
//                                 sx={{ my: 2, color: 'white', display: 'block' }}
//                             >
//                                 Login
//                             </Button>
//                         </Box></>}

//                     </Toolbar>
//                 </Container>
//             </AppBar>
//         </div >
//     )
// }

// export default Navbar