import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useAppDispatch } from '@/context/appProvider';
import img from '@/assets/logo.png'
import Image from 'next/image';

const FrameRegister = ({ nextAction }) => {
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');

    if (email !== 'example@example.com') {
      setErrorMessage('Email já cadastrado');
    } else {
      setErrorMessage('')
    }
  };

  return (
    <Box>
      <Container maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Image src={img} alt="Logo" style={{ marginBottom: '20px', width: '150px', height: '75px' }} />
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h2" variant="h5">
            Registre-se
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Endereço de Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            {errorMessage && (
              <Typography variant="body2" color="error" align="center">
                {errorMessage}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Cadastrar
            </Button>
            <Grid container>
              <Grid item>
                <Button onClick={() => { dispatch({ type: 'SET_STAGE', payload: 'login' }) }}>
                  Já possui uma conta? Faça login
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default FrameRegister;
