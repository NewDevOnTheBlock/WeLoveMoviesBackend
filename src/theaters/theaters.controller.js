const theatersService = require("./theaters.service");
// asyncErrorBoundary
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
// route handlers

// list all theaters
async function list(req, res, next) {
    const data = await theatersService.list()
    res.send({ data })
}

module.exports = {
    list: asyncErrorBoundary(list),
}