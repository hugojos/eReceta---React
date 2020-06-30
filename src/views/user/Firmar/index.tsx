import React, { useState, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas'
import { Button, CircularProgress } from '@material-ui/core'
import { Alert } from '@material-ui/lab';
import DialogFirmaVacia from './components/DialogFirmaVacia'
import DialogLogin from '@/components/DialogLogin'
import { useSelector, useDispatch } from 'react-redux'
import { generarRecetaAccion } from '@/redux/recetaDuck';
import { convertDataURIToBinary } from '@/utils/convert'  
import IMedico from '@/models/IMedico';
import IReceta from '@/models/IReceta';

const Firmar = () => {

    const dispatch = useDispatch()

    let optionsPad: any = {}

    const user: IMedico = useSelector((state: any) => state.auth.user)
    const loading: boolean = useSelector((state: any) => state.receta.loading)
    const errorResponse: string = useSelector((state: any) => state.receta.errorResponse)

    let data: IReceta = useSelector((state: any) => state.receta)

    const [openDialogFirmaVacia, setOpenDialogFirmaVacia] = useState<boolean>(false)
    const [openDialogLogin, setOpenDialogLogin] = useState<boolean>(false)

    useEffect(() => {
        if(Object.keys(user).length && !optionsPad.isEmpty()) {
            toggleDialogLogin()
            data.usuarioMedicoDto = user
            data.firmaDigital = convertDataURIToBinary(optionsPad.toDataURL())
            dispatch( generarRecetaAccion(data) )
        }
    }, [user])

    const toggleDialogFirmaVacia = (): void => {
        setOpenDialogFirmaVacia(!openDialogFirmaVacia)
    }

    const toggleDialogLogin = (): void => {
        setOpenDialogLogin(!openDialogLogin)
    }

    const validate = (): void => {
        if(optionsPad.isEmpty()) toggleDialogFirmaVacia()
        else if(!Object.keys(user).length) toggleDialogLogin()
        else {
            data.usuarioMedicoDto = user
            data.firmaDigital = convertDataURIToBinary(optionsPad.toDataURL())
            dispatch( generarRecetaAccion(data) )
        }
    }


    return (
        <div className="container h-100">
            <DialogLogin open={openDialogLogin} toggleDialog={toggleDialogLogin} />
            <DialogFirmaVacia open={openDialogFirmaVacia} toggleDialog={toggleDialogFirmaVacia} />
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
                            onClick={ validate }>
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