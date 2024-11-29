import { useState } from 'react';
import styles from './ImageCarousel.module.css'
import Carousel from 'react-bootstrap/Carousel';
import IconChevronLeft from "../icons/IconChevronLeft";
import IconChevronRight from "../icons/IconChevronRight";

function ImageCarousel({images}) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel 
        activeIndex={index} 
        onSelect={handleSelect} 
        className={styles.carousel}
        prevIcon={<IconChevronLeft color="#fff"/>}
        nextIcon={<IconChevronRight color="#fff"/>}
    >
        {images.map((image, index) => {
            return (
                <Carousel.Item key={index} className={styles['carousel-item']}>
                    <img src={image} alt='img' className={styles.img}></img>
                </Carousel.Item>
            );
        })}
    </Carousel>
  );
}

export default ImageCarousel;