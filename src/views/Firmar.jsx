import React, { useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas'
import { Button } from '@material-ui/core'
import DialogFirma from '../components/DialogFirma'
import DialogLogin from '../components/DialogLogin'
import { useSelector } from 'react-redux'

const Firmar = () => {

    let optionsPad = {}

    const auth = useSelector(state => state.auth.user)

    const [openDialogFirma, setOpenDialogFirma] = React.useState(false)
    const [openDialogLogin, setOpenDialogLogin] = React.useState(false)

    const toggleDialogFirma = () => {
        setOpenDialogFirma(!openDialogFirma)
    }

    const toggleDialogLogin = () => {
        setOpenDialogLogin(!openDialogLogin)
    }

    const validate = () => {
        if(optionsPad.isEmpty()) toggleDialogFirma()
        else if(!Object.keys(auth).length) toggleDialogLogin()
        else {
            
        }

    }


    return (
        <div className="container h-100">
            <DialogLogin open={openDialogLogin} toggleDialog={toggleDialogLogin} />
            <DialogFirma open={openDialogFirma} toggleDialog={toggleDialogFirma} />
            <div className="row pt-2 justify-content-center">
                <div className="col-12 col-lg-8 justify-content-center mb-1">
                    <h2 className="h3 m-0 text-center font-weight-bold">Firma digital</h2>
                    <p className="text-muted mb-1 text-left text-md-center">Por favor, ingrese su firma para confimar la validez de la receta.</p>
                </div>
                <div className="col-12 col-lg-8" id="canvas_container_firma">
                    <SignatureCanvas 
                    ref={(ref) => { optionsPad = ref }} 
                    canvasProps={{height: '400px',className: 'w-100 border border-dark'}}/>
                </div>
                <div className="col-12 col-lg-8 align-items-center mb-1 mt-2">
                    <div className="row">
                        <div className="col-4 text-left">
                            <Button
                            size="large"
                            variant="outlined"
                            onClick={() => optionsPad.clear()}
                            className="mr-2">
                                Limpiar
                            </Button>
                        </div>
                        <div className="col-8 text-right small">
                                <Button 
                                size="large" 
                                color="primary" 
                                variant="contained"
                                onClick={ () => validate() }>
                                Generar receta
                                </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Firmar;