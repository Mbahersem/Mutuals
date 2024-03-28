function errorHandler(err, req, res, next) {
    console.error(err);
    res.status(500).json({msg: err});
}

module.exports = errorHandler;