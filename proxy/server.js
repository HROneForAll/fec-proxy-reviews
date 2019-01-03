const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const request = require('request');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/:id/reviews', (req, res) => {
  var limit = req.query.limit;
  var offset = req.query.offset;
  request({
    uri: `http://127.0.0.1:8000/${req.params.id}/reviews?limit=${limit}&offset=${offset}`,
  }, (err, response, body) => {
    if (err) {
      console.log(err);
    }
    res.json(JSON.parse(body));
  })
})

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
