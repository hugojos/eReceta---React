import React from 'react';

const Footer = () => {

    return (
        <footer className="position-fixed text-center w-100"
        style={{bottom: '0.5%'}}>
            <span>{window.properties.footer}</span>
        </footer>
    )
}

export default Footer