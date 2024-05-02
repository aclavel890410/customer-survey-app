import { Breadcrumbs, Card, CardContent, CardHeader, Typography, useTheme } from "@mui/material"
import { QuestionsTable } from "../features/QuestionsTable";


export const QuestionsPage = () => {
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
                            <Typography>Listado de preguntas</Typography>
                        </Breadcrumbs>
                    </div>
                }
            />
            <CardContent>
                <QuestionsTable />
            </CardContent>
        </Card>
    )
}