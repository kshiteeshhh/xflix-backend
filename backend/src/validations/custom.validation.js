const genreList = ["Education", "Sports", "Comedy", "Lifestyle", "All"];
const contentRatingList = ["7+", "12+", "16+", "18+", "Anyone", "All"];

const genre = (value, helpers) => {
  const genreList = ["Education", "Sports", "Comedy", "Lifestyle", "All"];
  const valueList = value.split(",");
  for (let i = 0; i < valueList.length; i++) {
    if (!genreList.includes(valueList[i])) {
      return helpers.message(
        `"${valueList[i]}" is not a valid genre. It must be one of [Education, Sports, Comedy, Lifestyle, All].`
      );
    }
  }
  return value;
};

const contentRating = (value, helpers) => {
  console.log("from custom: ",value)
  if (!contentRatingList.includes(value)) {
    return helpers.message(
      `"${value}" is not a valid content rating. It must be one of [7+, 12+, 16+, 18+, Anyone, All].`
    );
  }
  return value;
};

const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

const Link=(value,helpers)=>{
  if(!value.match(
    /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/
  ))
  {return helpers.message('"{{#label}} must be valid link format"')}
  return value;
}
module.exports = {
  genre,
  contentRating,
  objectId,Link
};