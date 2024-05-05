import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import Typography from '@mui/material/Typography';
import { useAppDispatch } from '../../context/appProvider';
import { Card, CardContent, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import WrapperContent from '../wrapper/wrapperContent';
import { Delete, Edit } from '@mui/icons-material';
import { generateTimeOptions } from '@/utils/timeFormatter';

const FrameAdminNewCourt = ({ nextAction }) => {
    const dispatch = useAppDispatch();
    const [errorMessage, setErrorMessage] = useState('');
    const [quadras, setQuadras] = useState([]);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
    const [selectedQuadra, setSelectedQuadra] = useState(null);
    const [editedQuadra, setEditedQuadra] = useState({});

    const getAllQuadras = async () => {
        try {
            const response = await fetch('http://localhost:8081/api/quadras/allQuadras');
            const data = await response.json();
            setQuadras(data);
        } catch (error) {
            setErrorMessage(error.message || 'Erro ao obter quadras.');
        }
    };

    useEffect(() => {
        getAllQuadras();
    }, []);

    const handleEditClick = (quadra) => {
        setSelectedQuadra(quadra);
        setEditedQuadra({
            ...quadra,
            horarioInicial: quadra.horarioInicial.slice(0, 5),
            horarioFinal: quadra.horarioFinal.slice(0, 5)
        });
        setEditDialogOpen(true);
    };

    const handleRemoveClick = (quadra) => {
        setSelectedQuadra(quadra);
        setRemoveDialogOpen(true);
    };

    const handleEditQuadra = async () => {
        try {
            const response = await fetch(`http://localhost:8081/api/quadras/${selectedQuadra.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editedQuadra)
            });
            const data = await response.json();
            setErrorMessage(data.message);
            setEditDialogOpen(false);
            getAllQuadras();
        } catch (error) {
            setErrorMessage(error.message || 'Erro ao editar quadra.');
        }
    };

    const handleRemoveQuadra = async () => {
        try {
            const response = await fetch(`http://localhost:8081/api/quadras/${selectedQuadra.id}`, {
                method: 'DELETE'
            });
            const data = await response.json();
            setErrorMessage(data.message);
            setRemoveDialogOpen(false);
            getAllQuadras();
        } catch (error) {
            setErrorMessage(error.message || 'Erro ao remover quadra.');
        }
    };

    return (
        <WrapperContent text="Lista de Quadras" icon={<SportsBaseballIcon />} bgcolorAvatar='green'>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {quadras.map((quadra) => (
                    <Card key={quadra.id} sx={{ width: 300, marginBottom: 1 }}>
                        <CardContent>
                            <Typography variant="h6" component="div">
                                {quadra.nome}
                            </Typography>
                            <Typography variant="body2">
                                Horário Inicial: {quadra.horarioInicial}
                            </Typography>
                            <Typography variant="body2">
                                Horário Final: {quadra.horarioFinal}
                            </Typography>
                            <Typography variant="body2">
                                Observações: {quadra.observacoes}
                            </Typography>
                            <Typography variant="body2">
                                Ativa: {quadra.ativo ? 'Sim' : 'Não'}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{ width: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }}
                                    onClick={() => handleEditClick(quadra)}>
                                    <Edit />
                                </Button>
                                <Button variant="contained"
                                    color="error"
                                    style={{ maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }}
                                    onClick={() => handleRemoveClick(quadra)}>
                                    <Delete />
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                ))}
                {errorMessage && (
                    <Typography variant="body1" color="error" align="center">
                        {errorMessage}
                    </Typography>
                )}
            </Box>
            <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
                <DialogTitle>Editar Quadra</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Nome"
                        value={editedQuadra.nome}
                        sx={{ marginBottom: '16px', marginTop: '16px' }}
                        onChange={(e) => setEditedQuadra({ ...editedQuadra, nome: e.target.value })}
                        fullWidth
                    />
                    <FormControl sx={{ width: "100%", marginBottom: '16px' }}>
                        <InputLabel id="selectStartTime">Horário Inicial</InputLabel>
                        <Select
                            labelId="selectStartTime"
                            value={editedQuadra.horarioInicial}
                            onChange={(e) => setEditedQuadra({ ...editedQuadra, horarioInicial: e.target.value })}
                            label="Horário Inicial"
                        >
                            {generateTimeOptions()}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ width: "100%", marginBottom: '16px' }}>
                        <InputLabel id="selectEndTime">Horário Final</InputLabel>
                        <Select
                            labelId="selectEndTime"
                            value={editedQuadra.horarioFinal}
                            onChange={(e) => setEditedQuadra({ ...editedQuadra, horarioFinal: e.target.value })}
                            label="Horário Finall"
                        >
                            {generateTimeOptions()}
                        </Select>
                    </FormControl>
                    <TextField
                        label="Observações"
                        value={editedQuadra.observacoes}
                        onChange={(e) => setEditedQuadra({ ...editedQuadra, observacoes: e.target.value })}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditDialogOpen(false)}>Cancelar</Button>
                    <Button onClick={handleEditQuadra}>Salvar</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={removeDialogOpen} onClose={() => setRemoveDialogOpen(false)}>
                <DialogTitle>Remover Quadra</DialogTitle>
                <DialogContent>
                    <Typography>Tem certeza que deseja remover a quadra "{selectedQuadra?.nome}"?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setRemoveDialogOpen(false)}>Cancelar</Button>
                    <Button onClick={handleRemoveQuadra}>Confirmar</Button>
                </DialogActions>
            </Dialog>
            <Button onClick={() => { dispatch({ type: 'SET_STAGE', payload: 'adminNewCourt' }) }}>
                Deseja adicionar nova quadra? Clique aqui
            </Button>
            <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                    variant="contained"
                    color="success"
                    onClick={() => { dispatch({ type: 'SET_STAGE', payload: 'adminHome' }) }}>
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

export default FrameAdminNewCourt;
