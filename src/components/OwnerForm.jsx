


export default function OwnerForm() {



    return (
        <form id="owner-form">
            {/* Form for the Owners */}
            <div>
                <input type="text"
                    name="name" required />
                <label htmlFor="name">Hostel Name</label>
            </div>
            <div>
                <input type="number"
                    name="" required />
                <label htmlFor="">Address Number</label>
            </div>
            <div>
                <input type="Text"
                    name="" required />
                <label htmlFor="">Address</label>
            </div>
            <div>
                <input type="text"
                    name="city" required />
                <label htmlFor="city">City</label>
            </div>
            <div>
                <input type="number"
                    name="postalCode" required />
                <label htmlFor="zipCode">Zip Code</label>
            </div>
            <div>
                <input type="email"
                    name="email" required />
                <label htmlFor="email">Email</label>
            </div>
            <div>
                <input type="tel"
                    name="phone number" required />
                <label htmlFor="phone number">Phone Number</label>
            </div>
            <div>
                <input type="password"
                    name="password" required />
                <label htmlFor="password">Password</label>
            </div>
            <div>
                <input type="tel"
                    name="kBis" required />
                <label htmlFor="kBis">K-Bis registration number</label>
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