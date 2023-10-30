import React, { useState } from "react";
import { useDispatch } from "react-redux";

function Citas({}) {
    const dispatch = useDispatch();
    const citas = useSelector((state) => state.citas).cita;

    useEffect(() => {
        api.get("citas").then((data)=>{
            dispatch(addCita(data.data))
        })        
    }, [dispatch]);

  const handleSelectAlgo = (e) => {
    console.log("AAAA");
  };

  return (
    <div className="flex justify-center items-center gap-10 w-full mb-9">

    </div>
  );
}

export default Citas;