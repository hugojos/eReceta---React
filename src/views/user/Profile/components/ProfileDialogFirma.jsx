import React from 'react';
import SignatureCanvas from 'react-signature-canvas'
import { Button, Dialog, DialogContent, DialogTitle, Divider, DialogActions } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { convertDataURIToBinary } from '../../../../utils/convert'  
import { useState } from 'react';

const ProfileDialogFirma = ({open, toggleDialog, handle}) => {

    let optionsPad = '';

    const [firmaIsEmpty, setFirmaIsEmpty] = useState(false)

    const guardarFirma = () => {
        if(optionsPad.isEmpty()) {
            setFirmaIsEmpty(true)
        } else {
            setFirmaIsEmpty(false)
            handle(convertDataURIToBinary(optionsPad.toDataURL()))
            toggleDialog()
        }
    }

    return ( 
        <Dialog 
            fullWidth
            scroll="body"
            maxWidth="sm"
            open={open} 
            className="m-0">
            <DialogTitle 
            disableTypography={true}
            className="pl-3 p-0 text-right d-flex justify-content-between align-items-center">
                <span className="text-muted h5 m-0 py-3">
                    Por favor, ingrese su firma
                </span>
            </DialogTitle>
            <Divider />
            <DialogContent className="p-2 py-0 text-center">
                <div className="col-12" id="canvas_container_firma">
                    { firmaIsEmpty && 
                        <Alert classes={{
                            message: 'w-100 text-center'
                        }} severity="warning" className="mb-2">¡La firma no puede estar vacía!</Alert> }
                    <SignatureCanvas
                    clearOnResize={false} 
                    ref={(ref) => { optionsPad = ref }} 
                    canvasProps={{height: '400px',className: 'w-100 border border-dark'}}/>
                </div>
            </DialogContent>
            <Divider />
            <DialogActions className="d-flex">
                    <div className="w-25 text-left">
                        <Button
                        size="large"
                        variant="outlined"
                        onClick={() => optionsPad.clear()}
                        className="mr-2">
                            Limpiar
                        </Button>
                    </div>
                    <div className="w-75 text-right small">
                        <Button 
                        size="large" 
                        color="primary" 
                        variant="contained"
                        onClick={ guardarFirma }>
                        Guardar firma
                        </Button>
                    </div>
            </DialogActions>
        </Dialog>
     );
}
 
export default ProfileDialogFirma;