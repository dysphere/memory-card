import metImages from './assets/images.js'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles.scss'

function ButtonTemplate({name, src, onClick, imid}) {
return (<>
<Button onClick={onClick} className="aspect-ratio" variant="classy">
    <img src={src} className={`item-${imid} img-fluid`} />
    <p>{name}</p>
</Button></>)
}

export default function MemoryCard() {
    const [images, setImages] = useState(null);
    const [firstThird, setFirstThird] = useState([]);
    const [secondThird, setSecondThird] = useState([]);
    const [lastThird, setLastThird] = useState([]);
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const prevImagesRef = useRef(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const artImages = await metImages();
                setImages(artImages)
                prevImagesRef.current = artImages;
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

    useEffect(() => {
        if (images && images.length > 0) {
            let shuffled = [...images];
            for (let i = shuffled.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            if (JSON.stringify(shuffled) != JSON.stringify(prevImagesRef.current)) {
                setImages(shuffled);
                prevImagesRef.current = shuffled;
            }
        }
    }, [score]);

    function shuffle(imageid) {
        setImages(prevImages => {
            const clickCheck = prevImages.some(image => image.id === imageid && image.clickedAlready)
            const updatedImages = prevImages.map(image => {
                if (imageid === image.id && !clickCheck) {
                    setScore(score + 1);
                    return {...image, clickedAlready: !image.clickedAlready};
                }
                else if (imageid === image.id && clickCheck) {
                    if (score > bestScore) {
                        setBestScore(score);
                    }
                    setScore(0);
                    return {...image, clickedAlready: false};
                }
                else {
                    return image;
                }
            });
            prevImagesRef.current = updatedImages;
            return updatedImages;
        });
    }

    return (
        <div>
    {images ?
    <Container fluid>
        <Container fluid className="d-flex justify-content-between">
            <div>
                <h1>Art Memory Game</h1>
                <p>Click on different images of Cezanne's art to get points but beware, clicking on the same one twice resets your game</p>
            </div>
            <div className="score">
                <p>Score: {score}</p>
                <p>Best Score: {bestScore}</p>
            </div>
        </Container>
      <Container fluid className="">
        <Row className="">
          {firstThird.map((image) => (
            <Col key={image.id} xs={12} md={3}>
              <ButtonTemplate src={image.objectURL} name={image.objectName} onClick={()=>shuffle(image.id)} imid={image.id}/>
            </Col>
          ))}
          </Row>
          <Row>
          {secondThird.map((image) => (
            <Col key={image.id} xs={12} md={3}> 
              <ButtonTemplate src={image.objectURL} name={image.objectName} onClick={()=>shuffle(image.id)} imid={image.id}/>
            </Col>
          ))}
          </Row>
          <Row>
          {lastThird.map((image) => (
            <Col key={image.id} xs={12} md={3}> 
              <ButtonTemplate src={image.objectURL} name={image.objectName} onClick={()=>shuffle(image.id)} imid={image.id}/>
            </Col>
          ))}
          </Row>
      </Container> 
      </Container>
    : <div>Loading...</div>}
  </div>
    )
}