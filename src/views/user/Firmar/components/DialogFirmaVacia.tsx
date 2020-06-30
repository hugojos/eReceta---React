import React from 'react';

import { Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from '@material-ui/core'
import { Close } from '@material-ui/icons'

type Props = {
    open: boolean;
    toggleDialog: () => void;
}
const DialogFirmaVacia = ({open, toggleDialog}: Props) => {

    return (
        <Dialog 
        fullWidth
        scroll="body"
        maxWidth="sm"
        open={open} 
        className="m-0">
            <DialogTitle className="p-0 text-right">
                <IconButton
                onClick={ toggleDialog }>
                    <Close />
                </IconButton>
            </DialogTitle>
            <Divider />
            <DialogContent className="p-2 py-0 text-center">
                <span className="h3 m-0 text-dark">¡La firma no puede estar vacia!</span>
            </DialogContent>
            <Divider />
            <DialogActions className="d-flex justify-content-end">
                <Button 
                onClick={ toggleDialog }
                variant="contained"
                color="primary">
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    )
}   

export default DialogFirmaVacia;