import { useEffect, useState } from "react";
//import QRCode from "react-qr-code";
//import pusherJs from "pusher-js";

function WhatsAppComponent({setWhatsappSession, whatsappId}) {

    /*const [qr, setQr] =useState("");
    const [chats, setChats] =useState("");

    const pusher = new pusherJs('7acca289806231ac0a9b', {
        cluster: 'sa1'
    })
    const channel = pusher.subscribe('my-channel');
    //whatsappId!== ""? 
    useEffect(() => {
        channel.bind('qr', function(data) {
          setQr(data.qr);
        });
        channel.bind('message', function(data) {
            setChats(data.message);
          });
    }, [])*/

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
                            {/*<QRCode value={qr}/>*/}
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
