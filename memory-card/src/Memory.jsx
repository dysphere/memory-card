import metImages from './assets/images.js'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useState, useEffect } from 'react';
import './assets/styles.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

function ButtonTemplate({name, src, onClick}) {
return (<>
<Button onClick={onClick}>
    <img src={src} className="img-fluid"/>
    <p>{name}</p>
</Button></>)
}

export default function MemoryCard() {
    const [images, setImages] = useState(null);
    const [firstThird, setFirstThird] = useState([]);
    const [secondThird, setSecondThird] = useState([]);
    const [lastThird, setLastThird] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const artImages = await metImages();
                setImages(artImages)
            }
            catch (error) {
                console.error("Failed to fetch images: ", error)
            }
        };
        fetchImages();
    }, []);

    useEffect(() => {
        if (images) {
        setFirstThird(images.slice(0, 4));
        setSecondThird(images.slice(4, 8));
        setLastThird(images.slice(8, 13));
        }

    }, [images]);

    function shuffle(array) {
        console.log("hi")
    }

    return (
        <div>
    {images ? 
      <Container fluid className="">
        <Row className="">
          {firstThird.map((image) => (
            <Col key={image.id} xs={12} md={3}>
              <ButtonTemplate src={image.objectURL} name={image.objectName} onClick={shuffle}/>
            </Col>
          ))}
          </Row>
          <Row>
          {secondThird.map((image) => (
            <Col key={image.id} xs={12} md={3}> 
              <ButtonTemplate src={image.objectURL} name={image.objectName} onClick={shuffle}/>
            </Col>
          ))}
          </Row>
          <Row>
          {lastThird.map((image) => (
            <Col key={image.id} xs={12} md={3}> 
              <ButtonTemplate src={image.objectURL} name={image.objectName} onClick={shuffle}/>
            </Col>
          ))}
          </Row>
      </Container> 
    : <div>Loading...</div>}
  </div>
    )
}