import React, { useState, useEffect } from 'react';
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
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useEffect(() => {
    const isValidPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
    const isEmailEmpty = !email.trim();
    const isPasswordEmpty = !password.trim();
  
    if (isEmailEmpty && isPasswordEmpty) {
      setErrorMessage(''); 
    } else if (!isValidPassword) {
      setErrorMessage('A senha deve conter pelo menos um número, uma letra maiúscula e uma letra minúscula, e pelo menos 8 caracteres ou mais.');
    } else {
      setErrorMessage('');
    }
  
    setIsSubmitDisabled(isEmailEmpty || isPasswordEmpty || !isValidPassword);
  }, [email, password]);
  
  const verifyUserEmail = async (email) => {
    try {
      const response = await fetch(`http://localhost:8081/api/users/${email}`);
      if (!response.ok) {
        throw new Error('Erro ao verificar o email.');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Erro ao verificar o email. Tente novamente.');
    }
  };

  const createUser = async (email, password) => {
    try {
      const response = await fetch('http://localhost:8081/api/users/addUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      if (!response.ok) {
        throw new Error('Erro ao cadastrar novo usuário.');
      }
      const newUser = await response.json();
      return newUser;
    } catch (error) {
      throw error;
    }
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const data = await verifyUserEmail(email);
      if (!data.status || Object.keys(data).length === 0) {
        const newUser = await createUser(email, password);
        console.log(newUser);
        setErrorMessage('Novo usuário cadastrado!');
      } else {
        setErrorMessage('E-mail já cadastrado.');
      }
    } catch (error) {
      setErrorMessage(error.message);
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
          disabled={isSubmitDisabled}
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
