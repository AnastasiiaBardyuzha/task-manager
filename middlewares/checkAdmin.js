export default async (req, res, next) => {
    //check if user exist
    if (!req.user) {
        return res.status(404).json({ message: 'User Not found' });
    }

    //check if user has admin role
    if (req.user.role !== 'admin') {
        return res.status(500).json({ message: "User don't have permissions" });
    }

    next();
};
