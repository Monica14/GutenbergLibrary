const buildConditions = (params) => {
  var conditions = [];
  var values = [];

  if (typeof params.book_id !== "undefined") {
    conditions.push("books_book.id IN (?) ");
    values.push(params.book_id);
  }

  if (typeof params.language !== "undefined") {
    conditions.push("books_language.code REGEXP (?) ");
    const langageList = params.language;
    values.push(langageList.replace(",", "|"));
  }

  if (typeof params.mimeType !== "undefined") {
    conditions.push("books_format.mime_type REGEXP (?) ");
    const typeList = params.mimeType;
    values.push(typeList.replace(",", "|"));
  }

  if (typeof params.bookTitle !== "undefined") {
    conditions.push("books_book.title REGEXP (?) ");
    const bookList = params.bookTitle;
    values.push(bookList.replace(",", "|"));
  }

  if (typeof params.bookAuthor !== "undefined") {
    conditions.push("books_author.name REGEXP (?) ");
    const authorList = params.bookAuthor;
    values.push(authorList.replace(",", "|"));
  }

  if (typeof params.bookTopic !== "undefined") {
    conditions.push(
      "books_subject.name REGEXP (?) OR books_bookshelf.name REGEXP (?)"
    );
    let topicList = params.bookTopic;
    topicList = topicList.replace(",", "|");
    topicList = topicList.split(",");
    values.push(...topicList, ...topicList);
  }

  return {
    where: conditions.length ? conditions.join(" AND ") : "1",
    values: values,
  };
};

export default buildConditions;
