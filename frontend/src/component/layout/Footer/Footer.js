import React from "react";

import logo from "../../../images/logo.png";
// import playStore from "../../../images/playstore.svg";
// import appStore from "../../../images/appstore.svg";
import RoomIcon from '@mui/icons-material/Room';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import SendIcon from '@mui/icons-material/Send';


import "./Footer.css";

const Footer =()=>{
    return (
        <footer className="footer-section">
        <div className="container">
            
                <div className="row1">
                    <div className="find-us">
                        <div className="single-cta">
                            <div className="icon"><RoomIcon fontSize="inherit"/></div>
                            <div className="cta-text">
                                <h4>Find us</h4>
                                <span>1010 Avenue, sw 54321, chandigarh</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="find-us">
                        <div className="single-cta">
                        <div className="icon"><PhoneEnabledIcon fontSize="inherit"/></div>
                            <div className="cta-text">
                                <h4>Call us</h4>
                                <span>9876543210 0</span>
                            </div>
                        </div>
                    </div>

                    
                    <div className="find-us">
                        <div className="single-cta">
                        <div className="icon"><MailOutlineIcon fontSize="inherit"/></div>
                            <div className="cta-text">
                                <h4>Mail us</h4>
                                <span>mail@info.com</span>
                            </div>
                        </div>
                    </div>
                 </div>
           
                <div className="row2">
                    
                        <div className="footer-widget">
                            <div className="footer-logo">
                                <a href="index.html"><img src={logo} className="img-fluid" alt="logo"/></a>
                            </div>
                            <div className="footer-text">
                                <p>High Quality is our first priority
                                </p>
                            </div>
                            <div className="footer-social-icon">
                                <span>Follow us</span>
                                <a href="#"><i className= "facebook-bg"><FacebookIcon fontSize="inherit"/></i></a>
                                <a href="#"><i className="twitter-bg"><TwitterIcon fontSize="inherit"/></i></a>
                                <a href="#"><i className="google-bg"><GoogleIcon fontSize="inherit"/></i></a>
                            </div>
                        </div>
                    
                        
                        <div className="footer-widget">
                            <div className="footer-widget-heading">
                                <h3>Useful Links</h3>
                            </div>
                            <ul>
                                <li><a href="#">Men</a></li>
                                <li><a href="#">Women</a></li>
                                <li><a href="#">Kids</a></li>
                                <li><a href="#">Home & Living</a></li>
                                <li><a href="#">Beauty</a></li>
                                <li><a href="#">Home</a></li>
                                <li><a href="#">Contact us</a></li>
                                <li><a href="#">Track Orders</a></li>
                                <li><a href="#">Shipping</a></li>
                                <li><a href="#">Returns</a></li>
                            </ul>
                        
                        </div>
                    
                        <div className="footer-widget">
                            <div className="footer-widget-heading">
                                <h3>Subscribe</h3>
                            </div>
                            <div className="footer-text mb-25">
                                <p>Don’t miss to subscribe to our new feeds, kindly fill the form below.</p>
                            </div>
                            <div className="subscribe-form">
                                <form action="#">
                                    <input type="text" placeholder="Email Address"/>
                                    <button><i><SendIcon fontSize="inherit"/></i></button>
                                </form>
                            </div>
                        </div>
                    
                </div>
            </div>
        
        <div className="copyright-area">         
            <div className="copyright-text">
                <p>Copyright &copy; 2022, All Right Reserved <a href="">Daljeet kaur</a></p>
            </div>
            <div className="copyright-text"></div>
        
            <div className="footer-menu">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="#">Terms</a></li>
                    <li><a href="#">Privacy</a></li>
                    <li><a href="#">Policy</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </div>   
        </div>
    </footer>
    )

};

export default Footer;