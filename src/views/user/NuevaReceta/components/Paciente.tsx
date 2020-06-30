import React from 'react';
import { FormControl, InputLabel, Select, Paper } from '@material-ui/core'
import AppInput from '@/components/AppInput'
import { useSelector } from 'react-redux'
import { IObraSocial } from '@/models/IObraSocial';

const Paciente = ({handle, error, paciente}: {handle: any, error: any, paciente: any}) => {
    
    const listaObraSocial: IObraSocial[] = useSelector((state: any) => state.nuevaReceta.listaObraSocial)

    return ( 
        <Paper 
            elevation={4}
            className="p-2">
                <form action="" method="POST" className="">
                    <div className="form-group row">
                        <div className="col-6 col-md-12 pr-1 pr-md-3 mb-md-3 text-left">
                            <AppInput 
                            onChange={handle}
                            name="nombre"
                            error={error.nombre}
                            label="Nombre"
                            value={paciente.nombre}/>
                        </div>
                        <div className="col-6 col-md-12 pl-1 pl-md-3 text-left">
                            <AppInput 
                            onChange={handle}
                            name="apellido"
                            error={error.apellido}
                            label="Apellido"
                            value={paciente.apellido}/>
                        </div>
                    </div>
                    <div className="form-group text-left">
                        <AppInput 
                        onChange={handle}
                        name="dni"
                        error={error.dni}
                        label="DNI (opcional)"
                        value={paciente.dni}/>
                    </div>
                    <div className="form-group text-left">
                        <FormControl variant="outlined" fullWidth={true} size="small">
                            <InputLabel>Obra social (opcional)</InputLabel>
                            <Select 
                            error={!!error.obraSocial}
                            native
                            name="obraSocial"
                            label="Obra social (opcional)"
                            onChange={handle}>
                            <option value=""></option>
                            {
                                listaObraSocial.map((o: IObraSocial) => (
                                    <option value={o.nombre} key={o.nombre}> {o.nombre} </option>
                                ))
                            }
                            </Select>
                        </FormControl>      
                    </div>
                    {   paciente.obraSocial &&
                    <div className="form-group text-left">
                        <AppInput 
                        onChange={handle}
                        name="numeroAfiliado"
                        error={error.numeroAfiliado}
                        label="N° Afiliado"
                        value={paciente.numeroAfiliado}/>
                    </div>
                    }
                </form>
            </Paper>
        );
}
 
export default Paciente;