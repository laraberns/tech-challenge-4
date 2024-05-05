import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useAppDispatch } from '../../context/appProvider';
import WrapperContent from '../wrapper/wrapperContent';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const FrameLogin = ({ nextAction }) => {
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8081/api/users/verifyUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const responseData = await response.json()

      setErrorMessage(responseData.message);

      if (response.status === 200) {
        setErrorMessage('')
        const { userType } = responseData
        let stage = userType === 'admin' ? 'adminHome' : 'userHome';
        dispatch({ type: 'SET_STAGE', payload: stage })
      }
    } catch (error) {
      setErrorMessage(error.message || 'Erro ao verificar usuário.');
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
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Senha"
          type="password"
          id="password"
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
