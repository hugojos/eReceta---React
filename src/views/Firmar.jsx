import React, { useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas'
import { Button, CircularProgress } from '@material-ui/core'
import { Alert } from '@material-ui/lab';
import DialogFirma from '../components/DialogFirma'
import DialogLogin from '../components/DialogLogin'
import { useSelector, useDispatch } from 'react-redux'
import { generarRecetaAccion } from '../redux/recetaDuck';

const Firmar = () => {

    const dispatch = useDispatch()

    let optionsPad = {}

    const auth = useSelector(state => state.auth.user)
    const loading = useSelector(state => state.receta.loading)
    const errorResponse = useSelector(state => state.receta.errorResponse)

    let data = useSelector(state => state.receta)

    const [openDialogFirma, setOpenDialogFirma] = React.useState(false)
    const [openDialogLogin, setOpenDialogLogin] = React.useState(false)

    useEffect(() => {
        if(Object.keys(auth).length && !optionsPad.isEmpty()) {
            toggleDialogLogin()
            data.usuarioMedicoDto = auth
            data.firmaDigital = convertDataURIToBinary(optionsPad.toDataURL())
            dispatch( generarRecetaAccion(data) )
        }
    }, [auth])

    const toggleDialogFirma = () => {
        setOpenDialogFirma(!openDialogFirma)
    }

    const toggleDialogLogin = () => {
        setOpenDialogLogin(!openDialogLogin)
    }

    const convertDataURIToBinary = (dataURI) => {
        let base64_maker = ';base64,'
        let base64Index = dataURI.indexOf(base64_maker) + base64_maker.length;
        let base64 = dataURI.substring(base64Index);
        let raw = window.atob(base64);
        let rawLength = raw.length;
        let array = new Array(new ArrayBuffer(rawLength));
        for(let i = 0; i < rawLength; i++) {
            array[i] = raw.charCodeAt(i);
        }
        return array;
    }

    const validate = () => {
        if(optionsPad.isEmpty()) toggleDialogFirma()
        else if(!Object.keys(auth).length) toggleDialogLogin()
        else {
            data.usuarioMedicoDto = auth
            data.firmaDigital = convertDataURIToBinary(optionsPad.toDataURL())
            dispatch( generarRecetaAccion(data) )
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
                <div className="col-12 col-lg-8">
                    {   
                        errorResponse &&
                        <Alert 
                        classes={{
                            message: 'w-100'
                        }}
                        severity="error"
                        className="mb-2">
                            <div className="d-flex justify-content-center">
                                <span>{errorResponse}</span>
                            </div>
                        </Alert>
                    }
                </div>
                <div className="col-12 col-lg-8" id="canvas_container_firma">
                    <SignatureCanvas
                    clearOnResize={false} 
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
                            startIcon={
                                loading &&
                                <CircularProgress size={20} color="inherit"/>
                            }
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