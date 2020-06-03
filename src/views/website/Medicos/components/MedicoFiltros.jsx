import React from 'react';

import { FormControl, Select } from '@material-ui/core'

import AppInput from '../../../../components/AppInput'

const MedicosFiltro = () => {
    return (
        <>
            <div className="row align-items-center">
                <Columna label="DNI: " placeholder="INGRESE DNI"/>
                <Columna label="Nombre y apellido: " placeholder="INGRESE NOMBRE Y/O APELLIDO"/>
                <Columna label="Email: " placeholder="INGRESE EMAIL"/>
            </div>
            <div className="row align-items-center">
                <div className="col-md-4 col-12">
                    <div className="row align-items-center">
                        <div className="col-12 col-md-3">
                            <span className="font-weight-bold mr-2">Tipo matricula:</span>
                        </div>
                        <div className="col-12 col-md-9">
                            <FormControl variant="outlined" fullWidth size="small">
                                <Select
                                native
                                name="obraSocial">
                                    <option value="" selected>Nacional</option>
                                    <option value="">Provincial</option>
                                </Select>
                            </FormControl> 
                        </div>
                    </div>
                </div>
                <Columna label="Matricula: " placeholder="INGRESE MATRICULA"/>
                <div className="col-md-4 col-12">
                    <div className="row align-items-center">
                        <div className="col-12 col-md-3">
                            <span className="font-weight-bold mr-2">Estado:</span>
                        </div>
                        <div className="col-12 col-md-9">    
                            <FormControl variant="outlined" fullWidth size="small">
                                <Select
                                native
                                name="obraSocial">
                                    <option value="" selected>Todo</option>
                                    <option value="">Habilitado</option>
                                    <option value="">Inhabilitado</option>
                                </Select>
                            </FormControl> 
                        </div>
                    </div>
                </div>
            </div>
        </>
     );
}

const Columna = ({label, name, placeholder}) => (
    <div className="col-md-4 col-12">
        <div className="row align-items-center">
            <div className="col-12 col-md-3">
                <span className="font-weight-bold mr-2">{label}</span>
            </div>
            <div className="col-12 col-md-9">    
                <AppInput 
                name={name}
                placeholder={placeholder}/>
            </div>
        </div>
    </div>
)

export default MedicosFiltro;