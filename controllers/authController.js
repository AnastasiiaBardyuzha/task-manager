import bcrypt from 'bcrypt';
import { User } from '../models/userModel.js';

export const registerUser = async (req, res) => {
    try {
        const { password, ...rest } = req.body;

        //generate salt (random part for password)
        const salt = await bcrypt.genSalt(10);

        //generate password with salt
        const hash = await bcrypt.hash(password, salt);

        //create user
        const user = await User.create({
            ...rest,
            password: hash,
        });

        // eslint-disable-next-line no-unused-vars
        const { password: pas, ...restData } = user._doc;

        return res.status(201).json(restData);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { password, email } = req.body;

        //get user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User Not found' });
        }

        //check if password from request is the same as in db
        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return res
                .status(403)
                .json({ message: 'Invalid password or email' });
        }

        const { password: pas, ...restData } = user._doc;

        return res.status(200).json(restData);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};
