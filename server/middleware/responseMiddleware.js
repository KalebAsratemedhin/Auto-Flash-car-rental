const responseMiddleware = (req, res, next) => {
    res.success = (message,  statusCode = 200, data = null) => {
        res.status(statusCode).json({
            success: true,
            message,
            data,
            errors: [],
        });
    };

    res.error = (message, statusCode = 500, errors = []) => {
        res.status(statusCode).json({
            success: false,
            message,
            data: null,
            errors: Array.isArray(errors) ? errors : [errors],
        });
    };

    next();
};

export default responseMiddleware;
