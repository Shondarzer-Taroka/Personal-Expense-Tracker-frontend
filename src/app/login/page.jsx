import LogIn from '../../../src/components/Authentication/LogIn';
import React from 'react';

const page = () => {
    return (
        <div className=''>
            <div
          className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${'https://i.ibb.co.com/MkjbGZXc/15364605-5607654.jpg'})` }} 
        >
          {/* Overlay for dim/blur effect */}
          <div className="absolute inset-0  backdrop-blur-sm"></div>
        </div>
            <LogIn/>
        </div>
    );
};

export default page;