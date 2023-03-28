import styles from '../../styles/smallcard.module.scss';
import Image from "next/image";

export default function SmallCard({ id, img, location, distance }) {
    return (
        <div className={styles.small_card}>
            {/* Left */}
            <div>
                <Image src={img} alt={location} width={100} height={100} />
            </div>

            {/* Right */}
            <div>
                <h2>{location}</h2>
                <h3>{distance}</h3>
            </div>
        </div>
    )
}
