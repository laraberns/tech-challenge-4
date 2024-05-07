import { Avatar, Box, Container, Typography } from "@mui/material";
import Image from "next/image";
import img from '@/assets/logo.png'

const WrapperContent = ({ text, icon, children, bgcolorAvatar }) => {
    return (
        <Container maxWidth="xs" sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            <Image src={img} alt="Logo" width={150} height={75} />
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar sx={{ m: 1, bgcolor: bgcolorAvatar }}>
                    {icon}
                </Avatar>
                <Typography component="h1" variant="h5">
                    {text}
                </Typography>
            </Box>
            {children}
        </Container>
    );
};

export default WrapperContent;
