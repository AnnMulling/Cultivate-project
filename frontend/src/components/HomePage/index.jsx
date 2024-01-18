import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import Footer from '../Footer';

//img
import github from '../../assets/github.png'
import linkedIn from '../../assets/linkedIn.png'

import './HomePage.css';

export default function HomePage() {
    const user = useSelector((state) => state.session.user);
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [
        {
            "src": "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=2948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "alt": "Image 1 for carousel"
        },
        {
            "src": "https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=2839&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "alt": "Image 2 for carousel"
        },
        {
            "src": "https://images.unsplash.com/photo-1586282023692-6bfbd629e85d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "alt": "Image 3 for carousel"
        },
        {
            "src": "https://images.unsplash.com/photo-1642543492457-39a2ce63bb59?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D0",
            "alt": "Image 4 for carousel"
        },
        {
            "src": "https://images.unsplash.com/photo-1634245482394-1bcf5ccffcc0?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
        const interval = setInterval(() => { carouselInfinite() }, 3000);

        return () => clearInterval(interval);
    })

    return (

        <div className="homepage-main">
            <div className="about-container">
                <div className="about-container-left">
                    <p style={{ fontSize: 50, fontWeight: 800 }}>Want to get things done?</p>
                    <p style={{ fontSize: 30 }}>We've got you covered!</p>
                    {!user && (
                    <Link to="/signup" style={{ textDecoration: 'none' }}>
                        <div className="home-signup-btn">
                            Signup it's Free!
                        </div>
                    </Link>)}

                </div>

                <div className="carousel-container">
                    {images.map((img, idx) => {
                        return <div
                            className="slide"
                            style={{ transform: `translate(-${currentIndex * 100}%)` }}
                            key={idx}>
                            <img
                                src={img.src} alt={img.alt} />
                        </div>
                    })}
                </div>
            </div>
            <div className="features-container">
                <div className="feature-heading">
                    <p style={{ fontSize: 50, fontWeight: 800 }}>Our Special Features</p>
                </div>
                <div className="feature-card-container">
                    <div className="feature-card">
                        <i className="fa-solid fa-users"></i>
                        <div className="feature-detail">
                            <p>User Friendly</p>
                            Easy to use for people who are either beginner or professional
                        </div>
                    </div>
                    <div className="feature-card">
                        <i className="fa-solid fa-shield-heart"></i>
                        <div className="feature-detail">
                            <p>Trusted Platform</p>
                            <p>Offical site that is trusted for security</p>
                        </div>
                    </div>
                    <div className="feature-card">
                        <i className="fa-solid fa-list-check"></i>
                        <div className="feature-detail">
                            <p>Flexibility</p>
                            <p>Can be opend on all existing devices</p>
                        </div>
                    </div>
                    <div className="feature-card">
                        <i className="fa-solid fa-sack-xmark"></i>
                        <div className="feature-detail">
                            <p>100% Free</p>
                            <p>Completely free without any hidden charges, for the basic plan</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="empty-box">

            </div>
            <Footer />
        </div>


    );
};
