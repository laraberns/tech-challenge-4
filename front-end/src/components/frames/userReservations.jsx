import React, { useState } from 'react';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import WrapperContent from '../wrapper/wrapperContent';
import {
    Card,
    CardContent,
    IconButton,
    Stack,
    styled,
    Typography,
    Modal,
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useAppDispatch } from '@/context/appProvider';

const FrameUserReservations = ({ nextAction }) => {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openAlterModal, setOpenAlterModal] = useState(false);
    const dispatch = useAppDispatch();

    const StyledCard = styled(Card)({
        background: "#f0f0f0",
        minWidth: '250px',
        borderRadius: 5,
        "&:hover": {
            boxShadow: "0px 1px 5px 0px #6dcc93",
            elevation: 20,
        },
    });

    const [quadra, setQuadra] = useState(''); // State for selected quadra
    const [initialTime, setInitialTime] = useState(''); // State for selected initial time
    const [timeQuant, setTimeQuant] = useState(''); // State for selected time quant
    const [errorMessage, setErrorMessage] = useState(''); // State for error message

    // Function to handle opening the delete modal
    const handleOpenDeleteModal = () => {
        setOpenDeleteModal(true);
    };

    // Function to handle closing the delete modal
    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false);
    };

    // Function to handle opening the alter modal
    const handleOpenAlterModal = () => {
        setOpenAlterModal(true);
    };

    // Function to handle closing the alter modal
    const handleCloseAlterModal = () => {
        setOpenAlterModal(false);
    };

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        // Implement form submission logic here
    };

    // Style for the modal
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 2
    };

    return (
        <WrapperContent text="Minhas reservas" icon={<SportsBaseballIcon />} bgcolorAvatar='green'>
            <StyledCard raised={true} elevation={1}>
                <CardContent>
                    <Stack spacing={2}>
                        <Typography variant="h5" component="div" color="#3cb371">
                            Nome da quadra
                        </Typography>
                        <Typography variant="body1">Dia da reserva</Typography>
                        <Typography variant="body1">Tempo da reserva</Typography>
                        <Typography variant="body1">Horário da reserva</Typography>
                        <Stack direction="row">
                            <IconButton aria-label="edit" color="default" onClick={handleOpenAlterModal}>
                                <Edit />
                            </IconButton>
                            <IconButton aria-label="delete" color="error" onClick={handleOpenDeleteModal}>
                                <Delete />
                            </IconButton>
                        </Stack>
                    </Stack>
                </CardContent>
            </StyledCard>
            <Button onClick={() => { dispatch({ type: 'SET_STAGE', payload: 'userSchedule' }) }}>
                Deseja adicionar nova reserva? Clique aqui
            </Button>
            <Button variant="contained" color="error" onClick={() => { dispatch({ type: 'SET_STAGE', payload: 'login' }) }}>
               Sair
            </Button>

            {/* Modal for confirmation - delete*/}
            <Modal
                open={openDeleteModal}
                onClose={handleCloseDeleteModal}
                aria-labelledby="delete-modal-title"
                aria-describedby="delete-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography variant="body1" id="delete-modal-description">
                        Tem certeza que deseja excluir esta reserva?
                    </Typography>
                    <Button onClick={handleCloseDeleteModal} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={() => {
                        handleCloseDeleteModal();
                    }} color="error">
                        Confirmar
                    </Button>
                </Box>
            </Modal>

            {/* Modal for confirmation - alter*/}
            <Modal
                open={openAlterModal}
                onClose={handleCloseAlterModal}
                aria-labelledby="alter-modal-title"
                aria-describedby="alter-modal-description"
            >
                <Box sx={modalStyle}>
                    <Box component="form" onSubmit={handleSubmit}>
                        <FormControl fullWidth>
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
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                    </Box>
                    <Typography variant="body1" id="alter-modal-description">
                        Tem certeza que deseja alterar esta reserva?
                    </Typography>
                    <Button onClick={handleCloseAlterModal} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={() => {
                        handleCloseAlterModal();
                    }} color="error">
                        Confirmar
                    </Button>
                </Box>
            </Modal>
        </WrapperContent>
    );
};

export default FrameUserReservations;
