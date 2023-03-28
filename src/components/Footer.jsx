import styles from '../../styles/footer.module.scss';
import Image from "next/image";
import { GlobeAltIcon } from "@heroicons/react/solid";

import facebookImg from "../../public/images/facebook.svg";
import instaImg from "../../public/images/instagram.svg";
import tweeterImg from "../../public/images/twitter.svg";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div>
                <h5>About</h5>
                <a href="#">How Windbnb works</a>
                <a href="#">Newsroom</a>
                <a href="#">Windbnb 2023</a>
                <a href="#">Investors</a>
                <a href="#">Founders Letter</a>
                <a href="#">Careers</a>
            </div>

            <div>
                <h5>Community</h5>
                <a href="#">Accessibility</a>
                <a href="#">Against Discrimination</a>
                <a href="#">Guest Referrals</a>
                <a href="#">Gift cards</a>
            </div>

            <div>
                <h5>Host</h5>
                <a href="#">Host your home (owner or professionnal only)</a>
                <a href="#">Host an Experience</a>
                <a href="#">WindCover</a>
                <a href="#">Responsible hosting</a>
                <a href="#">Resource Center</a>
                <a href="#">Community Center</a>
            </div>

            <div>
                <h5>Support</h5>
                <a href="#">Our COVID-19 Response</a>
                <a href="#">Help Center</a>
                <a href="#">Cancellation options</a>
                <a href="#">Neighborhood Support</a>
            </div>

            <div>
                <div>
                    <ul>
                        <li>
                            <span><GlobeAltIcon /></span>
                            <span>English (US)</span>
                            <span>$ USD</span>
                        </li>
                        <li>
                            <a>
                                <Image src={facebookImg} alt="" width={24} height={24} />
                            </a>
                            <a>
                                <Image src={instaImg} alt="" width={24} height={24} />
                            </a>
                            <a>
                                <Image src={tweeterImg} alt="" width={24} height={24} />
                            </a>
                        </li>
                    </ul>

                    <span>© 2023 Windbnb, Inc.</span>
                    <span>| by <a href="https://github.com/Hitch95">Hitch95</a> |</span>
                    <ul>
                        <li>Privacy</li>
                        <li>Terms and conditions</li>
                        <li>Legal Notice</li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}