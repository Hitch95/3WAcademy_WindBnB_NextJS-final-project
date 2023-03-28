

export default function Validation(values) {
    let errors = {}

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
    }
    else if (values.birthdate.length) {
        errors.birthdate = "Birthdate must be in good format and consistent";
    }

    if (!values.password) {
        errors.password = "Password Required";
    }
    else if (values.password.length) {
        errors.password = "Password must be in good format and consistent";
    }

    if (!values.phone) {
        errors.phone = "Phone number Required";
    }
    else if (isNaN(Number(values.phone)) || values.phone.length !== 10) {
        errors.phone = "Le numéro de téléphone doit être en format numérique et avoir 10 chiffres.";
    }


}