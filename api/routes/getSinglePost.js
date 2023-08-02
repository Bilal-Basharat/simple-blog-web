const express = require('express');
const router = express.Router();
const { connection } = require('../database/sql');

router.get('/:postId', (req, response) => {
  const postId = req.params.postId; // Get postId from URL parameters

  // Use the postId in the query to fetch the specific post data
  connection.query('SELECT * FROM blogData WHERE id = ?', postId, (err, res) => {
    if (err) {
      console.error('Error fetching post data:', err);
      response.status(500).send('Error fetching post data');
    } else {
      response.send(res);
    }
  });
});

module.exports = router;
