var express = require("express");
var router = express.Router();
import connection from "../config/connection";
import buildConditions from "../utils/buildConditions";

/* GET books listing. */
router.get("/", function (req, res, next) {
  var sqlPiece = buildConditions(req.query);
  const offsetValue = req.query.offset ? req.query.offset : 0;
  // Used of INNER JOIN : To fetch only the data present in both table
  // Used of LEFT JOIN : If don't want to strict match the data of book in both the table then left join can be used which will return null if data not present
  const queryResult = connection.query(
    `SELECT books_book.id as book_id,books_book.title as book_title,books_book.media_type,books_book_authors.author_id,books_author.name as author_name,books_author.birth_year as author_DOB,books_author.death_year as author_DOY,books_format.mime_type,books_language.code as language_code,books_subject.name as book_subject_name,books_bookshelf.name as books_bookshelf_name,books_format.url as download_links
      From books_book 
          INNER JOIN books_book_authors ON books_book.id = books_book_authors.book_id
          LEFT JOIN books_author ON books_author.id = books_book_authors.author_id
          INNER JOIN books_book_languages ON books_book.id = books_book_languages.book_id
          LEFT JOIN books_language ON books_book_languages.language_id = books_language.id
          INNER JOIN books_book_subjects ON books_book_subjects.book_id = books_book.id
          LEFT JOIN books_subject ON books_subject.id = books_language.id
          INNER JOIN books_book_bookshelves ON books_book_bookshelves.book_id = books_book.id
          LEFT JOIN books_bookshelf ON books_bookshelf.id = books_book_bookshelves.bookshelf_id
          INNER JOIN books_format ON books_format.book_id = books_book.id
      where ` + sqlPiece.where + ' ORDER BY books_book.download_count DESC LIMIT 25 OFFSET '+ offsetValue,
      sqlPiece.values,
    function (error, results, fields) {
      if (error) throw error;
      res.json(results);
    });
});

module.exports = router;
