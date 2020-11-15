const Handler = (err, req, res, next) => {
    console.log(err)
    res.status(err.code).json({result: err.message})
}

module.exports = Handler;