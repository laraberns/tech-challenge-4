import React, { useEffect, useState } from 'react';
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
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';

const FrameAdminSchedule = ({ nextAction }) => {
    const dispatch = useAppDispatch();
    const [errorMessage, setErrorMessage] = useState('');
    const [quadras, setQuadras] = useState([]);
    const [selectedQuadra, setSelectedQuadra] = useState('');
    const [timeQuant, setTimeQuant] = useState('');
    const [day, setDay] = useState(null);
    const [activeStep, setActiveStep] = useState(0);
    const [initialTime, setInitialTime] = useState('');
    const [availableTimes, setAvailableTimes] = useState([]);
    const [obs, setObs] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState([]);

    const steps = [
        {
            label: 'Selecionar userId',
            input: (
                <FormControl fullWidth >
                    <InputLabel id="selectUserLabel">Selecione um usuário</InputLabel>
                    <Select
                        labelId="selectUserLabel"
                        id="selectUser"
                        value={selectedUser}
                        label="Selecione um usuário"
                        onChange={e => setSelectedUser(e.target.value)}
                    >
                        {users.map(user => (
                            <MenuItem key={user.id} value={user.id}>
                                {user.email} - Id:  {user.id}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            ),
        },
        {
            label: 'Selecionar quadra',
            input: (
                <FormControl fullWidth >
                    <InputLabel id="selectQuadraLabel">Selecione uma quadra</InputLabel>
                    <Select
                        labelId="selectQuadraLabel"
                        id="selectQuadra"
                        value={selectedQuadra ? selectedQuadra : ''}
                        label="Selecione uma quadra"
                        onChange={e => setSelectedQuadra(e.target.value)}
                    >
                        {quadras.map(quadra => (
                            <MenuItem key={quadra.id} value={quadra.id}>
                                {quadra.nome}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            ),
        },
        {
            label: 'Selecionar data',
            input: (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']} sx={{ flexDirection: '' }}>
                        <DatePicker
                            label="Selecione o dia"
                            value={day}
                            onChange={date => setDay(date)}
                        />

                    </DemoContainer>
                </LocalizationProvider>
            ),
        },
        {
            label: 'Selecionar tempo de reserva',
            input: (
                <>
                    <FormControl fullWidth sx={{ marginTop: 2 }}>
                        <InputLabel id="selectTimeQuant">Selecione o tempo de reserva</InputLabel>
                        <Select
                            labelId="selectTimeQuant"
                            id="selectTimeQuantInput"
                            label="Selecione o tempo de reserva"
                            value={timeQuant ? timeQuant : ''}
                            onChange={(event) => setTimeQuant(event.target.value)}
                        >
                            <MenuItem value="1">1 hora</MenuItem>
                            <MenuItem value="2">2 horas</MenuItem>
                            <MenuItem value="2">3 horas</MenuItem>
                            <MenuItem value="4">4 horas</MenuItem>
                            <MenuItem value="5">5 horas</MenuItem>
                            <MenuItem value="6">6 horas</MenuItem>
                            <MenuItem value="7">7 horas</MenuItem>
                            <MenuItem value="8">8 horas</MenuItem>
                        </Select>
                    </FormControl>
                </>
            ),
        },
        {
            label: 'Selecionar horário inicial',
            input: (
                <>
                    <FormControl fullWidth sx={{ marginTop: 2 }}>
                        <InputLabel id="selectTimeQuant">Selecione o horário inicial</InputLabel>
                        <Select
                            labelId="selectTimeQuant"
                            id="selectTimeQuantInput"
                            label="Selecione o horário inicial"
                            value={initialTime ? initialTime : ''}
                            onChange={(event) => setInitialTime(event.target.value)}
                        >
                            {availableTimes.length > 0 ? (
                                availableTimes.map((time) => (
                                    <MenuItem key={time.horaInicio} value={time}>
                                        {time.horaInicio.slice(11, 16)}
                                    </MenuItem>
                                ))
                            ) : (
                                <MenuItem disabled>
                                    Não há horários disponíveis para {timeQuant} {timeQuant === '1' ? 'hora' : 'horas'} de reserva no dia {day?.toISOString().slice(0, 10)}
                                </MenuItem>

                            )}
                        </Select>
                    </FormControl>
                </>
            ),
        },
        {
            label: 'Adicionar observações',
            input: (
                <TextField
                    id="Observacoes"
                    label="Observações"
                    multiline
                    rows={4}
                    value={obs ? obs : ''}
                    fullWidth
                    onChange={(event) => setObs(event.target.value)}
                    sx={{ marginTop: 1 }}
                />
            ),
        },
    ];

    const fetchAvailableTimes = async () => {

        try {
            const dateISOString = day.toISOString();
            const dateOnly = dateISOString.slice(0, 10);

            const response = await fetch('http://localhost:8081/api/reservas/availableTimes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    quadraId: selectedQuadra,
                    quantidadeHoras: Number(timeQuant),
                    dia: dateOnly
                })
            })

            if (!response.ok) {
                throw new Error('Erro ao obter os horários disponíveis');
            }

            const data = await response.json();
            setAvailableTimes(data)
        } catch (error) {
            console.error('Erro ao obter os horários disponíveis:', error);
        }
    };


    const getQuadras = async () => {
        try {
            const response = await fetch('http://localhost:8081/api/quadras/allQuadras');
            const data = await response.json();
            const activeQuadras = data.filter(quadra => quadra.ativo);
            setQuadras(activeQuadras);
        } catch (error) {
            console.error('Error fetching active quadras:', error);
        }
    };

    const getUsers = async () => {
        try {
            const response = await fetch('http://localhost:8081/api/users/all/users');
            const data = await response.json();
            setUsers(data)
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        getQuadras()
        getUsers()
    }, []);


    useEffect(() => {
        if (day && selectedQuadra && timeQuant) {
            fetchAvailableTimes();
        }
    }, [day, selectedQuadra, timeQuant]);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSubmit = async (event) => {
        event.preventDefault()

        console.log(selectedUser)

        try {
            const response = await fetch('http://localhost:8081/api/reservas/addReserva', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    dataHoraInicio: `${initialTime.horaInicio}`,
                    dataHoraFinal: `${initialTime.horaFinal}`,
                    userId: selectedUser,
                    quadraId: selectedQuadra,
                    observacoes: obs
                })
            });

            if (!response.ok) {
                throw new Error('Erro ao fazer a reserva');
            }

            setErrorMessage('');
            setDay(null);
            setSelectedQuadra('');
            setTimeQuant('');
            setInitialTime('');
            setSelectedUser('');
            setObs('');
            setActiveStep(0);

            const responseData = await response.json()
            setErrorMessage(responseData.message)

        } catch (error) {
            setErrorMessage(errorMessage);
        }
    };


    return (
        <WrapperContent text="Faça uma reserva" icon={<SportsBaseballIcon />} bgcolorAvatar='green'>
            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((step, index) => (
                        <Step key={step.label}>
                            <StepLabel>{step.label}</StepLabel>
                            <StepContent>
                                {step.input}
                                <Box sx={{ mb: 2 }}>
                                    <div>
                                        {index !== 0 && (
                                            <Button
                                                variant="outlined"
                                                onClick={handleBack}
                                                sx={{ mt: 1, mr: 1 }}
                                            >
                                                Voltar
                                            </Button>
                                        )}
                                        <Button
                                            variant="contained"
                                            onClick={handleNext}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            {index === steps.length - 1 ? 'Finalizar' : 'Continuar'}
                                        </Button>
                                    </div>
                                </Box>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
            </Box>
            <Box component="form" onSubmit={handleSubmit}>
                {errorMessage && (
                    <Typography variant="body1" color="error" align="center">
                        {errorMessage}
                    </Typography>
                )}
                {activeStep === steps.length && (
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Reservar
                    </Button>
                )}
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                    variant="contained"
                    color="success"
                    onClick={() => { dispatch({ type: 'SET_STAGE', payload: 'adminReservations' }) }}>
                    Menu
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    onClick={() => { dispatch({ type: 'SET_STAGE', payload: 'login' }) }}>
                    Sair
                </Button>
            </Box>
        </WrapperContent>
    );
};

export default FrameAdminSchedule;
