import { MenuItem } from "@mui/material";

export const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
        const hourStr = hour < 10 ? `0${hour}` : `${hour}`;
        options.push(
            <MenuItem key={hour} value={`${hourStr}:00`}>{`${hourStr}:00`}</MenuItem>
        );
    }
    return options;
}