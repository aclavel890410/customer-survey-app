import { Breadcrumbs, Card, CardContent, CardHeader, Typography, useTheme } from "@mui/material"
import { useParams } from "react-router-dom"
import { AddEditQuestionPanel } from "../features/AddEditQuestionPanel";


export const AddQuestionPage = () => {
    const theme = useTheme();

    return (
        <Card sx={{ border: `solid 1px ${theme.palette.primary.main}` }} >
            <CardHeader
                sx={{
                    p: '16px',
                    bgcolor: theme.palette.primary.main
                }}
                title={
                    <div role="presentation">
                        <Breadcrumbs aria-label="breadcrumb" sx={{ color: '#ffffff' }}>
                            <Typography>Adicionar pregunta</Typography>
                        </Breadcrumbs>
                    </div>
                }
            />
            <CardContent>
                <AddEditQuestionPanel />
            </CardContent>
        </Card>
    )
}