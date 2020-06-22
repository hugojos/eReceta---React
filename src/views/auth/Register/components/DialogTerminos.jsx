import React from 'react';
import { IconButton, Dialog, DialogContent, DialogTitle, Divider } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import TerminosCondiciones from '../../../website/TerminosCondiciones/index';

const DialogTerminos = ({toggleTerminos, open}) => {
    return ( 
        <Dialog 
            fullWidth
            scroll="paper"
            maxWidth="sm"
            open={open} 
            className="m-0">
            <DialogTitle 
            disableTypography={true}
            className="pl-3 p-0 text-right d-flex justify-content-between align-items-center">
                <span className="text-muted h5 m-0">
                    Términos y condiciones
                </span>
                <IconButton
                onClick={ () => toggleTerminos() }>
                    <Close />
                </IconButton>
            </DialogTitle>
            <Divider />
            <DialogContent className="p-2 py-0 text-center">
                <TerminosCondiciones />
            </DialogContent>
            <Divider />
        </Dialog>
     );
}
 
export default DialogTerminos;