const router = require("express").Router({ mergeParams: true});
const controller = require("./movies.controller")
// imported routers
const reviewsRouter = require("../reviews/reviews.router")
const theatersRouter = require("../theaters/theaters.router")
//methodNotAllowed
const methodNotAllowed = require("../errors/methodNotAllowed")
// define routes to endpoints
// check theaters of a specific movie
router.use("/:movieId/theaters", controller.movieExists, theatersRouter)
// check the reviews of a specific movie
router.use("/:movieId/reviews", controller.movieExists, reviewsRouter)

// view a specific movie
router.route("/:movieId")
    .get(controller.read)
    .all(methodNotAllowed)

// view all movies
router.route("/")
    .get(controller.list)
    .all(methodNotAllowed)

module.exports = router;