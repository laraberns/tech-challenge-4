import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useAppDispatch } from '@/context/appProvider';
import WrapperContent from '../wrapper/wrapperContent';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const FrameLogin = ({ nextAction }) => {
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); 
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    if (email !== 'example@example.com' || password !== '123456') {
      setErrorMessage('Email e/ou senha incorretos. Tente novamente');
    } else {
      setErrorMessage('')
      console.log('Usuário autenticado com sucesso!')
    }
  };

  return (
    <WrapperContent text="Login" icon={<LockOutlinedIcon />} bgcolorAvatar='purple'>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Endereço de Email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Senha"
          type="password"
          id="password"
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
          sx={{ mt: 2, mb: 2 }}
        >
          Entrar
        </Button>
        <Button onClick={() => { dispatch({ type: 'SET_STAGE', payload: 'register' }) }}>
          Não possui uma conta? Cadastre-se
        </Button>
      </Box>
    </WrapperContent>
  );
};

export default FrameLogin;
