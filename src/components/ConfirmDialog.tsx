import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery, useTheme } from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";

type ConfirmParams = {
    title?: string;
    message: string;
    okFn: () => void;
    cancelFn?: () => void;
}

export type showConfirmDialogType = {
    showConfirmDialog: (params: ConfirmParams) => void
}

export const ConfirmDialog = forwardRef((props, ref) => {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const defaultParams: ConfirmParams = {
        message: '',
        okFn: () => { }
    }

    const [params, setParams] = useState<ConfirmParams>(defaultParams);
    const [open, setOpen] = useState(false);

    const showConfirmDialog = (params: ConfirmParams) => {
        setParams({
            title: params?.title ?? '',
            message: params.message,
            okFn: params.okFn,
            cancelFn: params?.cancelFn
        });
        setOpen(true);
    }

    const handleClose = (option: 'cancel' | 'ok') => {
        if (option === 'ok')
            params.okFn();
        else if (params.cancelFn)
            params.cancelFn();
        setOpen(false);
        setParams(defaultParams);
    }

    useImperativeHandle(ref, () => {
        return {
            showConfirmDialog
        }
    })


    return (
        <Dialog
            fullScreen={fullScreen}
            open={open}
            aria-labelledby="responsive-dialog-title"
        >
            {
                params?.title &&
                <DialogTitle
                    variant="body1"
                    id="responsive-dialog-title"
                    sx={{
                        bgcolor: theme.palette.primary.main,
                        color: '#fff',
                        padding: '8px 24px'
                    }}
                >
                    {params.title}
                </DialogTitle>
            }
            <DialogContent
                sx={{
                    pb: '5px'
                }}
            >
                <DialogContentText
                    sx={{
                        pt: '16px'
                    }}
                >
                    {params.message}
                </DialogContentText>
            </DialogContent>
            <DialogActions
                sx={{
                    p: '8px 24px 16px 24px'
                }}
            >
                <Button
                    variant="contained"
                    size="small"
                    sx={{
                        textTransform: 'none'
                    }}
                    onClick={() => handleClose('cancel')}
                >
                    Cancelar
                </Button>
                <Button
                    variant="contained"
                    size="small"
                    sx={{
                        textTransform: 'none'
                    }}
                    onClick={() => handleClose('ok')}
                >
                    Aceptar
                </Button>
            </DialogActions>
        </Dialog>
    )
})