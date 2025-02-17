const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'You do not have permission to access this resource' });
    }
    next();
}

module.exports = { isAdmin };
