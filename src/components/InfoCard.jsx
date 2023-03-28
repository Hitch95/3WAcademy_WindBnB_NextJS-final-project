import styles from '../../styles/infocard.module.scss';
import Image from "next/image";
import { HeartIcon, StarIcon } from '@heroicons/react/solid';


export default function InfoCard ({ id, imageCard, homeType, roomType, totalOccupancy, totalBedrooms, summary, city, price }) {

    return (
        <div className={styles.infocard}>
            <div>
                <Image src={imageCard} alt="" width={416} height={395} />
                <HeartIcon />
            </div>

            <div>
                <div>
                    <p>{homeType}</p>
                    <p>({roomType})</p>
                    <p>{city}</p>
                    <p><StarIcon /> 4,85</p>
                </div>

                <div>
                    <p>{summary}</p>
                </div>

                <div>
                    <p>{totalOccupancy} guests</p>
                    <p>{totalBedrooms} bed</p>
                    <p>{totalBedrooms} bathroom</p>
                </div>
                <div>
                    <p>$ {price} <span>/ night</span></p>
                </div>
            </div>
        </div>
    )
}