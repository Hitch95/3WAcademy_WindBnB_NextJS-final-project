
import { useState } from "react";

export default function GuestForm() {

    const [values, setValues] = useState({
        firstname: "",
        lastname: "",
        birthdate: "",
        email: "",
        password: "",
        phone: ""
    })

    const [error, setError] = useState({})

    const handleChange = (e) => {
        setValues({...values, [e.target.firstname]: e.target.values})
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setError(validation(values))
    }

    return (
        <form id="guest-form" onSubmit={handleSubmit}>
            {/* Form for the Guests */}
            <div>
                <input type="text" defaultValue={values.firstname}
                    pattern="^[A-Z][a-z]+(-[A-Z][a-z]+)?$" 
                    minLength="2" maxLength="30"
                    name="firstname" required />
                <label htmlFor="firstname">Firstname</label>
            </div>

            <div>
                <input type="text" defaultValue={values.lastname}
                    pattern="^[A-Z][a-z]+(-[A-Z][a-z]+)?$"
                    name="lastname" required />
                <label htmlFor="lastname">Lastname</label>
            </div>

            <div className="birthdate">
                <input type="date" defaultValue={values.birthdate}
                    pattern="[0-3][0-9]/[0-1][0-9]/[0-9]{4}"
                    min="01/01/1900" max="NOW()"
                    name="birthdate" required />
                <label htmlFor="birthdate"></label>
            </div>

            <div>
                <input type="email" defaultValue={values.email}
                pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                    name="" required />
                <label htmlFor="email">Email address</label>
            </div>

            <div>
                <input type="password" defaultValue={values.password}
                pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':\\|,.<>/?]).{8,50}$"
                    name="" required />
                <label htmlFor="password">Password</label>
            </div>

            <div>
                <input type="tel" pattern="^0[0-9]{9}" defaultValue={values.phone}
                    name="phone number" required />
                <label htmlFor="phone number">Phone Number</label>
            </div>

            <div className="profile-pitcure">
                <input type="file"
                    name="profilePicture" required />
                <label htmlFor="profilePicture"></label>
            </div>

            <a href="#">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Submit
            </a>
        </form>
    )
}