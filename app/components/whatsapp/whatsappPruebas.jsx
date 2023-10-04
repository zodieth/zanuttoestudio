import { useEffect, useState } from "react";
import { api } from "../../page"; 

import QRCode from "react-qr-code";

function WhatsAppComponent({setWhatsappSession}) {

    return (
        <div 
        className="relative z-10 "
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity  ">
                <div className=" flex items-center justify-center fixed inset-0 z-10 overflow-y-auto mx-[10rem]">
                    <div className="flex w-full   overflow-hidden rounded-lg bg-white text-left shadow-xl grid grid-cols-1  items-center justify-center justify-items-center">
                        <div>
                            <h1>Inicio de sesion</h1>
                            <h2>Codigo QR:</h2>
                            <QRCode value="2@01hN9Z9UpHTwmNOxhZ9QgGvoR/7a+hV9ai4Hq7ywSDkiX9PJhaLr9zRtkZ/1ABMHfaLxd7W011krEg==,mFJmrklaMKrWS10IsvtpU9rrkdcTJCnGDnXJqeqVAlw=,e4txnQ/ChwfKHvQ4/X6kZnEp5W1rJkTotes6Eorphl8=,gTI2TqFMrneINp4p1aVqGmzqbXCL0amYiaIukXujFNc=,1"/>
                        </div>
                        <div>
                            <button onClick={()=> setWhatsappSession(false)}>
                                X
                            </button>
                        </div>
                    </div>
                    <div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}
export default WhatsAppComponent