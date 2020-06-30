import { useState, useEffect } from 'react';
import IMedico from '@/models/IMedico'

export const useMedico = (): [IMedico, any] => {
    
    const [medico, setMedico]= useState<IMedico>({
        nombre: '',
        apellido: '',
        dni: '',
        telefono: '',
        email: '',
        matricula: '',
        archivoDni: '',
        tipoMatricula: "",
        password: '',
        confirmPassword: '',
        idProvincia: "0"
    })

    useEffect(() => {
        if(medico.idProvincia === "1")
            setMedico({...medico, tipoMatricula: 'NACIONAL'})
        else 
            setMedico({...medico, tipoMatricula: 'PROVINCIAL'})
    }, [medico.idProvincia])

    return [medico, setMedico];
}