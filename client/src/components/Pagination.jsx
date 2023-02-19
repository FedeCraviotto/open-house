import React, { useState } from "react";
import { Helmet, HelmetProvider } from 'react-helmet-async';


function Pagination(){
    return(
        <HelmetProvider>
            <Helmet>
                <title></title>
                <meta content=""/>
            </Helmet>
            <div className="pagination">Pagination</div>
        </HelmetProvider>
    )
}
export default Pagination;