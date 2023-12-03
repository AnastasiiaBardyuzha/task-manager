import bcrypt from 'bcrypt';
import { User } from '../models/userModel.js';

export default async (req, res, next) => {
    //check if basic auth header

    if (
        !req.headers.authorization ||
        req.headers.authorization?.indexOf('Basic') === -1
    ) {
        return res.status(401).json({ message: 'Invalid authorization' });
    }

    //verify basic auth
    const base64Credentials = req.headers.authorization?.split(' ')[1];

    //do base64Credentials decoding
    const credentials = Buffer.from(base64Credentials, 'base64').toString(
        'ascii'
    );

    const [email, password] = credentials.split(':');

    //get user by email
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: 'User Not found' });
    }

    //check if password from request is the same as in db
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        return res.status(400).json({ message: 'Invalid password or email' });
    }

    //attach user to request object

    req.user = user._doc;

    next();
};
