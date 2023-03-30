import { ValidationForOwner } from "./Validation";
import styles from "../../styles/signup.module.scss";
import { useState } from "react";

export default function OwnerForm() {

    const [values, setValues] = useState({
        company_name: "",
        address_number: "",
        address_name: "",
        city_name: "",
        zip_code: "",
        email: "",
        password: "",
        phone: null,
        kbis_number: null
    })

    const [ownerInputError, setError] = useState({});

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = ValidationForOwner(values);
        console.log("validationErrors:", validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                const res = await fetch("/api/owner_sign-up", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(values)
                });

                console.log("Form submitted successfully!", values);
                const data = await res.json();
                console.log(data);
                return data;

                // We reset the form if it submitted successfully
                /*setValues({
                    company_name: "",
                    address_number: "",
                    address_name: "",
                    city_name: "",
                    zip_code: "",
                    email: "",
                    password: "",
                    phone: null,
                    kbis_number: null
                }); */
            }
            catch (error) {
                console.error("Error", error);
            }
        } else {
            setError(validationErrors);
        }
    };

    console.log("values:", values);
    console.log("errors:", ownerInputError);

    return (
        <form id="owner-form" onSubmit={handleSubmit}
            action="/api/owner_sign-up" method="POST">
            {/* Form for the Owners */}
            <div>
                <input type="text" defaultValue={values.company_name}
                    onChange={handleChange}
                    pattern="^[A-Z][a-z]+(-[A-Z][a-z]+)?$"
                    minLength="2" maxLength="30"
                    title="The name of your company must be more than 2 characters and less than 30"
                    name="company_name" required />
                <label htmlFor="company_name">Hostel Name</label>
                {ownerInputError.company_name && <span className={styles.error}>{ownerInputError.company_name}</span>}
            </div>

            <div>
                <input type="number" defaultValue={values.address_number}
                    onChange={handleChange} pattern="^(0|[1-9]\d{0,4})$"
                    minLength="1" maxLength="5"
                    name="address_number" required />
                <label htmlFor="address_number">Address Number</label>
                {ownerInputError.address_number && <span className={styles.error}>{ownerInputError.address_number}</span>}
            </div>

            <div>
                <input type="text" defaultValue={values.address_name}
                    name="address_name" required onChange={handleChange}
                    pattern="^[a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ\s'-]*\d{0,1}$" />
                <label htmlFor="address_name">Address</label>
                {ownerInputError.address_name && <span className={styles.error}>{ownerInputError.address_name}</span>}
            </div>

            <div>
                <input type="text" defaultValue={values.city_name}
                    onChange={handleChange}
                    pattern="^[A-Z][a-zà-ÿ]+([ '-][a-zà-ÿ]+)*$"
                    name="city_name" required />
                <label htmlFor="city_name">City</label>
                {ownerInputError.city_name && <span className={styles.error}>{ownerInputError.city_name}</span>}
            </div>

            <div>
                <input type="number" defaultValue={values.zip_code}
                    onChange={handleChange} pattern="^\d{5}$"
                    minLength="5"
                    name="zip_code" required />
                <label htmlFor="zip_code">Zip Code</label>
                {ownerInputError.zip_code && <span className={styles.error}>{ownerInputError.zip_code}</span>}
            </div>

            <div>
                <input type="email" defaultValue={values.email}
                    onChange={handleChange}
                    pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                    name="email" required />
                <label htmlFor="email">Email address</label>
                {ownerInputError.email && <span className={styles.error}>{ownerInputError.email}</span>}
            </div>

            <div>
                <input type="password" defaultValue={values.password}
                    onChange={handleChange} minLength="8"
                    title="The password must be at least 8 characters long, contain at least one number, one lowercase letter, one uppercase letter and one special character."
                    pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':\\|,.<>/?]).{8,50}$"
                    name="password" required />
                <label htmlFor="password">Password</label>
                {ownerInputError.password && <span className={styles.error}>{ownerInputError.password}</span>}
            </div>

            <div>
                <input type="tel" pattern="^0[0-9]{9}" inputMode="numeric"
                    title="Number need to begin with 0 and got ten digits"
                    defaultValue={values.phone} onChange={handleChange}
                    name="phone" required />
                <label htmlFor="phone">Phone Number</label>
                {ownerInputError.phone && <span className={styles.error}>{ownerInputError.phone}</span>}
            </div>

            <div>
                <input type="tel" defaultValue={values.kbis_number}
                    onChange={handleChange}
                    pattern="^\d{9}$" inputMode="numeric"
                    name="kbis_number" required />
                <label htmlFor="kbis_number">K-Bis registration number</label>
                {ownerInputError.kbis_number && <span className={styles.error}>{ownerInputError.kbis_number}</span>}
            </div>

            <div className="profile-pitcure">
                <input type="file"
                    name="profilePicture" required />
                <label htmlFor="profilePicture"></label>
            </div>

            <a href="#" onClick={handleSubmit}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Submit
            </a>
        </form>
    )
}