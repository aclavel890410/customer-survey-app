import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem, useTheme } from "@mui/material"
import { SurveyQuestionDto } from "../interfaces/SurveyQuestionDto"
import { MouseEvent, useState } from "react"
import MoreVertIcon from '@mui/icons-material/MoreVert'
import EditIcon from '@mui/icons-material/Edit'
import ListIcon from '@mui/icons-material/List';
import DeleteIcon from "@mui/icons-material/Delete"
import { useNavigate } from "react-router-dom"

type QuestionListMenuProps = {
    question: SurveyQuestionDto,
    deleteHandler: (questionId: string) => void;
    detailsHandler: (questionId: string) => void;
}

export const QuestionListMenu = ({ question, deleteHandler, detailsHandler }: QuestionListMenuProps) => {

    const theme = useTheme();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    

    const handleMenuItemClick = (option: 'update' | 'details' | 'delete') => {
        setAnchorEl(null);
        if (option === 'update')
            navigate(`/questions/${question.questionId}`);
        else if (option === 'delete')
            deleteHandler(question.questionId as string);
        else detailsHandler(question.questionId as string)
    }

    return (
        <>
            <IconButton
                id={question.questionId + 'actions-button'}
                aria-controls={open ? question.questionId + 'actions-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{ p: '4px', color: theme.palette.primary.main }}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id={question.questionId + 'actions-menu'}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': question.questionId + 'actions-button',
                }}
            >
                <MenuItem
                    component="label"
                    onClick={() => { handleMenuItemClick('update') }}
                >
                    <ListItemIcon>
                        <EditIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Actualizar</ListItemText>
                </MenuItem>
                <MenuItem
                    component="label"
                    onClick={() => { handleMenuItemClick('details') }}
                >
                    <ListItemIcon>
                        <ListIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Detalles</ListItemText>
                </MenuItem>
                <MenuItem
                    component="label"
                    onClick={() => { handleMenuItemClick('delete') }}
                >
                    <ListItemIcon>
                        <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Eliminar</ListItemText>
                </MenuItem>
            </Menu>
        </>
    )
}