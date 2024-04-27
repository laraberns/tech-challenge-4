import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useAppDispatch } from '@/context/appProvider';
import img from '@/assets/logo.png'
import Image from 'next/image';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers';

const FrameUserHome = ({ nextAction }) => {
    const dispatch = useAppDispatch();
    const [errorMessage, setErrorMessage] = useState('');
    const [quadra, setQuadra] = React.useState('');

    const handleChangeSelectQuadra = (event) => {
        setQuadra(event.target.value);
    };

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
                    <Avatar sx={{ m: 1, bgcolor: 'green' }}>
                        <SportsBaseballIcon />
                    </Avatar>
                    <Typography component="h2" variant="h5">
                        Faça sua reserva
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                        <FormControl fullWidth>
                            <InputLabel id="selectQuadra">Selecione uma quadra</InputLabel>
                            <Select
                                labelId="selectQuadra"
                                id="selectQuadraInput"
                                value={quadra}
                                label="Selecione uma quadra"
                                onChange={handleChangeSelectQuadra}
                            >
                                <MenuItem value={10}>Quadra de Futebol</MenuItem>
                                <MenuItem value={20}>Quadra de Vôlei</MenuItem>
                                <MenuItem value={30}>Quadra de Tênis</MenuItem>
                            </Select>
                        </FormControl>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker label="Selecione o dia" />
                            </DemoContainer>
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['TimePicker', 'TimePicker']}>
                                <TimePicker
                                    label="Horário inicial"
                                />
                                <TimePicker
                                    label="Horário final"
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                        <TextField
                            id="Observacoes"
                            label="Observações"
                            multiline
                            rows={4}
                            fullWidth
                            sx={{ marginTop: 1 }}
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
                            Reservar
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Button onClick={() => { dispatch({ type: 'SET_STAGE', payload: 'userReservations' }) }}>
                                    Já possui reserva? Clique aqui
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default FrameUserHome;
