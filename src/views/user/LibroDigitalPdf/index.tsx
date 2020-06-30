import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { pdfjs } from 'react-pdf';
import { Document, Page } from 'react-pdf';
import { Button, Menu, MenuItem,CircularProgress } from '@material-ui/core';
import DialogEnviarLibroDigital from './components/DialogEnviarLibroDigital'
import { resetearAccion } from '../../../redux/enviarRecetaEmailDuck'
import { enviarWhatsappAccion } from '../../../redux/enviarRecetaWppDuck' 

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const LibroDigitalPdf = () =>{

    const libroDigitalPdf = useSelector((state: any) => state.libroDigital.archivo)
    const user = useSelector((state: any) => state.auth.user)
    const whatsapp = useSelector((state: any) => state.enviarRecetaWpp)

    const history = useHistory()

    const dispatch = useDispatch()

    const [openMenu, setOpenMenu] = React.useState(false)
    const [openDialogEmail, setOpenDialogEmail] = React.useState(false)
    const [widthContainer, setWidtchContainer] = React.useState(0)
    const [state, setState] = React.useState({
        totalPages: 1,
        page: 1,        
    })

    const toggleDialogEmail = (): void => {
        setOpenDialogEmail(!openDialogEmail)
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
        let data = Uint8Array.from(atob(libroDigitalPdf.archivo), c => c.charCodeAt(0));
        let blob = new Blob([data], {type: "octet/stream"});
        let link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = "LibroDigital.pdf";
        link.click();
    }

    const handleEnviarPorWhatsapp = (): void => {
        let aux = libroDigitalPdf;
        aux.idMedico = user.idMedico
        console.log(aux)
        dispatch( enviarWhatsappAccion(aux) )
    }

    useEffect(() => {
        if(whatsapp.okResponse.mensaje) {
            let link = document.createElement('a');
            link.href = whatsapp.okResponse.mensaje;
            link.target = "_blank"
            link.click();
        }  
        console.log(whatsapp)
    }, [whatsapp])

    useEffect(() => {
        if(!Object.keys(libroDigitalPdf).length) history.push('/libroDigital')
        let el: any = document.getElementById('canvas_container')
        setWidtchContainer(el.offsetWidth)
        return () => {
            dispatch( resetearAccion() )
        }
    },[])

    return (
        <div className="container h-100">
            <DialogEnviarLibroDigital open={openDialogEmail} toggle={toggleDialogEmail}/>
            <div className="row justify-content-center">
                <div className="col-12 col-lg-8 mb-2">
                    <div className="row">
                        <div className="col-6">
                            <Button 
                            size="small"
                            color="primary" 
                            variant="contained"
                            onClick={() => history.push('/libro-digital')}>
                                Nueva busqueda por fecha
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
                                onClick={toggleDialogEmail}>Enviar por email
                                </MenuItem>
                                <MenuItem
                                onClick={handleEnviarPorWhatsapp}>
                                    Enviar por Whatsapp
                                    {   whatsapp.loading &&
                                        <CircularProgress size={15} className="ml-2"/>
                                    }
                                </MenuItem>
                                <MenuItem
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
                        file={'data:application/pdf;base64,'+libroDigitalPdf.archivo}
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

export default LibroDigitalPdf;