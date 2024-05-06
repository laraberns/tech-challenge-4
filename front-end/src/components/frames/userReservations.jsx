import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppState } from '../../context/appProvider';
import { Card, CardContent, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import WrapperContent from '../wrapper/wrapperContent';
import { Delete, Edit } from '@mui/icons-material';

const FrameUserReservations = ({ nextAction }) => {
    const dispatch = useAppDispatch();
    const { userId } = useAppState();
    const [errorMessage, setErrorMessage] = useState('');
    const [reservas, setReservas] = useState([]);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
    const [selectedReserva, setSelectedReserva] = useState(null);
    const [editedReserva, setEditedReserva] = useState({});
    const [quadraNomes, setQuadraNomes] = useState([]);

    const getAllReservas = async () => {
        try {
            const response = await fetch(`http://localhost:8081/api/reservas/${userId}`);
            const reservasData = await response.json();
            setReservas(reservasData);

            const quadraNames = {};
            const quadraRequest = await fetch(`http://localhost:8081/api/quadras/allQuadras`);
            const quadraData = await quadraRequest.json();

            reservasData.forEach(reserva => {
                const quadra = quadraData.find(quadra => quadra.id === reserva.quadraId);
                if (quadra) {
                    quadraNames[reserva.id] = quadra.nome;
                }
            });

            setQuadraNomes(quadraNames);
        } catch (error) {
            setErrorMessage(error.message || 'Erro ao obter reservas.');
        }
    };

    useEffect(() => {
        getAllReservas();
    }, []);

    const handleEditClick = (reserva) => {
        setSelectedReserva(reserva);
        setEditedReserva({...reserva});
        setEditDialogOpen(true);
    };

    const handleRemoveClick = (reserva) => {
        setSelectedReserva(reserva);
        setRemoveDialogOpen(true);
    };

    const handleEditReserva = async () => {
        try {
            const response = await fetch(`http://localhost:8081/api/reservas/${selectedReserva.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    observacoes: editedReserva.observacoes
                })
            });
            const data = await response.json();
            setErrorMessage(data.message);
            setEditDialogOpen(false);
            getAllReservas();
        } catch (error) {
            setErrorMessage(error.message || 'Erro ao editar Reserva.');
        }
    };
    
    const handleRemoveReserva = async () => {
        try {
            const response = await fetch(`http://localhost:8081/api/reservas/${selectedReserva.id}`, {
                method: 'DELETE'
            });
            const data = await response.json();
            setErrorMessage(data.message);
            setRemoveDialogOpen(false);
            getAllReservas();
        } catch (error) {
            setErrorMessage(error.message || 'Erro ao remover Reserva.');
        }
    };

    return (
        <WrapperContent text="Minhas reservas" icon={<SportsBaseballIcon />} bgcolorAvatar='green'>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {reservas.length === 0 ? (
                    <Typography variant="body1" color="textSecondary" align="center">
                        Não há reservas ainda.
                    </Typography>
                ) : (
                    reservas.map((reserva) => (
                        <Card key={reserva.id} sx={{ width: 300, marginBottom: 1 }}>
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    {quadraNomes[reserva.id]}
                                </Typography>
                                <Typography variant="body2">
                                    Horário Inicial: {reserva.dataHoraInicio.slice(0, 10)} {reserva.dataHoraInicio.slice(11, 16)}
                                </Typography>
                                <Typography variant="body2">
                                    Horário Final: {reserva.dataHoraFinal.slice(0, 10)} {reserva.dataHoraFinal.slice(11, 16)}
                                </Typography>
                                <Typography variant="body2">
                                    Observações: {reserva.observacoes}
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        style={{ width: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }}
                                        onClick={() => handleEditClick(reserva)}>
                                        <Edit />
                                    </Button>
                                    <Button variant="contained"
                                        color="error"
                                        style={{ maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }}
                                        onClick={() => handleRemoveClick(reserva)}>
                                        <Delete />
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    ))
                )}
                {errorMessage && (
                    <Typography variant="body1" color="error" align="center">
                        {errorMessage}
                    </Typography>
                )}
            </Box>

            <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
                <DialogTitle>Editar Reserva</DialogTitle>
                <DialogContent style={{minWidth: '300px'}}>
                    <TextField
                        label="Observações"
                        value={editedReserva.observacoes || ""}
                        onChange={(e) => setEditedReserva({ ...editedReserva, observacoes: e.target.value })}
                        fullWidth
                        sx={{marginTop: 1}}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditDialogOpen(false)}>Cancelar</Button>
                    <Button onClick={handleEditReserva}>Salvar</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={removeDialogOpen} onClose={() => setRemoveDialogOpen(false)}>
                <DialogTitle>Remover Reserva</DialogTitle>
                <DialogContent>
                    <Typography>Tem certeza que deseja remover a reserva do dia {selectedReserva?.dataHoraInicio.slice(0, 10)} às {selectedReserva?.dataHoraInicio.slice(11, 16)}h ?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setRemoveDialogOpen(false)}>Cancelar</Button>
                    <Button onClick={handleRemoveReserva}>Confirmar</Button>
                </DialogActions>
            </Dialog>
            <Button onClick={() => { dispatch({ type: 'SET_STAGE', payload: 'userSchedule' }) }}>
                Deseja adicionar nova Reserva? Clique aqui
            </Button>
            <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                    variant="contained"
                    color="success"
                    onClick={() => { dispatch({ type: 'SET_STAGE', payload: 'userHome' }) }}>
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

export default FrameUserReservations;
