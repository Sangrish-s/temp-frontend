import React from 'react';
import Lottie from 'react-lottie';
import animationData from './animation.json';

const ScanLoader = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div style={{width: "100%", height: "calc(100% - 5px)", marginLeft: "auto", marginRight: "auto", position: "absolute", zIndex: 10, opacity: "50%"}}>
            <Lottie options={defaultOptions} />
        </div>
    );
};

export default ScanLoader;