import React from 'react'
import { IconButton, Dialog, DialogContent, DialogTitle, Divider } from '@material-ui/core'
import { Close } from '@material-ui/icons'

const DialogTerminos = ({toggleTerminos, open}) => {
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
                <span className="text-muted h5 m-0">
                    Términos y condiciones
                </span>
                <IconButton
                onClick={ () => toggleTerminos() }>
                    <Close />
                </IconButton>
            </DialogTitle>
            <Divider />
            <DialogContent className="p-2 py-0 text-center">
                <p className="my-3">Ejemplo de términos y condiciones Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, non. Minus veniam fuga dolorum voluptas ducimus quasi delectus provident optio rerum exercitationem quod, quaerat sapiente, at voluptate consectetur libero architecto.</p>
            </DialogContent>
            <Divider />
        </Dialog>
     );
}
 
export default DialogTerminos;