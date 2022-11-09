const router = require("express").Router({ mergeParams: true });
const controller = require("./reviews.controller")
// methodNotAllowed
const methodNotAllowed = require("../errors/methodNotAllowed");
// import cors
const cors = require("cors");
// define routes to endpoints
// app.use(cors())
// route to specific review
router.route("/:reviewId")
    .put(controller.update)
    .delete(controller.delete)
    .all(methodNotAllowed)
// route to list of ratings
router.route("/")
    .get(controller.list)
    .all(methodNotAllowed)

module.exports = router