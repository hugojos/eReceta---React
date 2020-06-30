import React from 'react';
import { IconButton, Dialog, DialogContent, DialogTitle, Divider } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import PoliticasPrivacidad from '@/views/website/PoliticasPrivacidad/index';

const DialogPoliticas = ({togglePoliticas, open}: {togglePoliticas: any, open: boolean}) => {
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
                    Políticas de privacidad
                </span>
                <IconButton
                onClick={togglePoliticas}>
                    <Close />
                </IconButton>
            </DialogTitle>
            <Divider />
            <DialogContent className="p-2 py-0 text-center">
                <PoliticasPrivacidad />
            </DialogContent>
            <Divider />
        </Dialog>
     );
}
 
export default DialogPoliticas;