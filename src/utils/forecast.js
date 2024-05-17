const request = require("request");

const forecast = (address, callback) => {
  const url = `https://api.weatherapi.com/v1/current.json?key=c4768481c77c478fb3c63902240405&q=${address}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      const current = body.current;
      callback(
        undefined,
        `${current.condition.text}. It is currently ${current.temp_c} degrees out. There is a ${current.precip_mm}% chance of rain.`
      );
    }
  });
};
module.exports = forecast;
