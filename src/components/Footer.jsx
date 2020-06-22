import React from 'react';

import { Link } from 'react-router-dom';

const Footer = () => {

    const styles = {
        height: '45px',
        bottom: 0,
        backgroundImage: "url('./img/footer-fondo.jpg')",
        backgroundSize: "cover",
        backgroundColor: "#0057a4",
        color: '#fff'
    }

    return (
        <footer className="position-fixed text-center w-100 d-flex flex-column align-items-center justify-content-center"
        style={styles}>
            <div>
                <span>{window.properties.footer}</span>
            </div>
            <small>
            <Link className="link-footer" to="/terminos-condiciones">Términos y condiciones</Link>
            <span className="mx-2">•</span>
            <Link className="link-footer" to="/politicas-privacidad">Políticas de privacidad</Link>
            </small>
        </footer>
    )
}

export default Footer

/*  */