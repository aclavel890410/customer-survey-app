import { Box, CircularProgress, Stack, Typography } from "@mui/material";

const LoadingIndicator = ({ message } : { message: string }) => {
    return <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
        <Stack spacing={2} alignItems="center">
            <CircularProgress />
            <Typography>{message || "Cargando..."}</Typography>
        </Stack>
    </Box>
}

export default LoadingIndicator;