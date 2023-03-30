import styles from "../../styles/signup.module.scss";
import Image from "next/image";
import { MenuIcon, UserCircleIcon, CheckIcon, UserIcon, HomeIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import Link from 'next/link';
import Connexion from "../components/Connexion";
import Footer from "../components/Footer";

import GuestForm from "@/components/GuestForm";
import OwnerForm from "@/components/OwnerForm";

export default function SignUp() {

    const [showConnexion, setShowConnection] = useState(false);
    const [userType, setUserType] = useState("guest");

    const toggleConnexion = () => {
        setShowConnection(!showConnexion)
    };

    const handleGuestClick = () => {
        setUserType("guest");
    };

    const handleOwnerClick = () => {
        setUserType("owner");
    };

    return (
        <div className={styles.signup}>
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

                <div className={styles.user_type_selection}>
                    <div>
                        <label htmlFor="guest">
                            <input type="radio"
                                id="guest"
                                name="user-type"
                                value="guest"
                                defaultChecked={userType === "guest"}
                                onClick={handleGuestClick} />
                            <span>
                                <CheckIcon />
                                <div>
                                    <UserIcon className={styles.svg} />
                                    <h3>I am a guest</h3>
                                </div>
                            </span>
                        </label>
                    </div>


                    <div>
                        <label htmlFor="owner">
                            <input type="radio"
                                id="owner"
                                name="user-type"
                                value="owner"
                                defaultChecked={userType === "owner"}
                                onClick={handleOwnerClick} />
                            <span>
                                <CheckIcon />
                                <div>
                                    <HomeIcon className={styles.svg} />
                                    <h3>I am an owner</h3>
                                </div>
                            </span>
                        </label>
                    </div>
                </div>
                {userType === "guest" ? (<GuestForm />)
                    : userType === "owner" ? (<OwnerForm />)
                        : null
                }
            </main>
            <Footer />
        </div>
    )
}