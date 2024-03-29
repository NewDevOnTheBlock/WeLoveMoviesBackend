const reviewsService = require("./reviews.service");
// asyncErrorBoundary
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

// validation middleware

// validate review existence
async function reviewExists(req, res, next) {
    const { reviewId } = req.params;
    const review = await reviewsService.read(reviewId);
    if (review) {
        res.locals.reviewId = reviewId;
        res.locals.review = review;
        return next();
    }
    return next({
        status: 404,
        message: `A review with an ID of ${reviewId} cannot be found`
    })
}

// route handlers
// list all reviews
async function list(req, res, next) {
    const data = await reviewsService.list(res.locals.movieId) 
    res.json({ data });
}

// update a single review
async function update(req, res, next) {
    const critic = await reviewsService.readCritic(res.locals.reviewId)
    const updatedReview = {
        ...res.locals.review,
        ...req.body.data,
        updated_at: Date.now().toString(),
    }
    await reviewsService.update(updatedReview)
    updatedReview["critic"] = critic
    res.status(201).json({ data: updatedReview })
}

// delete a single review
async function destroy(req, res, next) {
    await reviewsService.delete(res.locals.review.review_id)
    res.sendStatus(204)
}

module.exports = {
    list: asyncErrorBoundary(list),
    update: [
        asyncErrorBoundary(reviewExists),
        asyncErrorBoundary(update)
    ],
    delete: [
        asyncErrorBoundary(reviewExists),
        asyncErrorBoundary(destroy)
    ]
}