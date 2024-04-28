import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useAppDispatch } from '@/context/appProvider';
import WrapperContent from '../wrapper/wrapperContent';

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
    <WrapperContent text="Registre-se" icon={<LockOutlinedIcon />} bgcolorAvatar='purple'>
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
          Cadastrar
        </Button>
        <Button onClick={() => { dispatch({ type: 'SET_STAGE', payload: 'login' }) }}>
          Já possui uma conta? Faça login
        </Button>
      </Box>
    </WrapperContent>
  );
};

export default FrameRegister;
