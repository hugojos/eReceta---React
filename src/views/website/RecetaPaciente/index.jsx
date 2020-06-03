import React, { useState,useEffect } from 'react'
import { pdfjs } from 'react-pdf';
import { Document, Page } from 'react-pdf';
import { Button, CircularProgress } from '@material-ui/core';
import axios from 'axios';


pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.1.266/pdf.worker.min.js'

const Receta = (props) => {

    const [widthContainer, setWidtchContainer] = useState(0)

    const [urlPdf, setUrlPdf] = useState('')

    const [state, setState] = useState({
        totalPages: 1,
        page: 1,        
    })

    const handleChangePage = (valor) => {
        let newState = state
        newState.page += valor
        if(newState.page < 1) newState.page = 1
        if(newState.page > newState.totalPages) newState.page = newState.totalPages
        setState({...newState}) 
    }

    const handleButtonDownload = () => {
        let link = document.createElement('a');
        link.href = urlPdf;
        link.click();
    }
    
    useEffect(() => {
        axios.post(window.properties.ip + '/compartirWhatsappRuta')
        .then(response => {
            let { nombreArchivo } = props.match.params
            setUrlPdf( response.data.mensaje + nombreArchivo + '.pdf') // Se encarnga de armar la url para buscar el archivo pdf
        })
        //if(!Object.keys(receta).length) history.push('/nueva-receta')
        setWidtchContainer(document.getElementById('canvas_container').offsetWidth)
    },[props.match.params])

    return (
        <div className="container h-100">
            <div className="row justify-content-center">
            <div className="col-12 col-lg-8 my-2    ">
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
                <div className="col-12 col-lg-8" id="my_pdf_viewer">
                    <div className="border border-dark overflow-hidden" id="canvas_container">
                        <Document
                        file={urlPdf}
                        loading={
                            <div className="d-flex flex-column align-items-center justify-content-center py-5">
                                <CircularProgress />
                                <span className="text-muted pt-2">Cargando...</span>
                            </div>
                        }
                        onLoadSuccess={(pdf) => {
                            console.log(pdf)
                            setState({
                            ...state,
                            totalPages: pdf.numPages
                        })}}>
                            <Page
                            className="w-100"
                            width={widthContainer}
                            scale={1}
                            pageNumber={state.page} />
                        </Document>
                    </div>
                </div>
                <div className="my-3 col-12 d-flex justify-content-center">
                    <Button
                    onClick={handleButtonDownload}
                    variant="contained"
                    color="primary">
                        Descargar receta
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Receta;