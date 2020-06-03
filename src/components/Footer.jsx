import React from 'react';

const Footer = () => {

    return (
        <footer className="position-fixed text-center w-100 d-flex align-items-center justify-content-center"
        style={{bottom: '0.4%'}}>
            <span>{window.properties.footer} | </span>
            <span className="ml-2" style={{fontSize: '10px', lineHeight:'1.1'}}>{window.properties.version}</span>
        </footer>
    )
}

export default Footer