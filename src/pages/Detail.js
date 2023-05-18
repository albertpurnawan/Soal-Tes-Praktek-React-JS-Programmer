import React, { useState, useRef } from 'react';
import NavbarComp from '../components/NavbarComp';
import FooterComp from '../components/FooterComp';
import DetailComp from '../components/DetailComp';


 function DetailPage() {
    return (
        <div>
            <NavbarComp />
            <div class="detailpage">
                <DetailComp/>
            </div>
            
            <FooterComp />
        </div>
    );
}

export default DetailPage;