document.getElementById("search-btn").addEventListener("click", function () {
    const username = document.getElementById("username").value;
    fetchGitHubProfile(username);
});

document.getElementById("username").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("search-btn").click();
  }
});

function fetchGitHubProfile(username){
    const url = `https://api.github.com/users/${username}`;
    fetch(url)
        .then((response) => {
            if(response.status === 200){
                return response.json();
            }
            else{
                throw new Error("User not found!");
            }
        })
        .then((data) => {
            displayUserProfile(data);
        })
        .catch((error) => {
            displayError(error.message);
        });
}

function displayUserProfile(profile){
    const searchContainer = document.getElementById("search-container");
    searchContainer.style.marginTop = "300px";
    const profileContainer = document.getElementById("profile-container");
    profileContainer.style.display = "block";
    profileContainer.classList.add("fade-in");
    const avatarElement = document.getElementById("avatar");
    avatarElement.src = profile.avatar_url;
    const usernameDisplayElement = document.getElementById("username-display");
    usernameDisplayElement.textContent = profile.login;
    const fullNameElement = document.getElementById("full-name");
    fullNameElement.innerHTML = profile.name ? profile.name : '<i>Full Name not found</i>';
    const bioElement = document.getElementById("bio");
    bioElement.innerHTML = profile.bio ? profile.bio : '<i>Bio not found.</i>';
    const companyElement = document.getElementById("company");
    companyElement.innerHTML = profile.company ? profile.company : '<i>Company not found.</i>';
    const locationElement = document.getElementById("location");
    locationElement.innerHTML = profile.location ? profile.location : '<i>Location not found.</i>';
    const repoCountElement = document.getElementById("repo-count");
    repoCountElement.innerHTML = profile.public_repos ? profile.public_repos : '<i>Public Repositories not found.</i>';
    const followersCountElement = document.getElementById("followers-count");
    followersCountElement.textContent = profile.followers;
    const followingCountElement = document.getElementById("following-count");
    followingCountElement.textContent = profile.following;
    const githubLinkElement = document.getElementById("github-link");
    githubLinkElement.href = profile.html_url;
    const errorMessageElement = document.getElementById("error-message");
    errorMessageElement.textContent = "";
    document.getElementById("profile-container").scrollIntoView({ behavior: "smooth" });
}

function displayError(message){
    const profileContainer = document.getElementById("profile-container");
    profileContainer.style.display = "none";
    document.getElementById("avatar").src = "";
    document.getElementById("username-display").textContent = "";
    document.getElementById("full-name").textContent = "";
    document.getElementById("bio").textContent = "";
    document.getElementById("location").textContent = "";
    document.getElementById("repo-count").textContent = "";
    document.getElementById("followers-count").textContent = "";
    document.getElementById("following-count").textContent = "";
    document.getElementById("github-link").href = "";
    document.getElementById("error-message").textContent = message;
}
