import { IconButton, useMediaQuery } from "@mui/material";
import { grey } from "@mui/material/colors";
import { AssessmentIcon } from "./AssessmentIcon";

type AssessmentButtonProps = {
    assessment: 1 | 2 | 3 | 4 | 5;
    selected: boolean;
    handleClick: (assessment: 1 | 2 | 3 | 4 | 5) => void;
}

export const AssessmentButton = ({ assessment, selected, handleClick }: AssessmentButtonProps) => {

    return (
        <IconButton
            sx={{
                bgcolor: selected ? grey[200] : 'transparent'
            }}
            onClick={() => { handleClick(assessment) }}
        >
            {<AssessmentIcon assessment={assessment} size={50} />}
        </IconButton>
    );
}