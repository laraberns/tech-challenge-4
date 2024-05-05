import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import { useAppDispatch } from '../../context/appProvider';
import WrapperContent from '../wrapper/wrapperContent';
import { Button } from '@mui/material';

const FrameUserHome = ({ nextAction }) => {
    const dispatch = useAppDispatch();

    return (
        <WrapperContent text="Seja bem vindo(a)!" icon={<SportsBaseballIcon />} bgcolorAvatar='green'>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="success"
                onClick={() => { dispatch({ type: 'SET_STAGE', payload: 'userSchedule' }) }}
                sx={{ mt: 1, mb: 2 }}
            >
                Reservar
            </Button>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="success"
                onClick={() => { dispatch({ type: 'SET_STAGE', payload: 'userReservations' }) }}
                sx={{ mb: 2 }}
            >
                Minhas reservas
            </Button>
            <Button variant="contained" color="error" onClick={() => { dispatch({ type: 'SET_STAGE', payload: 'login' }) }}>
               Sair
            </Button>
        </WrapperContent>
    );
};

export default FrameUserHome;
