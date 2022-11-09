if (process.env.USER) require("dotenv").config();
const express = require("express");
// create the express instance, store it in the app variable
const app = express();
const cors = require(cors)
// route handlers
const moviesRouter = require("./movies/movies.router");
const theatersRouter = require("./theaters/theaters.router");
const reviewsRouter = require("./reviews/reviews.router");

// error handlers
const notFound = require("./errors/routeNotFound");
const errorHandler = require("./errors/errorHandler");

app.use(cors())
// allow express to take a .json payload
app.use(express.json());

const router = express.Router()
router.get("/", cors(), (req, res) => {
    res.json({ message: "Welcome! You can access the data using these routes: /movies, /movies/:moviesId, /reviews, /reviews/:reviewId, /theaters, /movies/:movieId/reviews, /movies/:movieId/reviews/:reviewId" })
})

// define each route: movies, movie-theaters, reviews
app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter)
app.use("/theaters", theatersRouter)
// error handlerss
app.use(notFound);
app.use(errorHandler);

module.exports = app;