import React from 'react';
import { FormControl, Select } from '@material-ui/core'

import AppInput from '../../../../components/AppInput'

const MedicosFiltro = ({handle}: {handle: any}) => {

    return (
        <>
            <div className="row align-items-center">
                <ColumnaInput name="dni" handle={handle} label="DNI: " placeholder="Ingresar DNI..."/>
                <ColumnaInput name="nombre" handle={handle} label="Nombre: " placeholder="Ingresar nombre..."/>
                <ColumnaInput name="apellido" handle={handle} label="Apellido: " placeholder="Ingresar apellido..."/>
                <ColumnaInput name="email" handle={handle} label="Email: " placeholder="Ingresar email..."/>
            </div>
            <div className="row align-items-center">
                <div className="col-md-3 col-12">
                    <div className="row align-items-center mb-2">
                        <div className="col-12">
                            <span style={{color:'#fff'}} className="font-weight-bold mr-2">Tipo matrícula:</span>
                        </div>
                        <div className="col-12">
                            <FormControl variant="outlined" fullWidth size="small">
                                <Select
                                className="inputStyle"
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
                <ColumnaInput name="matricula" handle={handle} label="Matrícula: " placeholder="Ingresar matrícula..."/>
                <ColumnaInput name="teléfono" handle={handle} label="Teléfono: " placeholder="Ingresar teléfono..."/>
                <div className="col-md-3 col-12">
                    <div className="row align-items-center mb-2">
                        <div className="col-12">
                            <span style={{color:'white'}} className="font-weight-bold mr-2">Estado:</span>
                        </div>
                        <div className="col-12">    
                            <FormControl variant="outlined" fullWidth size="small">
                                <Select
                                className="inputStyle"
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

const ColumnaInput = ({label, name, placeholder, handle}: {label: string, name: string, placeholder: string, handle: any}) => (
    <div className="col-md-3 col-12 mb-2" >
        <div className="row align-items-center text-white">
            <div className="col-12">
                <span className="font-weight-bold">{label}</span>
            </div>
            <div className="col-12">    
                <AppInput
                onChange={handle}
                name={name}
                placeholder={placeholder}/>
            </div>
        </div>
    </div>
)


export default MedicosFiltro;