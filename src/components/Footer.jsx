import React from 'react';

const Footer = () => {

    return (
        <footer className="position-fixed text-center w-100"
        style={{bottom: '0.4%'}}>
            <span>{window.properties.footer} | <a href="https://ereceta.com.ar/recetas/ManualAndroid.pdf">Manual de Usuario</a></span>
        </footer>
    )
}

export default Footer