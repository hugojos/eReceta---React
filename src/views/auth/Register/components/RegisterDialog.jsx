import React from 'react';

import { Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from '@material-ui/core'
import { Close } from '@material-ui/icons'

import { useHistory } from 'react-router-dom';

const DialogFirmaVacia = (props) => {

    const history = useHistory()

    return (
        <Dialog 
        fullWidth
        scroll="body"
        maxWidth="sm"
        open={!!props.message} 
        className="m-0">
            <DialogTitle 
            disableTypography={true}
            className="pl-3 p-0 text-right d-flex justify-content-between align-items-center">
                <span className="text-muted h5 m-0">
                    Cuenta creada
                </span>
                <IconButton
                onClick={ () => history.push('/iniciar-sesion') }>
                    <Close />
                </IconButton>
            </DialogTitle>
            <Divider />
            <DialogContent className="p-2 py-0 text-center">
                <span className="h3 m-0 text-dark">{props.message}</span>
            </DialogContent>
            <Divider />
            <DialogActions className="d-flex justify-content-end">
                <Button 
                onClick={ () => history.push('/iniciar-sesion') }
                variant="contained"
                color="primary">
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    )
    

}   

export default DialogFirmaVacia;