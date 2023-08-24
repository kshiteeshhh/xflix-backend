const { string } = require("joi");
const Joi = require("joi");
const { genre, contentRating,objectId,Link } = require("./custom.validation");

const createVideoValidation = {
  body: Joi.object().keys({
    videoLink: Joi.string().required().custom(Link),
    title: Joi.string().required(),
    // genre: Joi.string().custom(genre),
    // contentRating: Joi.string().custom(contentRating),
    genre: Joi.string()
      .required()
      .valid("Education", "Sports", "Movies", "Comedy", "Lifestyle", "All"),
    contentRating: Joi.string()
      .required()
      .valid("Anyone", "7+", "12+", "16+", "18+"),
    releaseDate: Joi.string().required(),
    previewImage: Joi.string().required(),
  }),
};
const videoIdValidation = {
  params: Joi.object().keys({
    videoId: Joi.string().custom(objectId),
  }),
};
const votesValidation={
  body:Joi.object().keys({
    vote:Joi.string().required().valid("upVote","downVote"),
    change:Joi.string().required().valid("increase","decrease")
  })
}
const getVideosValidation={
  query:Joi.object().keys({
    genres:Joi.string().custom(genre),
    contentRating:Joi.string().valid("Anyone", "7+", "12+", "16+", "18+"),
    sortBy:Joi.string().valid("releaseDate","viewCount"),
    title:Joi.string()
  })
}
module.exports = {
  createVideoValidation,
  videoIdValidation,
  votesValidation,
  getVideosValidation
};
