import React, {useEffect, useState} from 'react'
import { Dialog, Divider, DialogActions, DialogContent, Button, DialogTitle, IconButton } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import axios from 'axios'

const BotonWhatsapp = () => {

    const [url, setURL] = useState('')

    const [openDialog, setOpenDialog] = useState(false)

    const [position, setPosition] = useState({
        left: 0,
        top: 0
    })

    useEffect(() => {
        axios.post(window.properties.ip +'/linkWhatsApp')
        .then(response => {
            setURL(response.data.mensaje)
            console.log(response)
        })
        if(localStorage.getItem('dialogWhatsapp'))
            setPosition({
                right: '10px',
                bottom: '1%'
            })
        else toggleDialog()
    }, [])

    const toggleDialog = () => {
        localStorage.setItem('dialogWhatsapp', true)
        setOpenDialog(!openDialog)
        setPosition({
            transition: 'all 1s',
            right: '10px',
            bottom: '1%'
        })
    }

    const calcularPosisionDentroDelDialog = () => {
        let dialogIcon = document.getElementById('icono')
        setPosition({
            right: (window.innerWidth - (dialogIcon.offsetParent.offsetLeft + dialogIcon.offsetLeft) - dialogIcon.offsetWidth) +'px',
            bottom: (window.innerHeight - (dialogIcon.offsetParent.offsetTop + dialogIcon.offsetTop) - dialogIcon.offsetHeight) +'px'
        })
        setTimeout(toggleDialog, 10000)
    }

    return (
        <>
            <Dialog 
            fullWidth
            scroll="body"
            maxWidth="sm"
            open={openDialog} 
            onEnter={calcularPosisionDentroDelDialog}
            className="m-0">
                <DialogTitle className="p-0 text-right">
                    <IconButton
                    onClick={toggleDialog}>
                        <Close />
                    </IconButton>
                </DialogTitle>
                <Divider />
                <DialogContent className="d-flex flex-column align-items-center p-2 py-0 text-left small">
    <p className="h4 m-0 text-dark">{window.properties.dialogConsultasPorWhatsapp}</p>
                    <div id="icono" style={{height: '45px', width:'45px'}}></div>
                </DialogContent>
                <Divider />
                <DialogActions className="d-flex justify-content-end">
                    <Button 
                    onClick={toggleDialog}
                    variant="contained"
                    color="primary">
                        De acuerdo
                    </Button>
                </DialogActions>
            </Dialog>
            <div className="position-fixed d-flex align-items-center boton-whatsapp" style={{...position, zIndex: 2000000}}>
                <a
                rel="noopener noreferrer"
                href={url}
                target="_blank"
                className="pointer">
                    <img className="" src="img/whatsapp-logo.png" alt="" />
                </a>
            </div>
        </>
    )
}

export default BotonWhatsapp;