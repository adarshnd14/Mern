import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const logoutNav = [
    // {name:'Home', path:'/'},
    { name: 'Login', path: '/login' },
    { name: 'Register', path: '/register' },
]

const adminNav = [
    { name: 'AdminProduct', path: '/adminproduct' },
    { name: 'Product', path: '/product' },
    { name: 'Logout', path: '/logout' },
]

const userNav = [
    { name: 'Product', path: '/product' },
    { name: 'Logout', path: '/logout' },
]

const NewNav = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [navbar, setnavbar] = useState([]);
    const navigate = useNavigate()
    const state = useSelector(state => state)
    const navState = state.navState

    useEffect(() => {
        const role = localStorage.getItem('role')
        if (role === 'admin') {
            setnavbar(adminNav)
        }
        else if (role === 'user') {
            setnavbar(userNav)
        } else {
            setnavbar(logoutNav)
        }
    }, [navState]);


    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };


    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                        onClick={() => {
                            navigate('/')
                        }}
                    >
                        <img src='https://ionicframework.com/docs/icons/logo-react-icon.png'
                            alt='logo' height={'50px'}
                        />
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {navbar.map((val) => (
                                <MenuItem key={val.name} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center"
                                        onClick={() => { navigate(val.path) }}
                                    >{val.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                        onClick={() => {
                            navigate('/')
                        }}
                    >
                        <img src='https://ionicframework.com/docs/icons/logo-react-icon.png'
                            alt='logo' height={'50px'}
                        />
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {navbar.map((val) => (
                            <Button
                                key={val.name}
                                onClick={() => { navigate(val.path) }}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {val.name}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default NewNav;
