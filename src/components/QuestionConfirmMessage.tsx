import { Box, Button, Stack, Typography } from "@mui/material"

type QuestionConfirmMessageProps = {
    title?: string;
    subTitle?: string;
    handleClick: (accept: boolean) => void;
}

export const QuestionConfirmMessage = ({ title, subTitle, handleClick }: QuestionConfirmMessageProps ) => {

    return (
        <Stack
            direction={'column'}
            alignItems={'center'}
            spacing={2}
            sx={{
                height: '100%'
            }}
        >
            <Box>
                <Typography variant="body1" sx={{ textAlign: 'center' }} >
                    {
                        title ?? '¿Te gustaría responder nuestra encuesta?'
                    }
                </Typography>
                <Typography variant="body1" sx={{ textAlign: 'center' }} >
                    {
                        subTitle ?? 'Sólo te llevará un momento.'
                    }
                </Typography>
            </Box>
            <Stack
                direction={'row'}
                alignItems={'center'}
                spacing={2}
            >
                <Button
                    size="small"
                    variant="outlined"
                    sx={{
                        textTransform: 'none'
                    }}
                    onClick={() => handleClick(false)}
                >
                    No, gracias
                </Button>
                <Button
                    size="small"
                    variant="contained"
                    sx={{
                        textTransform: 'none'
                    }}
                    onClick={() => handleClick(true) }
                >
                    Si
                </Button>
            </Stack>
        </Stack>
    )
}