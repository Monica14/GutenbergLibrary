# GutenbergLibrary

This repository gives data for books.

Below are the list of refernce API to access data
1. Without any condition the API to access data <br />
    localhost:3000/books
2. If passed on book id API should be like below
    localhost:3000/books?book_id=2,4&offset=10
    ![Screenshot from 2023-02-25 19-33-21](https://user-images.githubusercontent.com/7288781/221361267-e90cdc77-cdf6-4acb-bb3e-823eda820aaa.png)
3. with multiple condition API should look like below <br />
    localhost:3000/books?bookTopic=child,infant&bookTitle=John&offset=10
