
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { blue, green, orange, red, yellow } from '@mui/material/colors';
import { Typography } from '@mui/material';

type AssessmentIconProps = {
    assessment: number;
    size: number
}



export const AssessmentIcon = ({ assessment, size }: AssessmentIconProps) => {
    const icons = [
        <SentimentVeryDissatisfiedIcon sx={{ fontSize: `${size}px`, color: red[300] }} />,
        <SentimentDissatisfiedIcon sx={{ fontSize: `${size}px`, color: orange[300] }} />,
        <SentimentNeutralIcon sx={{ fontSize: `${size}px`, color: yellow[300] }} />,
        <SentimentSatisfiedAltIcon sx={{ fontSize: `${size}px`, color: green[300] }} />,
        <SentimentVerySatisfiedIcon sx={{ fontSize: `${size}px`, color: blue[300] }} />
    ]

    return assessment - 1 < 0 ? <Typography variant='body1'>Sin evaluar</Typography> : icons[assessment - 1]
}