import React from 'react'
// import "../css/qr.css"
import qr from "../assets/QRCODE.png"
import { Container, Row, Col} from 'react-bootstrap';

 const Qr = () => {
  return (
    <Container>
        <Row className='mt-5'>
            <Col xs={12}md={6}>
            <img src={qr} style={{width:"300px",padding:"0px",position:"relative",left:"300px"}} className='qr'></img>
            </Col>
            <Col xs={12} md={6} className='mt-5'>
                <div className='location'>
            <h1> View Our Location </h1>
            <p> Use this Qr to Locate us and to view our company </p>
            </div>
            </Col>
            
        </Row>
    </Container>
  );
}
export default Qr