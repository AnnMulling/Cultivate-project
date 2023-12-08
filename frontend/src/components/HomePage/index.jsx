import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';

import './HomePage.css';

export  default function HomePage () {
    const user = useSelector((state) => state.session.user);
    const [ currentIndex, setCurrentIndex ] = useState(0);
    const images =  [
        {
          "src": "https://picsum.photos/seed/img1/700/700",
          "alt": "Image 1 for carousel"
        },
        {
          "src": "https://picsum.photos/seed/img2/700/700",
          "alt": "Image 2 for carousel"
        },
        {
          "src": "https://picsum.photos/seed/img3/700/700",
          "alt": "Image 3 for carousel"
        },
        {
          "src": "https://picsum.photos/seed/img4/700/700",
          "alt": "Image 4 for carousel"
        },
        {
          "src": "https://picsum.photos/seed/img5/700/700",
          "alt": "Image 5 for carousel"
        }
      ];

    const carouselInfinite = () => {
        if (currentIndex === images.length - 1) {
            return setCurrentIndex(0)
        }
        return setCurrentIndex(currentIndex + 1)
    }

    useEffect(() => {
        const interval = setInterval(() => {carouselInfinite()}, 3000);

        return () => clearInterval(interval);
    })

    return (
        <>
            <div className="homepage-main">

                <div className="about-container">
                    <div className="about-container-left">
                        <p style={{fontSize:50}}>Want to get things done?</p>
                        <p style={{fontSize:30}}>We've got you cover!</p>
                    </div>

                    <div className="carousel-container">
                    {images.map((img, idx) => {
                        return <div
                                className="slide"
                                style={{transform: `translate(-${currentIndex * 100}%)`}}
                                key={idx}>
                                <img
                                src={img.src} alt={img.alt} />
                                </div>
                    })}
                    </div>
                </div>
            </div>
        </>
    );
};
