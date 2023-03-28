import styles from "../../styles/login.module.scss";
import Image from "next/image";
import { MenuIcon, UserCircleIcon } from "@heroicons/react/solid";
import { useState } from "react";
import Link from 'next/link';
import Connexion from "../components/Connexion";
import Footer from "../components/Footer";


export default function Login() {

    const [showConnexion, setShowConnection] = useState(false);

    const toggleConnexion = () => {
        setShowConnection(!showConnexion)
    };

    return (
        <div className={styles.login}>
            <div>
                <Link href="/" target="noreferrer">
                    <Image src="/images/logo.png" alt="logo" width={42} height={42} />
                </ Link>
                <div className={styles.sign_log_container} onClick={toggleConnexion}>
                    <MenuIcon className="" />
                    <UserCircleIcon className="" />
                </div>
                {showConnexion && <Connexion />}
            </div>
            <main>
                <form>
                    <div>
                        <input type="email"
                            name="" required />
                        <label>Email address</label>
                    </div>

                    <div>

                        <input type="password"
                            name="" required />
                        <label>Password</label>
                    </div>

                    <a href="#">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Submit
                    </a>

                </form>
            </main>
            <Footer />
        </div>
    )
}