import React from 'react'
import { useSelector } from 'react-redux';

function Finish() {
    const isFinished = useSelector((store) => store.resource.isFinished);
    return (
        isFinished ?
            <h1 className="m-2 p-2 text-center">You searched Everything!!</h1>
            :
            <></>
    )
}

export default Finish