import Image from 'next/image'
import Head from "next/head";

import React, { useState, useEffect } from 'react';

import styles from '../../styles/styles.module.scss';

import Header from "../components/Header";
import Banner from "../components/Banner";
import SmallCard from '../components/SmallCard';
import MediumCard from '../components/MediumCard';
import Footer from '../components/Footer';

import illustration from "../banner_cities.json";
import illustrationTwo from "../section_two.json";

export default function Home() {
  const [illustrationData, setIllustrationData] = useState([]);

  useEffect(() => {
    setIllustrationData(illustration);
  }, []);

  return (
    <>
      <Head>
        <title>My Windbnb React App</title>
        <link rel="icon" type="image/svg+xml" href="./images/logo.svg" priority />
      </Head>
      <div className={styles.home}>
        <Header />
        <Banner />
        <main>
          <section>
            <h2>Explore nearby</h2>

            <div>
              {illustrationData && illustrationData.map(({ id, img, distance, location }) => (
                <SmallCard
                  key={id}
                  img={img}
                  distance={distance}
                  location={location} />
              ))}
            </div>
          </section>
          <section>
            <h2>Live Anywhere</h2>
            <div>
              {illustrationTwo && illustrationTwo.map(({ id, img, title }) => (
                <MediumCard
                  key={id}
                  img={img}
                  title={title} />
              ))}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}