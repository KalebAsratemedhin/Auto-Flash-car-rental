const responseMiddleware = (req, res, next) => {
    res.success = (message, data = null, statusCode = 200) => {
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
