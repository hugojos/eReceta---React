import React, { useState } from 'react';

import { AddAPhoto, Close } from '@material-ui/icons'

const RegisterPhoto = ({handle, value, disabled}) => {

    const [error, setError] = useState('')

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

    const mostrarImagen = (event) => {
        let file = event.target.files[0]
        let imageType = /image.*/;
        if (!file.type.match(imageType)) {
            setError('Archivo invalido')  
            return
        };
        setError('')
        let readerShowImg = new FileReader()
        readerShowImg.onload = function(e){
            document.getElementById('img-salida').src = e.target.result
            handle( convertDataURIToBinary(e.target.result) )
        }
        readerShowImg.readAsDataURL(file);
    }

    const eliminarImagen = () => {
        handle('')
    }

    return (
        <>
            {   !value &&
                <div>
                    <label htmlFor="subir-dni" className="pointer">
                        <AddAPhoto />
                    </label>
                    <div>
                        <span className="small text-danger"></span>
                    </div> 
                    <div>
                        {   !error ? 
                            <span className="small text-muted">Subir imagen</span>
                            :
                            <span className="small text-danger">{error}</span>
                        }
                    </div>
                    <input type="file"
                    onChange={mostrarImagen}
                    className="d-none"
                    id="subir-dni" />
                </div>
            }
            <div className={value ? 'position-relative' : ' d-none'}>
                <img src="/" id="img-salida" className="border w-100" style={{height:'96px'}}/>
                {   !disabled &&
                    <Close
                    onClick={eliminarImagen}
                    className="position-absolute text-error pointer" title="Eliminar" style={{top: '2px', right:'2px'}}/>    
                }
            </div>
        </>
    )

}

export default RegisterPhoto;