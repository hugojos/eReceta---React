import React from 'react';
import './home.css';

import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

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
                <div className="col-7 col-sm-4 col-md-3 my-5">
                    <img src="./img/Logo-Trans-Rect.png" className="w-100" alt=""/>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-10 col-sm-8 col-md-7 col-lg-6 p-0">
                    <p className="text-center font-weight-bold home-mobile-text home-desktop-text"><span className="home-mobile-eReceta home-desktop-eReceta">eReceta</span> es una herramienta que permite generar recetas electrónicas, facilitando y agilizando la prescripción y dispensa de medicamentos.</p>
                </div>
            </div>
            <div className="row mt-4 justify-content-center">
                <div className="col-12 col-sm-5 col-md-4 col-lg-4 col-xl-3 d-flex justify-content-center align-items-center mb-2 p-0">
                    <Button
                    to="/iniciar-sesion"
                    component={Link}      
                    variant="outlined" size="large" style={{width:'220px', height:'58px'}} className="text-white border-white mb-1 mb-sm-0">
                            <p className="h5 pt-2">INGRESAR</p>
                        </Button>
                </div>
                <div className="col-12 col-sm-5 col-md-4 col-lg-4 col-xl-3 d-flex justify-content-center align-items-center mb-2 p-0">     
                     <Button
                    component={"a"}
                    href="https://play.google.com/store/apps/details?id=app.mbsoft.erecetacupon"
                    variant="outlined" size="large" className="text-white border-white" style={{width:'220px', height:'60px'}}>
                            <div className="h-100 d-flex align-items-center home-icon m-0 p-0">
                                <img className="p-0 w-100" src="./img/icons8-google-play.svg" alt="" />
                            </div>
                            <p className="h5 pt-2">DESCARGAR</p>
                        </Button>
                </div>
            </div>
            <div className="text-center mt-2 mt-md-5">
                <small className="d-flex align-items-center justify-content-center flex-column flex-sm-row">
                    <span className="mb-2 mb-sm-0">{window.properties.footer}</span>
                    <span className="d-none d-sm-inline ml-2 mr-2">|</span>
                    <Link className="mb-1 mb-sm-0 home-link" to="/terminos-condiciones">Términos y condiciones</Link>
                    <span className="d-none d-sm-inline ml-2 mr-2">|</span>
                    <Link className="home-link" to="/politicas-privacidad">Políticas de privacidad</Link>
                </small>
            </div>
        </div>
     );
}
 
export default Home;