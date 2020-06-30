import React, { useState, useEffect, ChangeEvent } from 'react';

import { AddAPhoto, Close } from '@material-ui/icons'
import { convertDataURIToBinary } from '@/utils/convert'

const RegisterPhoto = ({onChange, value, disabled}: {onChange: any, value:string, disabled?: boolean}) => {

    const [error, setError] = useState<string>('')

    useEffect(() => {
        if(typeof value == 'string'){
            let el: any = document.getElementById('img-salida')
            el.src = 'data:image/png;base64,'+value
        }
    }, [value])

    const mostrarImagen = (event: ChangeEvent<HTMLInputElement>) => {
        let el: any = event.target;
        let file = el.files[0]
        let imageType = /image.*/;
        if (!file.type.match(imageType)) {
            setError('Archivo invalido')  
            return
        };
        setError('')
        let readerShowImg = new FileReader()
        readerShowImg.onload = function(e: any){
            let el: any = document.getElementById('img-salida');
            el.src = e.target.result
            onChange( convertDataURIToBinary(e.target.result) )
        }
        readerShowImg.readAsDataURL(file);
    }

    const eliminarImagen = (): void => {
        onChange('')
    }

    return (
        <>
            {   !value &&
                <div>
                    <label htmlFor="subir-dni" className="pointer">
                        <AddAPhoto />
                    </label>
                    <div>
                        {   !error ? 
                            <span className="small text-muted">Subir imagen</span>
                            :
                            <span className="small text-error">{error}</span>
                        }
                    </div>
                    <input type="file"
                    disabled={disabled}
                    onChange={mostrarImagen}
                    className="d-none"
                    id="subir-dni" />
                </div>
            }
            <div className={value ? 'position-relative' : ' d-none'}>
                <img alt="Foto del registro" src="/" id="img-salida" className="border w-100" style={{height:'96px'}}/>
                {   !disabled &&
                    <Close
                    onClick={eliminarImagen}
                    className="position-absolute text-error pointer" 
                    style={{top: '2px', right:'2px'}}
                    />    
                }
            </div>
        </>
    )

}

export default RegisterPhoto;