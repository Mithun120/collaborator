
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

// import colorSharp from "../assets/img/color-sharp.png"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
const Domain = () => {
  const [domainProfiles, setdomainProfiles] = useState([]);
  // const {setDoption, setDomain}=props
  // fetch
  useEffect(() => {
    axios
      .get('http://localhost:4000/dapi/domainget')
      .then((res) => {
        const domainProfiles = res.data;
        setdomainProfiles(domainProfiles);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <section className="skill" id="skills">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="skill-bx wow zoomIn">
                        <h2>Domains</h2>
                        <p>We are Currently working at ...<br></br> </p>
                        <Carousel responsive={responsive} infinite={true} className="owl-carousel owl-theme skill-slider">
                          {domainProfiles.map((d)=>(
                            <div  className="item" key={d._id}>
                            <img src={d.domainImg} height="10px"  alt="Image" />
                            <h5>{d.title}</h5>
                            </div>
                          ))}
                            {/* <div className="item">
                                <img src={meter1} alt="Image" />
                                <h5>Web Development</h5>
                            </div>
                            <div className="item">
                                <img src={meter2} alt="Image" />
                                <h5>Brand Identity</h5>
                            </div>
                            <div className="item">
                                <img src={meter3} alt="Image" />
                                <h5>Logo Design</h5>
                            </div>
                            <div className="item">
                                <img src={meter1} alt="Image" />
                                <h5>Web Development</h5>
                            </div> */}
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
        {/* <img className="background-image-left" src={colorSharp} alt="Image" /> */}
    </section>
  )
}
export default Domain