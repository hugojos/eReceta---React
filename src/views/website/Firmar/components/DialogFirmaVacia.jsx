import React from 'react';

import { Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from '@material-ui/core'
import { Close } from '@material-ui/icons'

const DialogFirmaVacia = (props) => {

    return (
        <Dialog 
        fullWidth
        scroll="body"
        maxWidth="sm"
        open={props.open} 
        className="m-0">
            <DialogTitle className="p-0 text-right">
                <IconButton
                onClick={ () => props.toggleDialog() }>
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
                onClick={ () => props.toggleDialog() }
                variant="contained"
                color="primary">
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    )
    

}   

export default DialogFirmaVacia;