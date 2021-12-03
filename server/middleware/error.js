function appError(err, req, res, next) {
    /* console.log(err.message) */
    res.status(err.code).json(err.message)
    res.end();
    return;

}

module.exports = appError;
