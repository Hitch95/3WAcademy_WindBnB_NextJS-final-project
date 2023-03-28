import styles from "../../styles/connexion.module.scss";
import { useRouter } from "next/router"

export default function Connexion () {
    const router = useRouter();

    const handleSignUpClick = (e) => {
        e.preventDefault();
        router.push("/signup");
    }

    const handleLoginClick = (e) => {
        e.preventDefault();
        router.push("/login");
    }

    return (
        <div className={styles.connexion}>
            <div>
                <a href="" onClick={handleSignUpClick}>Inscription</a>
            </div>
            <div>
                <a href="" onClick={handleLoginClick}>Connexion</a>
            </div>
        </div>
    )
}