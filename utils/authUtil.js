import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error("[hashPassword] Error:", error);
        throw new Error("Error hashing password");
    }
}

export const comparePassword = async (password, hashedPassword) => {
    try {
        if (!password || !hashedPassword) {
            console.log(password)
            console.log(hashedPassword)
            throw new Error("Both password and hashedPassword are required");
        }
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        console.error("[comparePassword] Error:", error);
        throw new Error("Error comparing password");
    }
}
