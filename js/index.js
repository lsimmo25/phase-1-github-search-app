
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#github-form")
    const userInfo = document.querySelector("#user-list")
    const repoResults = document.querySelector("#repos-list")

    function handleSubmit(e) {
        e.preventDefault();
        const searchValue = e.target.search.value;
        fetchUsers(searchValue)
        fetchUserRepo(searchValue)
    }

    form.addEventListener("submit", handleSubmit)

    //Fetch Usernames
    function fetchUsers(username) {
        fetch(`https://api.github.com/search/users?q=${username}`)
        .then(response => response.json())
        .then(data => displayUserInfo(data))
}
    //creates <li></li> displaying user ingo
    function displayUserInfo(data) {

        const userName = document.createElement("li")
        userInfo.appendChild(userName)
        userName.innerHTML = `
        <li>
            <h2>
            Username: ${data.items[0].login}
            </h2>
        </li>
        <li>
            <p>
                <a href="${data.items[0].html_url}">${data.items[0].html_url}</a>
            </p>
        </li>
        <li>
        <img src="${data.items[0].avatar_url}">
        </li>
        `
    }
    //Fetch Repos
    function fetchUserRepo(username) {
        fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(data => data.forEach(item => displayUserRepo(item)))
    }

    function displayUserRepo(data) {
        const userRepo = document.createElement("li")
        repoResults.appendChild(userRepo)
        userRepo.innerHTML = `
        <li>
            <p>
                <a href="${data.html_url}">${data.html_url}</a>
            </p>
        </li>
        `
    }
})
