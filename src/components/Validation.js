

export function ValidationForGuest(values) {
    let errors = {};

    if (!values.firstname) {
        errors.firstname = "Firstname Required";
    }
    else if (values.firstname.length < 2 || values.firstname.length > 30) {
        errors.firstname = "Firstname must be more than 2 characters and less than 30";
    }

    if (!values.lastname) {
        errors.lastname = "Lastname Required";
    }
    else if (values.lastname.length < 2 || values.lastname.length > 30) {
        errors.lastname = "Lastname must be more than 2 characters and less than 30";
    }

    if (!values.birthdate) {
        errors.birthdate = "Birthdate Required";
    } else if (!/^([0-9]{4})-([0-9]{2})-([0-9]{2})$/.test(values.birthdate)) {
        errors.birthdate = "Date of birth must be in a valid format (DD-MM-YYYY)";
    } else {
        const birthdate = new Date(values.birthdate);
        const now = new Date();
        const min = new Date("1900-01-01");
        if (birthdate > now) {
            errors.birthdate = "La date de naissance ne peut pas être dans le futur";
        } else if (birthdate < min) {
            errors.birthdate = "La date de naissance doit être supérieure à 1900";
        }
    }

    if (!values.email) {
        errors.email = "Email Required";
    }
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email)) {
        errors.email = "Email must be in good format and consistent";
    }

    if (!values.password) {
        errors.password = "Password Required";
    }
    else if (!/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).*$/.test(values.password)) {
        errors.password = "The password must be at least 8 characters long, contain at least one number, one lowercase letter, one uppercase letter and one special character.";
    }

    if (!values.phone) {
        errors.phone = "Phone number Required";
    }
    else if (isNaN(Number(values.phone)) || values.phone.length !== 10) {
        errors.phone = "Le numéro de téléphone doit être en format numérique et avoir 10 chiffres.";
    }

    console.log(errors);
    return errors;
}


/* ____________________________________________________________________ */
/*                           Owner Part below                           */

export function ValidationForOwner(values) {

    let ownerInputError = {};

    if (!values.company_name) {
        ownerInputError.company_name = "The name of your company is Required";
    }
    else if (values.company_name.length < 2 || values.company_name.length > 30) {
        ownerInputError.company_name = "The name of your company must be more than 2 characters and less than 30";
    }

    if (!values.address_number) {
        ownerInputError.address_number = "The address number of your hostel is Required"
    }
    else if (!/^(0|[1-9]\d{0,4})$/.test(values.address_number)) {
        ownerInputError.address_number = "Please add a number between 0 and 99999"
    }

    if (!values.address_name) {
        ownerInputError.address_name = "The name of your address is Required"
    }
    else if (!/^[a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ\s'-]*\d{0,1}$/.test(values.address_name)) {
        ownerInputError.address_name = "The address must start with a capital letter and must contain only letters or dashes"
    }

    if (!values.city_name) {
        ownerInputError.city_name = "The name of your city is Required"
    }
    else if (!/^[A-Z][a-zà-ÿ]+([ '-][a-zà-ÿ]+)*$/.test(values.city_name)) {
        ownerInputError.city_name = "The city must start with a capital letter and must contain only letters or dashes"
    }

    if (!values.zip_code) {
        ownerInputError.zip_code = "The zip code of your city is Required"
    }
    else if (!/^\d{5}$/.test(values.zip_code)) {
        ownerInputError.zip_code = "Your zip code goes certainly from 01000 to 98799"
    }

    if (!values.kbis_number) {
        ownerInputError.kbis_number = "Your Kbis number is Required"
    }
    else if (!/^\d{9}$/.test(values.kbis_number)) {
        ownerInputError.kbis_number = "Your Kbis number must have 9 digits"
    }

    console.log(ownerInputError);
    return ownerInputError;
}