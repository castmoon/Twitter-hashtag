const express = require('express');
const router = express.Router();

const twit = require("twit")

const consumer_key = process.env.CONSUMER_KEY;
const consumer_secret = process.env.CONSUMER_SECRET;
const access_token = process.env.ACCESS_TOKEN;
const access_token_secret = process.env.ACCESS_TOKEN_SECRET;

router.get("/", async (req, res) => {
  const {q} = req.query;

  let Twitter = new twit({
    consumer_key,
    consumer_secret,
    access_token,
    access_token_secret,
});

  const resultado = await Twitter.get('search/tweets', {
    q: q + ' filter:media filter:safe' ,
    count: 50,
    result_type: "mixed",
    tweet_mode: 'extended'
  }).catch(function (err) {
    console.log('caught error', err.stack)
  }).then(function (result) {
    return result
  });


  return res.send(resultado);
})

module.exports = router;
