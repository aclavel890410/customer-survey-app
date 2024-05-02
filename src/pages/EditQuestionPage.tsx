import { Breadcrumbs, Card, CardContent, CardHeader, Grid, Typography, useTheme } from "@mui/material"
import { useParams } from "react-router-dom"
import { AddEditQuestionPanel } from "../features/AddEditQuestionPanel";
import LoadingIndicator from "../components/LoadingIndicator";


export const EditQuestionPage = () => {
    const { questionId } = useParams()
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
                            <Typography>Actualizar pregunta</Typography>
                        </Breadcrumbs>
                    </div>
                }
            />
            <CardContent>
                {
                    !questionId
                        ? <Grid>
                            <Grid item sm={12} md={12} lg={12} sx={{ minHeight: 300 }}>
                                <LoadingIndicator message="Cargando datos de la pregunta..." />
                            </Grid>
                        </Grid>
                        : <AddEditQuestionPanel questionId={questionId as string} />

                }
            </CardContent>
        </Card>
    )
}