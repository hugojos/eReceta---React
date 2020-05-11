import React,{useEffect} from 'react';

import { Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import FormLogin from './FormLogin'
import { useSelector } from 'react-redux'

const DialogLogin = (props) => {
    const auth = useSelector(state => state.auth.user)

    return (
        <Dialog 
            fullWidth
            scroll="body"
            maxWidth="sm"
            open={props.open} 
            className="m-0">
            <DialogTitle 
            disableTypography={true}
            className="pl-3 p-0 text-right d-flex justify-content-between align-items-center">
                <span className="text-muted h5 m-0">
                    Solo un paso mas...
                </span>
                <IconButton
                onClick={ () => props.toggleDialog() }>
                    <Close />
                </IconButton>
            </DialogTitle>
            <Divider />
            <DialogContent className="p-2 py-0 text-center">
                <h4 className="my-3">Inicie sesión para continuar</h4>
                <FormLogin />
            </DialogContent>
            <Divider />
        </Dialog>
    )
}

export default DialogLogin;