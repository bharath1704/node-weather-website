const request = require("request");
const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=00e48901a555fd7c6dd1b4a9979de4ba&query=${lat},${long}`;

  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback("Something went wrong. Try again", undefined);
    } else if (body.error) {
      callback(body.error.info, undefined);
    } else {
      // const current = response.body.current;
      // console.log(
      //   `${current.weather_descriptions[0]}. It is currently ${current.temperature} degrees out. It feels like ${current.feelslike} degrees out.`
      // );
      callback(undefined, {
        description: body.current.weather_descriptions[0],
        temperature: body.current.temperature,
        feelslike: body.current.feelslike
      })
    }
  });
};

module.exports = forecast;
