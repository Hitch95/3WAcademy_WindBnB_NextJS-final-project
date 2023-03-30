import DBconnection from "../config/DBconnection";

export async function createOwnerUser(company_name, address_number, address_name, city_name, zip_code, email, password, phone, kbis_number) {

    try {
        const dbconnection = await DBconnection();
        const query = `INSERT INTO owners (company_name, address_number, address_name, city_name, zip_code, email, email_verified_at, password, created_at, phone, kbis_number)
                    VALUES (?, ?, ?, ?, ?, ?, ?, created_at, ?, ?)`;
        const ownerValues = [company_name, address_number, address_name, city_name, zip_code, email, password, phone, kbis_number];
        await dbconnection.execute(query, ownerValues);
        dbconnection.end();
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function updateOwnerUser(company_name, address_number, address_name, city_name, zip_code, email, password, phone, kbis_number) {

    try {
        const dbconnection = await DBconnection();
        const query = `UPDATE owners (company_name, address_number, address_name, city_name, zip_code, email, password, updated_at, phone, kbis_number)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ? ?, ?, ?)`;
        const ownerValues = [company_name, address_number, address_name, city_name, zip_code, email, password, phone, kbis_number];
        await dbconnection.execute(query, ownerValues);
        dbconnection.end();
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function selectOwnerUser(company_name, address_number, address_name, city_name, zip_code, email, password, phone, kbis_number) {

    try {
        const dbconnection = await DBconnection();
        const query = `SELECT owners (company_name, address_number, address_name, city_name, zip_code, email, email_verified_at, password, remember_token, created_at, updated_at, phone_number, kbis_number)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ? ?, ?, ?)`;
        const ownerValues = [company_name, address_number, address_name, city_name, zip_code, email, password, phone, kbis_number];
        await dbconnection.execute(query, ownerValues);
        dbconnection.end();
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function deleteOwnerUser(company_name, address_number, address_name, city_name, zip_code, email, password, phone, kbis_number) {

    try {
        const dbconnection = await DBconnection();
        const query = `DELETE owners (company_name, address_number, address_name, city_name, zip_code, email, password, created_at, updated_at, phone, kbis_number)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const ownerValues = [company_name, address_number, address_name, city_name, zip_code, email, password, phone, kbis_number];
        await dbconnection.execute(query, ownerValues);
        dbconnection.end();
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}