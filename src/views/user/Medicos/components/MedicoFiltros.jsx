import React from 'react';

import { FormControl, Select } from '@material-ui/core'

import AppInput from '../../../../components/AppInput'

const MedicosFiltro = ({handle}) => {

    return (
        <>
            <div className="row align-items-center">
                <ColumnaInput name="dni" handle={handle} label="DNI: " placeholder="INGRESE DNI"/>
                <ColumnaInput name="nombre" handle={handle} label="Nombre: " placeholder="INGRESE NOMBRE"/>
                <ColumnaInput name="apellido" handle={handle} label="Apellido: " placeholder="INGRESE APELLIDO"/>
                <ColumnaInput name="email" handle={handle} label="Email: " placeholder="INGRESE EMAIL"/>
            </div>
            <div className="row align-items-center">
                <div className="col-md-3 col-12">
                    <div className="row align-items-center">
                        <div className="col-12">
                            <span className="font-weight-bold mr-2">Tipo matricula:</span>
                        </div>
                        <div className="col-12">
                            <FormControl variant="outlined" fullWidth size="small">
                                <Select
                                onChange={handle}
                                native
                                name="tipoMatricula">
                                    <option value="NACIONAL">Nacional</option>
                                    <option value="PROVINCIAL">Provincial</option>
                                </Select>
                            </FormControl> 
                        </div>
                    </div>
                </div>
                <ColumnaInput name="matricula" handle={handle} label="Matricula: " placeholder="INGRESE MATRICULA"/>
                <ColumnaInput name="telefono" handle={handle} label="Telefono: " placeholder="INGRESE TELEFONO"/>
                <div className="col-md-3 col-12">
                    <div className="row align-items-center">
                        <div className="col-12">
                            <span className="font-weight-bold mr-2">Estado:</span>
                        </div>
                        <div className="col-12">    
                            <FormControl variant="outlined" fullWidth size="small">
                                <Select
                                onChange={handle}
                                native
                                name="estado">
                                    <option value="TODOS">Todo</option>
                                    <option value="HABILITADO">Habilitado</option>
                                    <option value="INHABILITADO">Inhabilitado</option>
                                </Select>
                            </FormControl> 
                        </div>
                    </div>
                </div>
            </div>
        </>
     );
}

const ColumnaInput = ({label, name, placeholder, handle}) => (
    <div className="col-md-3 col-12 mb-2">
        <div className="row align-items-center">
            <div className="col-12">
                <span className="font-weight-bold">{label}</span>
            </div>
            <div className="col-12">    
                <AppInput
                handle={handle}
                name={name}
                placeholder={placeholder}/>
            </div>
        </div>
    </div>
)


export default MedicosFiltro;