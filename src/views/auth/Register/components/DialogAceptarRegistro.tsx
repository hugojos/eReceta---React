import React from 'react'

import { IconButton, Dialog, DialogContent, DialogTitle, DialogActions, Divider } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import PoliticasPrivacidad from '@/views/website/PoliticasPrivacidad/index';
import TerminosCondiciones from '@/views/website/TerminosCondiciones/index';
import { registrarAccion } from '@/redux/registerDuck';
import { useDispatch } from 'react-redux';
import IMedico from '@/models/IMedico';

const DialogAceptarRegistro = ({ toggleAceptarRegistro, open, medico }: { toggleAceptarRegistro: any, open: boolean, medico: IMedico }) => {

    const dispatch = useDispatch()

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
                    onClick={toggleAceptarRegistro}>
                    <Close />
                </IconButton>
            </DialogTitle>
            <Divider />
            <DialogContent className="p-2 py-0 text-center">
                <TerminosCondiciones />
                <PoliticasPrivacidad />
            </DialogContent>
            <Divider />
            <DialogActions className="d-flex justify-content-around">
                <Button className="ml-4"
                    size="large"
                    color="primary"
                    variant="outlined"
                    onClick={toggleAceptarRegistro}>
                    CANCELAR
                </Button>
                <Button className="mr-4"
                    size="large"
                    color="primary"
                    variant="contained"
                    id="aceptar-terminos"
                    onClick={() => {
                        dispatch(registrarAccion(medico))
                        toggleAceptarRegistro()
                    }}>
                    ACEPTAR
                </Button>
            </DialogActions>
        </Dialog>

    );
}

export default DialogAceptarRegistro;