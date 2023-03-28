import styles from '../../styles/search.module.scss';

import { format } from "date-fns";
import { useRouter } from "next/dist/client/router"

import Header from "../components/Header";
import Footer from "../components/Footer";
import InfoCard from "../components/InfoCard";

export default function Search({ searchResults }) {

    const router = useRouter();
    const { location, startDate, endDate, numOfGuests } = router.query;

    console.log("startDate:", startDate);
    console.log("endDate:", endDate);

    const formattedStartDate = startDate ? format(new Date(startDate), "dd MMMM yy") : "";
    const formattedEndDate = startDate ? format(new Date(endDate), "dd MMMM yy") : "";

    const range = `${formattedStartDate} - ${formattedEndDate}`;

    return (
        <div className={styles.search}>
            <Header
                searchInput={location}
                startDate={new Date(startDate)}
                endDate={new Date(endDate)}
                numOfGuests={numOfGuests}

                placeholder={`${location}`}
            />
            <main>
                <section>
                    <p>8 Stays - {range} for {numOfGuests} guests</p>
                    <h1>Stays in {location}</h1>

                    <div>
                        <p>Cancellation Flexibility</p>
                        <p>Type of Place</p>
                        <p>Price</p>
                        <p>Rooms and Beds</p>
                        <p>More filters</p>
                    </div>

                    <div className='put-flex-row'>
                        {searchResults.map(({ id, file_name, home_type, room_type, total_occupancy, total_bedrooms, summary, city, price }) => (
                            <InfoCard
                                key={id}
                                imageCard={file_name}
                                homeType={home_type}
                                roomType={room_type}
                                totalOccupancy={total_occupancy}
                                totalBedrooms={total_bedrooms}
                                summary={summary}
                                city={city}
                                price={price}
                            />
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}

export async function getStaticProps() {
    const res = await fetch('http://localhost:3000/api/rooms');
    const searchResults = await res.json();
    console.log(searchResults)
    // convert to JSON
    const rooms = searchResults.rooms;
    return {
        props: { searchResults: rooms },
    };
}
