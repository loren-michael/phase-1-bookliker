// DELIVERABLES

//✅ When the page loads, get a list of books from `http://localhost:3000/books`

//✅ display their titles by creating a `li` for each book and adding each `li` to the `ul#list` element.

// When a user clicks the title of a book, display the book's
    //✅ thumbnail
    //✅ description
    //✅ list of users who have liked the book
    //✅ This information should be displayed inthe `div#show-panel` element.

// A user can like a book by clicking on a button. Display a `LIKE` button along with the book details.
    // When the button is clicked, send a `PATCH` request to `http://localhost:3000/books/:id` with an array of users who like the book,and add a new user to the list.
    // After clicking the like button, the user's name should also be displayed along with the list of users who have liked the book in the book details section.

// BONUS
    // If a user has already liked a book, clicking the LIKE button a second time should remove that user from the list of users who have liked the book.
    // Make a second PATCH request with the updated array of users, removing your user from the list. Also remove the user from the DOM.


// ASSIGNMENTS

const baseURL = 'http://localhost:3000/books';
const bookListPanel = document.getElementById("list-panel");
const bookList = document.getElementById("list");
const bookDetailPanel = document.getElementById("show-panel");
const userInfo = {"id": 1, "username": "pouros"};
const username = userInfo.username;

// On Page Load

document.addEventListener("DOMContentLoaded", () => {

// Fetches

function getAllBooks () {
    bookList.innerHTML = '';
    return fetch(baseURL)
    .then(resp => resp.json())
    .then(renderBookList)
}  

function getBookDetails (e) {
    fetch (baseURL + `/${e.target.id}`)
    .then(resp => resp.json())
    .then(renderBookDetails)
}

function addLikeToBook(e) {
    fetch (baseURL + `/${e.target.id}`)
    .then(resp => resp.json())
    .then(bookObj => {
        let users = bookObj.users;

        // if(users.find(username) === false) {
        //     users.push(userInfo)
        // } else {
        //     let userIndex = users.findIndex(userInfo);
        //     users.splice(userIndex, 1)
        // }
        users.push(userInfo)
        fetch (baseURL + `/${e.target.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({users})
        }) .then(renderBookDetails(bookObj))
    })
}


// Rendering

function renderBookList(booksArr) {
    booksArr.forEach(renderOneBook)
}

function renderOneBook(bookObj) {
    const bookLi = document.createElement("li");
    bookLi.id = bookObj.id;
    bookLi.textContent = bookObj.title;
    bookLi.addEventListener('click', getBookDetails);
    bookList.append(bookLi)
}

function renderBookDetails(bookObj) {
    bookDetailPanel.innerHTML = '';
    const bookDetails = document.createElement("div")
    const bookImage = document.createElement("img");
    bookImage.src = bookObj.img_url;
    const bookTitle = document.createElement("h2");
    bookTitle.innerText = bookObj.title;
    const bookSubtitle = document.createElement("h3");
    if (bookObj.subtitle === true) {
        console.log(bookObj.title)
        bookSubtitle.innerText = bookObj.subtitle;
    } else {bookSubtitle.innerText = ''}
    const bookAuthor = document.createElement("h3");
    bookAuthor.innerText = bookObj.author
    const bookDescrip = document.createElement("p");
    bookDescrip.innerText = bookObj.description;
    bookDetails.append(bookImage, bookTitle, bookSubtitle, bookAuthor, bookDescrip)
    bookDetailPanel.append(bookDetails);
    renderLikes(bookObj)
}

function renderLikes (bookObj) {

    const bookLikes = document.createElement('ul');
    bookLikes.id = "book-likes";
    bookLikes.innerHTML= ``;
    for (const object of bookObj.users){
        const likeLi = document.createElement("li");
        likeLi.innerText = object.username;
        bookLikes.append(likeLi);
    }
    const likeBtn = document.createElement("button");
    likeBtn.id = bookObj.id;
    likeBtn.innerText = " Like ";
    likeBtn.addEventListener('click', addLikeToBook)
    bookDetailPanel.append(bookLikes, likeBtn)
}


// Initialize

getAllBooks()

}); // end of domcontentloaded