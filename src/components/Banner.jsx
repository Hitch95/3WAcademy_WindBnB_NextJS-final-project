import styles from '../../styles/banner.module.scss'
import Image from "next/image";

export default function Banner () {
    return (
        <div className={styles.banner}>
            <Image src="https://i.pinimg.com/originals/f5/59/b0/f559b049a464e6f7f8e78648b247d69b.png" alt="" width={500} height={500} />
        </div>
    )
}