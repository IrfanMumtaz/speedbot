const Handler = (err, req, res, next) => {
    res.status(err.code).json({result: err.message})
}

module.exports = Handler;