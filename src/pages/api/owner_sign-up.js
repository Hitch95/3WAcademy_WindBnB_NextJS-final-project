import bcrypt from "bcrypt";
import { createOwnerUser } from "../../Repository/ownerUserRepository";

const HTTP_STATUS = {
    OK: 200,
    BAD_REQUEST: 400,
    METHOD_NOT_ALLOWED: 405,
    INTERNAL_SERVER_ERROR: 500,
};

export default async function OwnerSignUp(req, res) {

    if (req.method === "POST") {
        const { company_name, address_number, address_name, city_name, zip_code, email, password, phone, kbis_number } = req.body;
        if (!company_name || !address_number || !address_name || !city_name || !zip_code || !email || !password || !phone || !kbis_number) {
            return res
                .status(HTTP_STATUS.BAD_REQUEST)
                .json({ error: "Missing fields" });
        }

        try {
            const saltRounds = 10;
            const hash = bcrypt.hashSync(password, saltRounds);
            const success = await createOwnerUser(
                company_name,
                address_number,
                address_name,
                city_name,
                zip_code,
                hash,
                phone,
                kbis_number
            );

            if (success) {
                res.status(200).json({ data: `${company_name} ${address_number} ${address_name} ${city_name} ${zip_code} ${email} ${hash} ${phone} ${kbis_number}`, success: true });
            } else {
                res.status(500).json({ error: "Internal server error" });
            }

        } catch (error) {
            console.error(error);
            return res
                .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
                .json({ error: "Internal server error" });
        }

    } else {
        return res.status(HTTP_STATUS.METHOD_NOT_ALLOWED).json({ error: "Method not allowed" });
    }
}