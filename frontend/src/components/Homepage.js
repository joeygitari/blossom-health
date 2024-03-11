import React, { useState } from 'react';
import Header from './Header';

const Homepage = () => {
    const [menu, setMenu] = useState(false);

    const toggleMobileMenu = () => {
        setMenu(!menu);
    };
    return(
        <div className='main-wrapper'>
            <div className="app-container">
                <Header onMenuClick={() => toggleMobileMenu()} />
                <div className="main-content">
                    
                </div>
            </div>
        </div>
    );
}

export default Homepage;