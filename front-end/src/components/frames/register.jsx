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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); 
  
    try {
      const response = await fetch('http://localhost:8081/api/users/addUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
  
      let responseData = await response.json();
      setErrorMessage(responseData.message);
     
    } catch (error) {
      setErrorMessage(error.message || 'Erro ao criar novo usuário.');
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Senha"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errorMessage && (
          <Typography variant="body1" color="error" align="center">
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
