import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';



//Bootstrap Carousel to display pictures of the listing.
export function ControlledCarousel(props) {

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    //Maps array of pictures into Carousel Items
    let carouselItems
    if (props.picturesRecieved) {
        carouselItems = props.pictures.photos.map((value, index) => {
            let img = value.href;
            //Replaces low res image links provided from API with higher quality links.    
            let highResImg = img.replace('x.jpg', 'od-w1024_h768.jpg');
            return <Carousel.Item key={index}>
                <img
                    className="d-block w-100"
                    src={highResImg}
                    alt="Third slide" />
            </Carousel.Item>
        });
    }

    return (
        <Carousel activeIndex={index} id="myCarousel" onSelect={handleSelect}>
            {carouselItems}
        </Carousel>
    );
}