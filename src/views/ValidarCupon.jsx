import React, { useEffect, useState } from 'react';
import Quagga from 'quagga'; 


const ValidarCupon = () => {

    const [resultado, setResultado] = useState('')

    useEffect(() => {
        Quagga.init(
            {inputStream: {
                type: "LiveStream",
                constraints: {
                    width: { "min": 450 },
                    height: { "min": 300 },
                    facingMode: "environment",
                    aspectRatio: { "min": 1, "max": 2 }
                }
                },
                locator: {
                    patchSize: "medium",
                    halfSample: true
                },
                numOfWorkers: 2,
                frequency: 10,
                decoder: {
                    readers: ["ean_reader"]
                },
                locate: true}
            , err => {
                if (err) {
                    console.dir(err);
                    return
                }
                console.log("Initialization finished. Ready to start");
            Quagga.start();
          });
          Quagga.onProcessed(result => {
            let drawingCtx = Quagga.canvas.ctx.overlay,
              drawingCanvas = Quagga.canvas.dom.overlay;
      
            if (result) {
              if (result.boxes) {
                drawingCtx.clearRect(
                  0,
                  0,
                  Number(drawingCanvas.getAttribute("width")),
                  Number(drawingCanvas.getAttribute("height"))
                );
                result.boxes
                  .filter(function(box) {
                    return box !== result.box;
                  })
                  .forEach(function(box) {
                    Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
                      color: "green",
                      lineWidth: 2
                    });
                  });
              }
      
              if (result.box) {
                Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
                  color: "#00F",
                  lineWidth: 2
                });
              }
      
              if (result.codeResult && result.codeResult.code) {
                Quagga.ImageDebug.drawPath(
                  result.line,
                  { x: "x", y: "y" },
                  drawingCtx,
                  { color: "red", lineWidth: 3 }
                );
              }
            }
          });

          Quagga.onDetected( result => setResultado(result.codeResult.code))
    }, [])



    return (
        <>
            <div 
            id='interactive'
            className="viewport">
            </div>
            <span>
                {resultado}
            </span>
        </>
    )
}

export default ValidarCupon;