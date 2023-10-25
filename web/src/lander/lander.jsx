import './lander.css'
import Slider from './slider';
import Contact from './contact/contactinformation'
const Changehadler  = () => {
   window.location.pathname= './login'  };
const Lander = () => {
    return (
        <div className='lander'>
            <div className='navbar'>
                
                <h1>Muzammil</h1>
                <div className="navright">
                    <a href="#about">ABOUT</a>
                    <a href="#contact">CONTACT</a>
                    <a href="#Admin">ADMIN</a>
                    <button onClick={Changehadler}>Get Started</button>
                </div>
            </div>
            <div className="content">
                <div className="leftcontent">
                    <h3 id='about'>
                        Explore the World of Ideas
                        Unveiling the Secrets of Your Trusted Source for Expert Insights
                        Discover, Learn, and Share Your Home for Engaging Blog Posts
                        Navigating the Blogosphere is Your Guide
                        From Hobbyist to Pro Blogger Has You Covered
                    </h3>
                    <div className="button">
                        <button onClick={Changehadler}>Get Started</button>
                    </div>
                </div>
                <div className="rightslider">
                    <Slider />
                </div>
            </div>

<div id='contact' className="contact">
<Contact/>

</div>













        </div>
    )




}


export default Lander;