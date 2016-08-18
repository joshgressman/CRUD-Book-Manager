$(document).ready(function () {
  getBooks();

  // add a book
  $('#book-submit').on('click', postBook);
  //need event listener for the drop submit
  $('#drop-submit').on('click',filterBooks);
  $('#book-list').on('click', '.update', putBook );
  $('#book-list').on('click', '.delete', deleteBook);
});
/**
 * Retrieve books from server and append to DOM
 */

function getBooks() {
  $.ajax({
    type: 'GET',
    url: '/books',
    success: function (books) {
      console.log('GET /books returns:', books);
      books.forEach(function (book) {
        var $el = $('<div></div>');
        //list of properties we wnat to display
        var bookProperties = ['title', 'author', 'published', 'edition', 'publisher', 'genre'];
        //creating an input field
        bookProperties.forEach(function (property){

          var $input = $('<input type ="text" id="' + property + '"name ="' + property + '" />');
          $input.val(book[property]);
          $el.append($input);

        });
        //id is unige id from the database
         $el.data('bookId', book.id);
         $el.append('<button class = "update">Update</button');
         $el.append('<button class = "delete">Delete</button');
        // $el.append('<strong>' + book.title + '</strong>');
        // $el.append(' <em>' + book.author + '</em');
        // $el.append(' <time>' + book.published + '</time>');
        // $el.append(' <em>' + book.edition + '</em');
        // $el.append(' <em>' + book.publisher + '</em>');
        $('#book-list').append($el);
      });
    },

    error: function (response) {
      console.log('GET /books fail. No books could be retrieved!');
    },
  });
}
/**
 * Add a new book to the database and refresh the DOM
 */
function postBook() {
  event.preventDefault();

   var book = {};


  $.each($('#book-form').serializeArray(), function (i, field) {
    book[field.name] = field.value;
  });

  $.ajax({
    type: 'POST',
    url: '/books',
    data: book,
    success: function () {
      console.log('POST /books works!');
      $('#book-list').empty();
      getBooks();
    },

    error: function (response) {
      console.log('POST /books does not work...');
    },
  });
}

function putBook () {
  var book = {};
  var inputs = $(this).parent().children().serializeArray();
  $.each(inputs, function (i, field){
    book[field.name] = field.value;
  });
  var bookId = $(this).parent().data('bookId');
  $.ajax({
    type: 'PUT',
    url:'/books/' + bookId,
    data: book,
    success: function () {
      getBooks();
    },
    error: function(){
      console.log('Error PUT /books/' + bookId);
    },
  })
}

function deleteBook() {
  var bookId = $(this).parent().data('bookId');
  $.ajax({
    type: 'DELETE',
    url: '/books/' + bookId,
    success: function () {
      console.log('DELETE success');
      $('#book-list').empty();
      getBooks();
    },
    error: function (){
      console.log('DELETE failed');
    }
  });
}

function filterBooks() {
  var dropValue = $('#genres :selected').val();
  console.log("dropValue", dropValue);
  $.ajax({
    type: 'GET',
    url: '/books/' + dropValue,
    success: function (books) {
      console.log('GET /books returns:', books);
        $('#book-list').empty();
      books.forEach(function (book) {
        var $el = $('<div></div>');
        //list of properties we wnat to display
        var bookProperties = ['title', 'author', 'published', 'edition', 'publisher', 'genre'];
        //creating an input field
        bookProperties.forEach(function (property){

          var $input = $('<input type ="text" id="' + property + '"name ="' + property + '" />');
          $input.val(book[property]);
          $el.append($input);

        });
        //id is unige id from the database
         $el.data('bookId', book.id);
         $el.append('<button class = "update">Update</button');
         $el.append('<button class = "delete">Delete</button');
        // $el.append('<strong>' + book.title + '</strong>');
        // $el.append(' <em>' + book.author + '</em');
        // $el.append(' <time>' + book.published + '</time>');
        // $el.append(' <em>' + book.edition + '</em');
        // $el.append(' <em>' + book.publisher + '</em>');
        $('#book-list').append($el);
      });
    },

    error: function (response) {
      console.log('GET /books fail. No books could be retrieved!');
    },
  });
}
