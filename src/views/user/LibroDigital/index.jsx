import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { traerPDFAccion } from '../../../redux/libroDigitalDuck'
import { TextField, InputAdornment, Button, Tooltip } from '@material-ui/core'
import { ReportProblemOutlined } from '@material-ui/icons';


const LibroDigital = ()=>{


const dispatch = useDispatch()

const state = useSelector(state => state.libroDigital)

const auth = useSelector(state => state.auth.user)

    var fecha = new Date();
    var dia = fecha.getDate(); 
    var mes = fecha.getMonth() + 1; 
    var anio = fecha.getFullYear(); 
    
        if (dia < 10) { 
            dia = '0' + dia; 
        } 
        if (mes < 10) { 
            mes = '0' + mes; 
        } 

    var fechaActual = anio + '-' + mes + '-' + dia;
    var fechaPrimerDiaDelMes = anio + '-' + mes + '-' + '01';

    const [objeto, setObjeto] = useState({
        usuarioMedicoDto: auth,
        fechaDesde: fechaPrimerDiaDelMes,
        fechaHasta: fechaActual,
    })

	const handleInputChange = (event) => {
        setObjeto({
			...objeto,
			[event.target.name]: event.target.value
        }) 
    }

    const [error, setError] = useState({})

    const generarLibroDigital = () => {
        setError({})
        let auxObjeto = objeto
        let newError = {}
        if(objeto.fechaDesde > objeto.fechaHasta) newError.fechaDesde = 'La fecha de inicio del período no puede ser posterior a la fecha donde termina el período.'
        setError({...newError})
        auxObjeto.fechaDesde = objeto.fechaDesde.replace(/-/gi,'')
        auxObjeto.fechaHasta = objeto.fechaHasta.replace(/-/gi,'')
        console.log(auxObjeto)
        if(!Object.keys(newError).length){
            dispatch( traerPDFAccion(objeto) )
        }
    }
        
    

    return(
        <div className="container h-100">
            <div className="row pt-2 justify-content-center">
                <div className="col-12 col-md-6 text-left">
                    <h1 className="h4">Generación de Libro digital</h1>
                    <span className="small">
                        Resolución 696/2020
                        ARTÍCULO 6°.- A los fines de implementar el presente procedimiento, los profesionales prescriptores deberán habilitar un libro denominado “Libro prescriptor bajo COVID-19”, donde registrarán los datos establecidos en el Anexo I de esta Resolución.
                    </span>
                    <form action="" method="POST" className="mt-3">
                        <span className="text-muted font-weight-bold">Ingrese el rango de fechas para el cual desea ver las recetas generadas</span>
                        <div className="form-group row mt-3">
                            <div className="col-6 col-md-12 pr-1 pr-md-3 mb-md-3 text-left">
                                <TextField
                                    id="fechaDesde"
                                    name="fechaDesde"
                                    className="p-0"
                                    fullWidth={false}
                                    label="Fecha Desde"
                                    type="date"
                                    onChange={handleInputChange}
                                    defaultValue={fechaPrimerDiaDelMes}
                                    InputProps={{
                                        endAdornment: 
                                        error.fechaDesde &&
                                        <InputAdornment
                                        position="end">
                                            <Tooltip placement="top-end" title={error.fechaDesde}>
                                                <ReportProblemOutlined className="text-danger"/>
                                            </Tooltip>
                                        </InputAdornment>,
                                    }}
                                    InputLabelProps={{
                                    shrink: true,
                                }}/>
                            </div>
                            <div className="col-6 col-md-12 pr-1 pr-md-3 mb-md-3 text-left">
                            <TextField                              
                                    id="fechaHasta"
                                    name="fechaHasta"
                                    className="p-0"
                                    fullWidth={false}
                                    label="Fecha Hasta"
                                    type="date"
                                    onChange={handleInputChange}
                                    defaultValue={fechaActual}
                                    InputLabelProps={{
                                    shrink: true,
                                }}/>
                            </div>
                            <div className="mt-2 col-12 text-right small">
                                <Button 
                                size="large" 
                                color="primary" 
                                variant="contained"
                                onClick={ () => generarLibroDigital() }>
                                Generar libro digital
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default LibroDigital;