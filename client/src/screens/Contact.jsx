import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../assets/contact-img.svg";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import axios from "axios";
import Qr from "../components/Qr";
 const Contact = () => {
  const [formData, setFormData] = useState({
    fname:"",
    lname:"",
    from: "",
    phone: "",
    text: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const res = await axios.post(
        "http://localhost:4000/api/email/",
        formData
      );
      console.log(res.data);
      setFormData({
        fname:"",
        lname:"",
        from: "",
        phone: "",
        text: "",
      });
      alert("Your message has been sent!");
    } catch (err) {
      console.error(err);
    }
  };
  

  return (
    <>
    <section className="contact mt-5" id="connect">
      
          
                <h2>Get In Touch</h2>
                <form onSubmit={handleSubmit}>
                  
                    <input
          type="text"
          name="fname"
          id="fname"
          value={formData.fname}
          placeholder="First Name"
          onChange={handleChange}
          required
        />
                    <input
          type="text"
          name="lname"
          id="lname"
          value={formData.lname}
          onChange={handleChange}
          placeholder="Last Name"
          required
        />
                  
                    <input
          type="email"
          name="from"
          id="from"
          value={formData.from}
          onChange={handleChange}
          placeholder="Email"
          required
        />                    
                    <input
          type="text"
          name="phone"
          id="phone"
          value={formData.phone}
          placeholder="Phone Number"
          onChange={handleChange}
          required
        />                    
                    <textarea
          name="text"
          id="text"
          placeholder="Message"
          value={formData.text}
          onChange={handleChange}
          required
        />                      <button type="submit">Send</button>
                  

                </form>
              
    </section>
    <div>
      <Qr/>
    </div>
    </>
  )
}
export default Contact