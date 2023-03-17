
const users = [];
var errorView;
var loadingView;
var usersView;

window.onload = function () {


    errorView = document.getElementById('error');
    loadingView = document.getElementById('loading');
    usersView = document.getElementById('users');

    //remove every view other than loading view
    errorView.style.display = 'none';
    usersView.style.display = 'none';

    //get value in url
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const quantity = urlParams.get('quantity');

    getRequest(quantity)
}


/**
 * Sends a Get request to randomuser.me
 * @param  {[Integer]} quantity The amount of users to get
 */
function getRequest(quantity) {
    fetch('https://randomuser.me/api/?results='+quantity)
        .then(response => response.json())
        .then(data => {

            sortData(data)

            loadingView.style.display = 'none'
            usersView.style.display = "block"

        })
        .catch(error => {
            console.error(error)

            loadingView.style.display = 'none'
            errorView.style.display = 'block';

        });
}


/**
 * Sorts Data into objects, stored in an array called users
 * @param  {[JSON]} data The JSON data recieved
 */
function sortData(data) {

    data.results.forEach(result => {

        const user = {
            name: result.name.first,
            age: result.dob.age,
            gender: result.gender,
            picture: result.picture.large
        };

        users.push(user);

    });

    createPageContent()
}

/**
 * Adds the users in the html file results
 */
function createPageContent() {
    users.forEach(user => {
        const userElement = document.createElement("div");
        userElement.id = "user";
        userElement.innerHTML = `
      <img src="${user.picture}" alt="picture of user">
      <h2>${user.name}</h2>
      <h2>${user.age}</h2>
      <h2>${user.gender}</h2>
    `;
        const usersContainer = document.getElementById("users");
        usersContainer.appendChild(userElement);
    });
}
