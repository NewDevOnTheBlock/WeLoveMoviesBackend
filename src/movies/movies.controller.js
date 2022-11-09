const moviesService = require("./movies.service");
// asyncErrorBoundary
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// validation middleware

// validate movie existence
async function movieExists(req, res, next) {
    const { movieId } = req.params;
    const movie = await moviesService.read(movieId);
    if (movie) {
        res.locals.movie = movie;
        res.locals.movieId = movieId
        return next();
    }
    return next({
        status: 404,
        message: `A movie with the ID of ${movieId} cannot be found.`,
    });
}

// route handlers

// list all movies
async function list(req, res, next) {
    const { is_showing } = req.query;
    if (is_showing === "true") {
        const allMovies = await moviesService.listShowingMovies(true)
        res.json({ data: allMovies })
    }
    const allMovies = await moviesService.listAllMovies()
    res.json({ data: allMovies})
}

async function read(req, res, next) {
    const { movie } = res.locals
    res.json({ data: movie })
}

module.exports = {
    list: asyncErrorBoundary(list),
    read: [
        asyncErrorBoundary(movieExists), 
        read
    ],
    movieExists,
}