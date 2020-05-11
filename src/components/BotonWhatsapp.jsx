import React, {useEffect, useState} from 'react'
import axios from 'axios'

const BotonWhatsapp = () => {

    const [url, setURL] = useState('')

    const [mouseEncima, setMouseEncima] = useState(false)

    useEffect(() => {
        axios.post('http://'+ window.properties.ip +'/linkWhatsApp')
        .then(response => {
            setURL(response.data.mensaje)
            console.log(response)
        })
    }, [])

    return (
        <div className="position-fixed d-flex align-items-center boton-whatsapp">
            {   mouseEncima &&
                <span className="text-white p-1 rounded font-weight-bold boton-whatsapp-texto">¿Tenes dudas? ¡Consultanos!</span>
            }
            <a
            onMouseEnter={() => setMouseEncima(true)}
            onMouseLeave={() => setMouseEncima(false)}
            href={url}
            target="_blank"
            className="pointer">
                <img className="" src="img/whatsapp-logo.png" alt="" />
            </a>
        </div>
    )
}

export default BotonWhatsapp;