import { ValidationForGuest } from "./Validation";
import styles from "../../styles/signup.module.scss";
import { useState } from "react";

export default function GuestForm() {

    const [values, setValues] = useState({
        firstname: "",
        lastname: "",
        birthdate: "",
        email: "",
        password: "",
        phone: null
    })

    const [errors, setError] = useState({});

    const handleChange = (e) => {
        setValues({ ...values,
        [e.target.name]: e.target.value,
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = ValidationForGuest(values);
        console.log("validationErrors:", validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                const res = await fetch("/api/guest_sign-up", {
                    method: "POST",
                    headers: {
                        "Content-Type" : "application/json"
                    },
                    body: JSON.stringify(values)
                });

                console.log("Form submitted successfully!", values);
                const data = await res.json();
                console.log(data);
                return data;

                // We reset the form if it submitted successfully
                /*setValues({
                    firstname: "",
                    lastname: "",
                    birthdate: "",
                    email: "",
                    password: "",
                    phone: null
                });*/
            }
            catch (error) {
                console.error("Error", error);
            }
        } else {
            setError(validationErrors);
        }     
    };

    console.log("values:", values);
    console.log("errors:", errors);

    return (
        <form id="guest-form" onSubmit={handleSubmit}
            action="/api/guest_sign-up" method="POST">
            {/* Form for the Guests */}
            <div>
                <input type="text" defaultValue={values.firstname}
                    onChange={handleChange}
                    pattern="^[A-Z][a-z]+(-[A-Z][a-z]+)?$"
                    minLength="2" maxLength="30"
                    name="firstname" required />
                <label htmlFor="firstname">Firstname</label>
                {errors.firstname && <span className={styles.error}>{errors.firstname}</span>}
            </div>

            <div>
                <input type="text" defaultValue={values.lastname}
                    onChange={handleChange}
                    pattern="^[A-Z][a-z]+(-[A-Z][a-z]+)?$"
                    minLength="2" maxLength="30"
                    name="lastname" required />
                <label htmlFor="lastname">Lastname</label>
                {errors.lastname && <span className={styles.error}>{errors.lastname}</span>}
            </div>

            <div className="birthdate">
                <input type="date" defaultValue={values.birthdate}
                    onChange={handleChange}
                    pattern="[0-3][0-9]/[0-1][0-9]/[0-9]{4}"
                    min="01/01/1900" max="NOW()"
                    name="birthdate" required />
                <label htmlFor="birthdate"></label>
            </div>

            <div>
                <input type="email" defaultValue={values.email}
                    onChange={handleChange}
                    pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                    name="email" required />
                <label htmlFor="email">Email address</label>
                {errors.email && <span className={styles.error}>{errors.email}</span>}
            </div>

            <div>
                <input type="password" defaultValue={values.password}
                    onChange={handleChange} minLength="8"
                    title="The password must be at least 8 characters long, contain at least one number, one lowercase letter, one uppercase letter and one special character."
                    pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':\\|,.<>/?]).{8,50}$"
                    name="password" required />
                <label htmlFor="password">Password</label>
                {errors.password && <span className={styles.error}>{errors.password}</span>}
            </div>

            <div>
                <input type="tel" pattern="^0[0-9]{9}"
                    title="Number need to begin with 0 and got ten digits"
                    defaultValue={values.phone} onChange={handleChange}
                    name="phone" required />
                <label htmlFor="phone">Phone Number</label>
                {errors.phone && <span className={styles.error}>{errors.phone}</span>}
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