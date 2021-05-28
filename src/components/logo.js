// import React from "react";
//
// const Logo = () => {
//     return <img className="logoMain" src="/images/zero_0deg.svg" alt="" />;
// };
// export default Logo;

import React from "react";
// import { HashLink } from "react-router-hash-link";

const Logo = () => {
    return (
        <svg
            version="1.1"
            className="logoMain"
            id="logoId"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="56.942 -3.079 30.51 30.51"
            enableBackground="new 56.942 -3.079 30.51 30.51"
            xmlSpace="preserve"
        >
            <path
                className="smallCircle"
                d="M82.684,1.691c-1.172-1.171-3.071-1.171-4.242,0c-1.171,1.172-1.172,3.071,0,4.243
			c1.171,1.171,3.071,1.171,4.242,0C83.855,4.762,83.855,2.862,82.684,1.691z M79.502,4.873c-0.586-0.586-0.586-1.536,0-2.121
			c0.586-0.586,1.534-0.586,2.121,0c0.586,0.585,0.586,1.536,0,2.122C81.038,5.458,80.088,5.458,79.502,4.873z"
            />
            <path
                className="largeCircle"
                d="M81.857,8.08c-1.528,0.447-3.243,0.089-4.447-1.115c-1.206-1.205-1.563-2.919-1.115-4.447
			c-3.823-1.621-8.408-0.879-11.524,2.237c-4.1,4.101-4.1,10.749,0.001,14.85c4.1,4.099,10.747,4.099,14.848,0
			C82.735,16.488,83.478,11.902,81.857,8.08z M72.195,17.18c-2.762-0.001-5-2.238-5.001-5.001c0-2.76,2.239-4.999,5.001-4.999
			c2.76,0,4.999,2.238,4.999,4.998C77.194,14.942,74.955,17.178,72.195,17.18z"
            />
            <path
                opacity="0"
                fill="none"
                stroke="none"
                className="outerCircle"
                strokeWidth="0.00"
                strokeMiterlimit="10"
                d="M72.2,27.426
			c-8.423-0.003-15.25-6.827-15.253-15.253c0-8.418,6.828-15.247,15.253-15.247c8.417,0,15.247,6.827,15.247,15.244
			C87.447,20.599,80.617,27.42,72.2,27.426z"
            />
        </svg>
    );
};

export default Logo;
