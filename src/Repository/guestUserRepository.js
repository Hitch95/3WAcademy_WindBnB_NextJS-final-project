import DBconnection from "../config/DBconnection";

export async function createGuestUser(firstname, lastname, birthdate, email, password, phone) {

    try {
        const dbconnection = await DBconnection();
        const query = `INSERT INTO guests (firstname, lastname, birthdate, email, password, created_at, phone_number)
                        VALUES (?, ?, STR_TO_DATE(?, '%Y-%m-%d'), ?, ?, NOW(), ?)`;
        const guestValues = [firstname, lastname, birthdate, email, password, phone];
        await dbconnection.execute(query, guestValues);
        dbconnection.end();
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function updateGuestUser(firstname, lastname, birthdate, email, password, phone) {

    try {
        const dbconnection = await DBconnection();
        const query = `UPDATE guests (firstname, lastname, birthdate, email, password, updated_at, phone_number)
                        VALUES (?, ?, ?, ?, ?, NOW(), ?)`;
        const guestValues = [firstname, lastname, birthdate, email, password, phone];
        await dbconnection.execute(query, guestValues);
        dbconnection.end();
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function selectGuestUser(firstname, lastname, birthdate, email, password, phone) {

    try {
        const dbconnection = await DBconnection();
        const query = `SELECT guests (firstname, lastname, birthdate, email, password, created_at, phone_number)
                        VALUES (?, ?, ?, ?, ?, NOW(), ?)`;
        const guestValues = [firstname, lastname, birthdate, email, password, phone];
        await dbconnection.execute(query, guestValues);
        dbconnection.end();
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function deleteGuestUser(firstname, lastname, birthdate, email, password, phone) {

    try {
        const dbconnection = await DBconnection();
        const query = `DELETE guests (firstname, lastname, birthdate, email, password, created_at, phone_number)
                        VALUES (?, ?, ?, ?, ?, NOW(), ?)`;
        const guestValues = [firstname, lastname, birthdate, email, password, phone];
        await dbconnection.execute(query, guestValues);
        dbconnection.end();
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}