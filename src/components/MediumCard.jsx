import styles from '../../styles/mediumcard.module.scss';
import Image from "next/image";

export default function MediumCard ({ id, img, title }) {
    return (
        <div className={styles.medium_card}>
            <div className="">
                <Image src={img} alt="" width={100} height={100} />
            </div>
            <h3 className="text-2xl mt-3">{title}</h3>
        </div>
    )
}