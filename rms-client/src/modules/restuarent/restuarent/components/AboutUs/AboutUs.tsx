// restaurant/components/AboutUs.tsx
import { useState } from 'react';
import styles from '../AboutUs/AboutUs.module.css';
import Header from '../../../../core/components/Header';
import Navbar from '../HomePage/ResNavbar';

const AboutUs = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className={styles.container}>
      <Header activeTab={'restaurant-bar'} />
      <Navbar />
      <h1 className={styles.title}>About Us</h1>
      <div className={styles.grid}>
        <div className={styles.imageWrapper}>
          <img
            src="https://i.pinimg.com/564x/cc/68/29/cc6829ed9d4be09bfb38b18d121b3db2.jpg"
            alt="Our Restaurant"
            className={styles.image}
          />
        </div>
        <div className={styles.textWrapper}>
          <p className={styles.description}>
            Our restaurant and bar is located in the heart of the resort, offering stunning views of the surrounding landscape. Our menu features a range of delicious dishes, from classic favorites to innovative creations.
          </p>
          <button
            className={styles.button}
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? 'Read Less' : 'Read More'}
          </button>
          {showMore && (
            <p className={styles.moreText}>
              Our chefs use only the freshest ingredients, sourced locally whenever possible, to create dishes that are both flavorful and visually stunning. Our bar features a wide selection of craft cocktails, wine, and beer, perfect for sipping on the patio or by the fire pit.
            </p>
          )}
        </div>
      </div>
      <div className={styles.infoGrid}>
        <div className={styles.infoItem}>
          <img
            src="https://i.pinimg.com/564x/b0/f0/4a/b0f04a7fd40fb508181cd813dc8f7896.jpg"
            alt="Our Team"
            className={styles.smallImage}
          />
          <p className={styles.infoText}>Meet our talented team of chefs, bartenders, and servers.</p>
        </div>
        <div className={styles.infoItem}>
          <img
            src="https://i.pinimg.com/564x/7b/b8/e6/7bb8e65c8f07e794beae57c1b2b1f315.jpg"
            alt="Our Menu"
            className={styles.smallImage}
          />
          <p className={styles.infoText}>View our menu, featuring a range of delicious dishes and drinks.</p>
        </div>
        <div className={styles.infoItem}>
          <img
            src="https://i.pinimg.com/736x/9b/ab/8c/9bab8cbbd116aeef9f73df374ed5ae4a.jpg"
            alt="Our Events"
            className={styles.smallImage}
          />
          <p className={styles.infoText}>Check out our upcoming events, including live music and themed nights.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;