const router = require("express").Router({ mergeParams: true });
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./theaters.controller")
// import cors
const cors = require("cors")
// define routes to endpoints
// app.use(cors())
// route to list of all theaters
router.route("/")
    .get(controller.list)
    .all(methodNotAllowed)

module.exports = router