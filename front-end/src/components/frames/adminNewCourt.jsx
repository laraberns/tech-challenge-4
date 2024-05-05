import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import Typography from '@mui/material/Typography';
import { useAppDispatch } from '@/context/appProvider';
import { FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, TextField } from '@mui/material';
import WrapperContent from '../wrapper/wrapperContent';

const FrameAdminNewCourt = ({ nextAction }) => {
    const dispatch = useAppDispatch();
    const [errorMessage, setErrorMessage] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [isActive, setIsActive] = useState(true);

    const handleSubmit = (event) => {
        event.preventDefault();
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
                <TextField margin="normal" required fullWidth id="court" label="Nome da quadra" autoFocus />
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
                <TextField id="Observacoes" label="Observações" multiline rows={4} fullWidth sx={{ marginTop: 1 }} />
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
