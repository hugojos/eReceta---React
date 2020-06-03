import React from 'react';


import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

const Home = () => {
    
    const styles = {
        backgroundImage: "url('./img/fondoMbSoft.png')",
        backgroundSize: "100%",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#0056a5",
    }

    return ( 
        <div className="container-fluid vh-100 text-white" style={styles}>
            <div className="row justify-content-center">
                <div className="col-6 col-sm-5 col-md-4 col-lg-2">
                    <img src="./img/Logo-Trans.png" className="w-100" alt=""/>
                </div>
            </div>
            <div className="text-center row justify-content-center">
                <div className="col-12 col-sm-10 col-md-8 col-lg-5 p-0">
                    <p className="font-weight-bold h4">eReceta es una herramienta que permite generar recetas electrónicas, facilitando y agilizando la prescripción y dispensa de medicamentos.</p>
                </div>
            </div>
            <div className="row mt-4 justify-content-center">
                <div className="col-12 col-md-3 d-flex justify-content-center mb-2">
                    <Link
                    to="/iniciar-sesion"
                    component={Button}
                    classes={{
                        label: "h5 m-0 p-2"
                    }}
                    variant="outlined" size="large" className="text-white border-white">INGRESAR</Link>
                </div>
                <div className="col-12 col-md-3 d-flex justify-content-center mb-2">
                    <Button
                    component={"a"}
                    href="https://play.google.com/store/apps/details?id=app.mbsoft.erecetacupon" 
                    classes={{
                        label: "h5 m-0 p-2"
                    }}
                    variant="outlined" size="large" className="text-white border-white">DESCARGAR</Button>
                </div>
            </div>
            <div className="text-center mt-5">
                <small>@ 2020 MBSoft S.A | POLITICAS DE PRIVACIDAD</small>
            </div>
        </div>
     );
}
 
export default Home;