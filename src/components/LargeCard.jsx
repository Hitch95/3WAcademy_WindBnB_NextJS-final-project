import styles from '../../styles/largecard.module.scss';
import Image from "next/image";

export default function LargeCard ({ img, title, description, buttonText }) {
    return (
        <div>
            <section className="relative py-">
                <div className="relative h-96 min-w-[300px]">
                    <Image src="" alt="" /> 

                </div>
            </section>
        </div>
    )
}