const express = require('express');
const mongoose = require('mongoose');
const cheerio = require('cheerio');
const logger = require('morgan');
const axios = require('axios');
const db = require('./models');
const PORT = process.env.PORT || 3001;
const app = express();
const path = require('path');
const cors = require('cors');

if (process.env.NODE_ENV !== 'production') {
  app.use(cors());
}else{
  app.use(express.static(path.join(__dirname, 'client/build')));
}
app.use(logger('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
mongoose.connect(process.env.MONGOLAB_SILVER_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
app.get('/', (req, res) => {    res.sendfile(path.join(__dirname = 'client/build/index.html'));  })
app.get('/scrape', (req, res) => {
  axios.get('https://news.ycombinator.com/').then(response => {
    let $ = cheerio.load(response.data);
    $('.title').each((i, elem) => {
      let title = $(elem)
          .children('a')
          .text(),
        link = $(elem)
          .find('a')
          .attr('href');
      if (title && link) {
        db.Article.create(
          {
            title: title,
            link: link
          },
          (err, inserted) => {
            if (err) {
              res.status(400).json({ msg: err });
            }
          }
        );
      }
    });
    res.send('Scrape Complete');
  });
});

app.get('/articles', async (req, res) => {
  try {
    let data = await db.Article.find({}).populate('notes');
    res.json(data);
  } catch (error) {
    res.json({ message: error });
  }
});

app.get('/articles/:id', function(req, res) {
  db.Article.findOne({ _id: req.params.id })
    .populate('notes')
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.post('/articles/:id/notes', function(req, res) {
  //  do we have artcle with :id?
  // -- no ? throw error because we cant save a note to a non-existing article

  db.Note.create(req.body)
    .then(function(dbNote) {
      return db.Article.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { notes: dbNote } },
        { new: true }
      ).populate('notes');
    })
    .then(function(article) {
      res.json({ article });
    })
    .catch(function(err) {
      res.json(err);
    });
});
app.delete('/articles/:id/notes/:noteId', async function(req, res) {
  try {
    let article = await db.Article.findById(req.params.id);

    if (!article) {
      res.status(422).json({ msg: 'no Article found by that ID' });
      return;
    }

    const noteIndex = article.notes.findIndex(noteId => {
      return noteId.toString() === req.params.noteId;
    });

    if (noteIndex === -1) {
      res.status(422).json({ msg: 'Article does not have given note id' });
      return;
    }

    await db.Note.findByIdAndDelete(req.params.noteId);
    article.notes.splice(noteIndex, 1);
    await article.save();
    article = await db.Article.findById(article._id).populate('notes');
    res.status(200).json({ article });
  } catch (error) {
    res.status(500).json({ msg: error });
    return;
  }
});

app.put('/articles/:id/notes/:noteId', async (req, res) => {
  try {
    let article = await db.Article.findById(req.params.id);

    if (!article) {
      res.status(422).json({ msg: 'no Article found by that ID' });
      return;
    }

    const noteIndex = article.notes.findIndex(noteId => {
      return noteId.toString() === req.params.noteId;
    });

    if (noteIndex === -1) {
      res.status(422).json({ msg: 'Article does not have given note id' });
      return;
    }

    await db.Note.findOneAndUpdate(
      { _id: req.params.noteId },
      { title: req.body.title, body: req.body.body }
    );

    article = await db.Article.findById(article._id).populate('notes');
    res.status(200).json({ article });
  } catch (error) {
    res.status(500).json({ msg: error });
    return;
  }
});

app.listen(PORT, function() {
  console.log('App running on port ' + PORT + '!');
});
