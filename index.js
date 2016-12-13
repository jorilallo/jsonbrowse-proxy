const { send } = require('micro');
const fetch = require('isomorphic-fetch');

module.exports = async (req, res) => {
  const url = req.url.substring(1);

  if (!url) return "Invalid request, please supply API URL at the path";

  // Set CORS
  res.setHeader('Access-Control-Allow-Origin', 'https://jsonbrowse.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  try {
    const response = await fetch(decodeURIComponent(url), {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();

    send(res, 200, data);
  } catch (e) {
    send(res, 400, e.message);
  }
}
