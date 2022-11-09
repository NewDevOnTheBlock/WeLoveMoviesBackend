const knex = require("../db/connection")

// query for all movies
function listAllMovies() {
    return knex("movies").select("*")
}

// query for movies that are showing by combining the tables movies + movies_theaters
function listShowingMovies(boolean) {
    return knex("movies as m")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .select("m.*")
        .distinct()
        .where({ is_showing: boolean })
}

// query for a specific movie based on the id in the parameters
function read(movieId) {
    return knex("movies")
        .select("*")
        .where({ movie_id: movieId })
        .first()
        .then(data => data)
}

module.exports = {
    listAllMovies,
    listShowingMovies,
    read,
}