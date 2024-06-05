import bcrypt from "bcrypt";

async function hashPassword(req, res, next) {
    const password = req.body.password;
    if (!password) {
        return res.status(400).json({ success: false, message: "Invalid details!" })
    }
    try {
        const salt = await bcrypt.genSalt(parseInt(process.env.HASHING_ROUNDS));
        const hashed = await bcrypt.hash(password, salt);
        req.body.password = hashed;
        next();
    } catch (err) {
        console.log("bcrypt middleware errored: ", err);
        return res.status(500).json({ success: false, message: "An error occured!" });
    }
}

export default hashPassword;