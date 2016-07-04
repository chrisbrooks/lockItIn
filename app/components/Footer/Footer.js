import React from 'react';

const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <div>© SEEK {year}. All rights reserved.</div>
    );
};

export default Footer;
