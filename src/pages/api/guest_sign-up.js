import bcrypt from "bcrypt";
import { createGuestUser } from "../../Repository/guestUserRepository";

const HTTP_STATUS = {
    OK: 200,
    BAD_REQUEST: 400,
    METHOD_NOT_ALLOWED: 405,
    INTERNAL_SERVER_ERROR: 500,
};

export default async function GuestSignUp(req, res) {

    if (req.method === "POST") {
        const { firstname, lastname, birthdate, email, password, phone } = req.body;

        if (!firstname || !lastname || !birthdate || !email || !password || !phone) {
            return res
                .status(HTTP_STATUS.BAD_REQUEST)
                .json({ error: "Missing fields" });
        }

        try {
            const saltRounds = 10;
            const hash = bcrypt.hashSync(password, saltRounds);
            const success = await createGuestUser(
                firstname,
                lastname,
                birthdate,
                email,
                hash,
                phone
            );

            if (success) {
                res.status(200).json({ data: `${firstname} ${lastname} ${birthdate} ${email} ${hash} ${phone}`, success: true });
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
