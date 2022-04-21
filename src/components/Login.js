import React from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userAction } from '../redux/userReducer';
import axios from 'axios';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:3000">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();


function Login() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const loginData = {
      uEmail: data.get('email'),
      uPassword: data.get('password'),
    }

    try {
      const res = await axios.post('http://localhost:8000/login', loginData)
      const role = res.data.data.userValid.uRole
      localStorage.setItem('role', role)
      console.log(res);
      const token = res.data.data.token;

      //if response is 200
      if (res.status === 200) {
        dispatch(userAction.navRoute('login'))
        localStorage.setItem('login', token)
        localStorage.setItem('isLogin', 'login')
        alert('Successfully Logged in')

        //route based on role and dispatching role
        if (role === 'admin') {
          dispatch(userAction.roleRoute('admin'))
          navigate('/adminproduct')
        } else {
          dispatch(userAction.roleRoute('user'))
          navigate('/product')
        }
      }
    } catch (err) {
      console.log(err);
      alert('Invalid credentials!')
    }
    // navigate('/product')
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>

              <Grid item>
                <NavLink to='/register' variant='body2'>
                  {"Don't have an account? Register"}
                </NavLink>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </div>
  )
}

export default Login