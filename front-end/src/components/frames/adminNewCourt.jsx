import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import Typography from '@mui/material/Typography';
import { useAppDispatch } from '@/context/appProvider';
import { FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, TextField } from '@mui/material';
import WrapperContent from '../wrapper/wrapperContent';

const FrameAdminNewCourt = ({ nextAction }) => {
    const dispatch = useAppDispatch()
    const [errorMessage, setErrorMessage] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [isActive, setIsActive] = useState(true)
    const [obs, setObs] = useState('')
    const [nameCourt, setNameCourt] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8081/api/quadras/addQuadra', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome: nameCourt,
                    horarioInicial: startTime,
                    horarioFinal: endTime,
                    observacoes: obs,
                    ativo: isActive
                })
            });

            const responseData = await response.json();
            setErrorMessage(responseData.message);

        } catch (error) {
            setErrorMessage(error.message || 'Erro ao adicionar nova quadra.');
        }
    };

    const generateTimeOptions = () => {
        const options = [];
        for (let hour = 0; hour < 24; hour++) {
            const hourStr = hour < 10 ? `0${hour}` : `${hour}`;
            options.push(
                <MenuItem key={hour} value={`${hourStr}:00`}>{`${hourStr}:00`}</MenuItem>
            );
        }
        return options;
    };

    return (
        <WrapperContent text="Adicione uma nova quadra" icon={<SportsBaseballIcon />} bgcolorAvatar='green'>
            <Box component="form" onSubmit={handleSubmit} sx={{ '& .MuiFormControl-root': { width: '100%', marginTop: 2 } }}>
            <TextField
                    id="nome"
                    label="Nome da quadra"
                    fullWidth
                    value={nameCourt}
                    onChange={(e) => setNameCourt(e.target.value)}
                />
                <FormControl>
                    <InputLabel id="selectStartTime">Horário inicial da quadra</InputLabel>
                    <Select
                        labelId="selectStartTime"
                        value={startTime}
                        onChange={(event) => setStartTime(event.target.value)}
                        label="Selecione o horário inicial"
                    >
                        {generateTimeOptions()}
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel id="selectEndTime">Horário final da quadra</InputLabel>
                    <Select
                        labelId="selectEndTime"
                        value={endTime}
                        onChange={(event) => setEndTime(event.target.value)}
                        label="Horário final da quadra"
                    >
                        {generateTimeOptions()}
                    </Select>
                </FormControl>
                <TextField
                    id="Observacoes"
                    label="Observações"
                    multiline
                    rows={4}
                    fullWidth
                    sx={{ marginTop: 1 }}
                    value={obs}
                    onChange={(e) => setObs(e.target.value)}
                />
                <FormControlLabel
                    sx={{ marginTop: 1 }}
                    control={
                        <Switch
                            checked={isActive}
                            onChange={(event) => setIsActive(event.target.checked)}
                            name="isActive"
                        />
                    }
                    label="Quadra ativa"
                />
                {errorMessage && (
                    <Typography variant="body1" color="error" align="center">
                        {errorMessage}
                    </Typography>
                )}
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Adicionar
                </Button>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
                <Button variant="contained" color="success" onClick={() => { dispatch({ type: 'SET_STAGE', payload: 'adminHome' }) }}>
                    Menu
                </Button>
                <Button variant="contained" color="error" onClick={() => { dispatch({ type: 'SET_STAGE', payload: 'login' }) }}>
                    Sair
                </Button>
            </Box>
        </WrapperContent>
    );
};

export default FrameAdminNewCourt;
