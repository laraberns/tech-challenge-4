import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import Typography from '@mui/material/Typography';
import { useAppDispatch } from '@/context/appProvider';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import WrapperContent from '../wrapper/wrapperContent';

const FrameUserSchedule = ({ nextAction }) => {
    const dispatch = useAppDispatch();
    const [errorMessage, setErrorMessage] = useState('');
    const [quadra, setQuadra] = useState('');
    const [timeQuant, setTimeQuant] = useState('');
    const [initialTime, setInitialTime] = useState('');

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
        <WrapperContent text="Faça a sua reserva" icon={<SportsBaseballIcon />} bgcolorAvatar='green'>
            <Box component="form" onSubmit={handleSubmit} >
                <FormControl fullWidth >
                    <InputLabel id="selectQuadraLabel">Selecione uma quadra</InputLabel>
                    <Select
                        labelId="selectQuadraLabel"
                        id="selectQuadra"
                        value={quadra}
                        label="Selecione uma quadra"
                        onChange={(event) => setQuadra(event.target.value)}
                    >
                        <MenuItem value="Quadra de Futebol">Quadra de Futebol</MenuItem>
                        <MenuItem value="Quadra de Vôlei">Quadra de Vôlei</MenuItem>
                        <MenuItem value="Quadra de Tênis">Quadra de Tênis</MenuItem>
                    </Select>
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DemoContainer components={['DatePicker']} sx={{ flexDirection: '' }}>
                        <DatePicker label="Selecione o dia" />
                    </DemoContainer>
                </LocalizationProvider>
                <FormControl fullWidth sx={{ marginTop: 2 }}>
                    <InputLabel id="selectInitialLabel">Selecione o tempo de reserva</InputLabel>
                    <Select
                        labelId="selectInitialLabel"
                        id="selectInitialTime"
                        value={initialTime}
                        label="Selecione o tempo de reserva"
                        onChange={(event) => setInitialTime(event.target.value)}
                    >
                        <MenuItem value="1">1 hora</MenuItem>
                        <MenuItem value="2">2 horas</MenuItem>
                        <MenuItem value="4">4 horas</MenuItem>
                        <MenuItem value="5">5 horas</MenuItem>
                        <MenuItem value="6">6 horas</MenuItem>
                        <MenuItem value="7">7 horas</MenuItem>
                        <MenuItem value="8">8 horas</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth sx={{ marginTop: 2 }}>
                    <InputLabel id="selectTimeQuant">Selecione o horário inicial</InputLabel>
                    <Select
                        labelId="selectTimeQuant"
                        id="selectTimeQuantInput"
                        value={timeQuant}
                        label="Selecione o horário inicial"
                        onChange={(event) => setTimeQuant(event.target.value)}
                    >
                        <MenuItem value="10:00">10:00</MenuItem>
                        <MenuItem value="11:00">11:00</MenuItem>
                        <MenuItem value="12:00">12:00</MenuItem>
                        <MenuItem value="13:00">13:00</MenuItem>
                        <MenuItem value="14:00">14:00</MenuItem>
                        <MenuItem value="15:00">15:00</MenuItem>
                        <MenuItem value="16:00">16:00</MenuItem>
                        <MenuItem value="17:00">17:00</MenuItem>
                        <MenuItem value="18:00">18:00</MenuItem>
                        <MenuItem value="19:00">19:00</MenuItem>
                        <MenuItem value="20:00">20:00</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    id="Observacoes"
                    label="Observações"
                    multiline
                    rows={4}
                    fullWidth
                    sx={{ marginTop: 1 }}
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
                    sx={{ mt: 3, mb: 2 }}
                >
                    Reservar
                </Button>
            </Box>
            <Button onClick={() => { dispatch({ type: 'SET_STAGE', payload: 'userReservations' }) }}>
                    Já possui reserva? Clique aqui
                </Button>
                <Button variant="contained" color="error" onClick={() => { dispatch({ type: 'SET_STAGE', payload: 'login' }) }}>
                    Sair
                </Button>
        </WrapperContent>
    );
};

export default FrameUserSchedule;
