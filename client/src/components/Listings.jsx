import React, { useState } from "react";
import { Helmet, HelmetProvider } from 'react-helmet-async';


function Listings(){
    return(
        <HelmetProvider>
            <Helmet>
                <title></title>
                <meta content=""/>
            </Helmet>
            <div className="listings">Listings</div>
        </HelmetProvider>
    )
}
export default Listings;