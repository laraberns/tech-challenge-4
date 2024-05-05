import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import { useAppDispatch } from '@/context/appProvider';
import WrapperContent from '../wrapper/wrapperContent';
import { Button } from '@mui/material';

const FrameAdminHome = ({ nextAction }) => {
    const dispatch = useAppDispatch();

    return (
        <WrapperContent text="Seja bem vindo(a)!" icon={<SportsBaseballIcon />} bgcolorAvatar='green'>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="success"
                onClick={() => { dispatch({ type: 'SET_STAGE', payload: 'adminCourts' }) }}
                sx={{ mt: 1, mb: 2 }}
            >
                Gestão de Quadras
            </Button>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="success"
                onClick={() => { dispatch({ type: 'SET_STAGE', payload: 'adminReservations' }) }}
                sx={{ mb: 2 }}
            >
                Gestão de Reservas
            </Button>
            <Button variant="contained" color="error" onClick={() => { dispatch({ type: 'SET_STAGE', payload: 'login' }) }}>
               Sair
            </Button>
        </WrapperContent>
    );
};

export default FrameAdminHome;
