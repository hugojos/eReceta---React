import React, { useState, useEffect } from 'react';

import { TextField, Button, Dialog, DialogTitle, Divider, DialogActions, DialogContent } from '@material-ui/core';

import { sonNumeros } from '@/utils/validaciones'
import { useSelector } from 'react-redux'

const DialogWhatsappNumero = ({open, toggle}) => {

    const nombreArchivo = useSelector(state => state.enviarRecetaWpp.okResponse)

    const [number, setNumber] = useState('');
    const [urlWhatsapp, setUrlWhatsapp] = useState('')

    const handleInputChange = (event) => {
        let value = event.target.value
        if(!sonNumeros(value)) value = value.substring(0, value.length-1)
        setNumber(value)

        let mensaje = 'https://api.whatsapp.com/send?phone=' + value + '&&text='
        mensaje += 'Sr/a. Paciente, puede visualizar su receta accediendo a ' + window.properties.urlVerReceta + "%2F%23%2Fver-receta%2F" + nombreArchivo;
        mensaje += '%0A%0A'
        mensaje += 'Para utilizar los cupones con descuento, por favor chequee las farmacias adheridas en https://farmacias.ereceta.com.ar'
        setUrlWhatsapp(mensaje)
    }

    const closeDialog = () => {
        toggle()
        setNumber('')
    }

    return (
        <Dialog
            fullWidth
            scroll="body"
            maxWidth="sm"
            open={open}
            className="m-0"
        >
            <DialogTitle className="px-2">
                <div className="d-flex justify-content-between align-items-center">
                    <p className="m-0 small">Enviar por whatsapp</p>
                    <Button
                        onClick={ closeDialog } 
                        variant="contained"
                        color="primary"
                        size="small"
                    >
                        Cerrar
                    </Button>
                </div>
            </DialogTitle>
            <Divider />
            <DialogContent className="px-2">
                <div className="py-4">
                    <span className="font-weight-bold">
                        Ingrese el numero del paciente
                    </span>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="number"
                        type="text"
                        fullWidth
                        variant="outlined"
                        placeholder="54 9 11 00001111"
                        value={number}
                        onChange={handleInputChange}
                    />
                </div>
            </DialogContent>
            <Divider />
            <DialogActions className="d-flex justify-content-between">
                <Button onClick={closeDialog} color="primary">
                    Cancelar
                </Button>
                <a href={urlWhatsapp} target="_blank" className="text-white text-decoration-none">
                    <Button
                        onClick={closeDialog} 
                        variant="contained"
                        color="primary"
                        disabled={number.length == 0}
                    >
                        Compartir
                    </Button>
                </a>
            </DialogActions>
        </Dialog>
    );
};

export default DialogWhatsappNumero;
