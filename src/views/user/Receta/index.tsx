import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { pdfjs, Document, Page } from 'react-pdf';
import { Button, Menu, MenuItem, CircularProgress } from '@material-ui/core';
import DialogEnviarReceta from './components/DialogEnviarReceta'
import DialogWhatsappNumero from './components/DialogWhatsappNumero'

import { resetearAccion } from '@/redux/enviarRecetaEmailDuck'
import { enviarWhatsappAccion, IEnviarRecetaWpp } from '@/redux/enviarRecetaWppDuck' 
import IMedico from '@/models/IMedico';
import IReceta from '@/models/IReceta';

pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.1.266/pdf.worker.min.js'

const Receta = () => {

    const receta: IReceta = useSelector((state: any) => state.receta.receta)
    const user: IMedico = useSelector((state: any) => state.auth.user)
    const whatsapp: IEnviarRecetaWpp = useSelector((state: any) => state.enviarRecetaWpp)

    const history = useHistory()

    const dispatch = useDispatch()

    const [openMenu, setOpenMenu] = useState<boolean>(false)
    const [openDialogEmail, setOpenDialogEmail] = useState<boolean>(false)
    const [openDialogWhastapp, setOpenDialogWhatsapp] =  useState<boolean>(false)
    const [widthContainer, setWidthContainer] = useState<number>(0)
    const [urlWhatsapp, setUrlWhatsapp] = useState<string>('')
    const [state, setState] = useState({
        totalPages: 1,
        page: 1,        
    })
    
    const toggleDialogEmail = (): void => {
        setOpenDialogEmail(!openDialogEmail)
        setOpenMenu(false)
    }

    const toggleDialogWhatsapp = (): void => {
        setOpenDialogWhatsapp(!openDialogWhastapp)
        setOpenMenu(false)
    }

    const handleChangePage = (valor: number): void => {
        let newState = state
        newState.page += valor
        if(newState.page < 1) newState.page = 1
        if(newState.page > newState.totalPages) newState.page = newState.totalPages
        setState({...newState}) 
    }

    const handleButtonDownload = (): void => {
        setOpenMenu(false)
        let data = Uint8Array.from(atob(receta.archivo || ''), c => c.charCodeAt(0));
        let blob = new Blob([data], {type: "octet/stream"});
        let link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = "Receta.pdf";
        link.click();
    }

    const getRutaWhatsapp = (): void => {
        let aux = receta;
        aux.idMedico = user.idMedico
        console.log(aux)
        dispatch( enviarWhatsappAccion(aux) )
    }
    
    useEffect(() => {
        if(!Object.keys(receta).length) history.push('/nueva-receta')

        let el: any = document.getElementById('canvas_container')
        setWidthContainer(el.offsetWidth)

        getRutaWhatsapp()
        return () => {
            dispatch( resetearAccion() )
        }
    },[])

    useEffect(() => {
        if(whatsapp.okResponse) {
            let mensaje = 'https://api.whatsapp.com/send?text='
            mensaje += 'Sr/a. Paciente, puede visualizar su receta accediendo a ' + window.properties.urlVerReceta + "%2F%23%2Fver-receta%2F" + whatsapp.okResponse;
            mensaje += '%0A%0A'
            mensaje += 'Para utilizar los cupones con descuento, por favor chequee las farmacias adheridas en https://farmacias.ereceta.com.ar'
            setUrlWhatsapp(mensaje)
        }
    },[whatsapp.okResponse])

    return (
        <div className="container h-100">
            <DialogEnviarReceta open={openDialogEmail} toggle={toggleDialogEmail}/>
            <DialogWhatsappNumero open={openDialogWhastapp} toggle={toggleDialogWhatsapp}/>
            <div className="row justify-content-center">
                <div className="col-12 col-lg-8 mb-2">
                    <div className="row">
                        <div className="col-6">
                            <Button 
                            size="small"
                            color="primary" 
                            variant="contained"
                            onClick={() => history.push('/nueva-receta')}>
                                Nueva receta
                            </Button>
                        </div>
                        <div className="col-6 text-right">
                            <Button 
                            size="small"
                            id="compartir"
                            variant="contained"
                            onClick={() => {
                                setOpenMenu(true)
                            }}>
                                Compartir
                            </Button>
                            <Menu
                            keepMounted
                            onClose={() => setOpenMenu(false)}
                            anchorEl={document.getElementById('compartir')}
                            open={openMenu}>
                                <MenuItem
                                className="text-black"
                                onClick={toggleDialogEmail}>
                                    Por e-mail
                                </MenuItem>
                                <MenuItem
                                disabled={!whatsapp.okResponse}>
                                    <a href={urlWhatsapp} target="_blank" rel="noopener noreferrer" className="text-decoration-none" style={{color: "inherit"}}>
                                        Por Whatsapp a contacto
                                        {   whatsapp.loading &&
                                            <CircularProgress size={15} className="ml-2"/>
                                        }
                                    </a>
                                </MenuItem>
                                <MenuItem
                                disabled={!whatsapp.okResponse}
                                onClick={toggleDialogWhatsapp}>
                                    Por Whatsapp a numero
                                    {   whatsapp.loading &&
                                        <CircularProgress size={15} className="ml-2"/>
                                    }
                                </MenuItem>
                                <MenuItem
                                className="text-black"
                                onClick={handleButtonDownload}>
                                    Descargar
                                </MenuItem>
                            </Menu>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-8" id="my_pdf_viewer">
                    <div className="border border-dark overflow-hidden" id="canvas_container">
                        <Document
                        file={'data:application/pdf;base64,'+receta.archivo}
                        loading={
                            <div className="d-flex flex-column align-items-center justify-content-center py-5">
                                <CircularProgress />
                                <span className="text-muted pt-2">Cargando...</span>
                            </div>
                        }
                        onLoadSuccess={(pdf) => setState({
                            ...state,
                            totalPages: pdf.numPages
                        })}>
                            <Page
                            className="w-100"
                            width={widthContainer}
                            scale={1}
                            pageNumber={state.page} />
                        </Document>
                    </div>
                </div>
                <div className="col-12 col-lg-8 my-3">
                    <div className="row">
                        <div className="col-4 text-left">
                            <Button
                            size="small"
                            onClick={() => handleChangePage(-1)}
                            variant="contained">
                                Anterior
                            </Button>
                        </div>
                        <div className="col-4 align-items-center d-flex justify-content-center">
                            <span className="font-weight-bold">
                                Página {state.page} / {state.totalPages}
                            </span>
                        </div>
                        <div className="col-4 text-right">
                            <Button
                            size="small"
                            onClick={() => handleChangePage(1)} 
                            variant="contained">
                                Siguiente
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Receta;