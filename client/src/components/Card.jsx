import React, { useState } from "react";
import { Helmet, HelmetProvider } from 'react-helmet-async';


function Card(){
    return(
        <HelmetProvider>
            <Helmet>
                <title></title>
                <meta content=""/>
            </Helmet>
            <div className="card">Card</div>
        </HelmetProvider>
    )
}
export default Card;