import React, { useEffect, useState } from 'react';
import {  useSelector } from 'react-redux';
import { Link } from "react-router-dom";

import github from '../../assets/github.png'
import linkedIn from '../../assets/linkedIn.png'

import './Footer.css';


export default function Footer () {
    return (
        <Footer className="footer">
                <div className="footer-content">
                    <span>Privacy Policy</span>
                    <span>Copyright ©2024 Cultivate</span>
                </div>
                <div className="footer-social-media">
                    <span>Created by Ann Mulling</span>
                    <span><a href= "https://github.com/AnnMulling" target="_blank"><img src={github} alt="github-logo"/></a></span>
                    <span><a href="https://www.linkedin.com/in/primpraow-m-653708227/" target="_blank" ><img src={linkedIn} alt="linkedIn-logo"/></a></span>
                </div>
        </Footer>
    );
}
