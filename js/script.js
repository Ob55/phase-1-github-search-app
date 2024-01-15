const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const reposResults = document.getElementById('reposResults');

searchForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const searchTerm = searchInput.value.trim();

    if (searchTerm === '') {
        alert('Please enter a GitHub username');
        return;
    }

    // Search for users
    searchUsers(searchTerm);
});

function searchUsers(username) {
    const apiUrl = `https://api.github.com/search/users?q=${username}`;
    const headers = { 'Accept': 'application/vnd.github.v3+json' };

    fetch(apiUrl, { headers })
        .then(response => response.json())
        .then(data => {
            displayUsers(data.items);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function displayUsers(users) {
    searchResults.innerHTML = '';

    users.forEach(user => {
        const userCard = document.createElement('div');
        userCard.innerHTML = `
            <div>
                <img src="${user.avatar_url}" alt="${user.login}" width="50">
                <p>${user.login}</p>
                <a href="#" onclick="getRepos('${user.login}')">View Repositories</a>
            </div>
        `;
        searchResults.appendChild(userCard);
    });
}

function getRepos(username) {
    const apiUrl = `https://api.github.com/users/${username}/repos`;
    const headers = { 'Accept': 'application/vnd.github.v3+json' };

    fetch(apiUrl, { headers })
        .then(response => response.json())
        .then(data => {
            displayRepos(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function displayRepos(repos) {
    reposResults.innerHTML = '';

    repos.forEach(repo => {
        const repoCard = document.createElement('div');
        repoCard.classList.add('repo');
        repoCard.innerHTML = `
            <p>${repo.name}</p>
            <p>${repo.description || 'No description available'}</p>
        `;
        reposResults.appendChild(repoCard);
    });
}
