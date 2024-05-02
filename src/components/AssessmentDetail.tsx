import { IconButton, Stack, Typography } from "@mui/material";
import { AssessmentIcon } from "./AssessmentIcon";

type Props = {
    assessment: number;
    count: number;
}

export const AssessmentDetail = ({ assessment, count }: Props) => {

    return (
        <Stack
            direction={'column'}
            alignItems={'center'}
            sx={{
                width: 'max-content'
            }}
        >
            <IconButton>
                <AssessmentIcon assessment={assessment} size={50} />
            </IconButton>
            <Typography variant="body1">{count}</Typography>
        </Stack>
    )

}