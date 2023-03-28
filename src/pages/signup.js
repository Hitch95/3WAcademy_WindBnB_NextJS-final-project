import styles from "../../styles/signup.module.scss";
import Image from "next/image";
import { MenuIcon, UserCircleIcon } from "@heroicons/react/solid";
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

                <div className="user-type-selection">
                    <input type="radio"
                        id="guest"
                        name="user-type"
                        value="guest"
                        defaultChecked={userType === "guest"}
                        onClick={handleGuestClick} />

                    <label htmlFor="guest">I am a Guest</label>

                    <input type="radio"
                        id="owner"
                        name="user-type" value="owner"
                        defaultChecked={userType === "owner"}
                        onClick={handleOwnerClick} />

                    <label htmlFor="owner">I am an Owner</label>
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