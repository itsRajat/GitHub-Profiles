const apiURL = "https://api.github.com/users/";

const main = document.querySelector("#main");
const form = document.querySelector("#form");
const search = document.querySelector("#search");

console.log(form);
console.log(search);

const getUser = async (username) => {
  try {
    const { data } = await axios.get(`${apiURL}${username}`);
    createCard(data);
    getRepos(username);
  } catch (err) {
    createErrorCard(
      "Specified user does not exist. Please check the username & try again."
    );
  }
};

const getRepos = async (username) => {
  try {
    const { data } = await axios.get(`${apiURL}${username}/repos`);
    addReposToCard(data);
  } catch (err) {
    createErrorCard("Failed to fetch repos.");
  }
};

const createErrorCard = (msg) => {
  const errorCardHTML = `
    <div class="card">${msg}</div>`;

  main.innerHTML = errorCardHTML;
};

const createCard = (data) => {
  const cardHTML = `
    <div class="card">
        <div>
          <img
            src="${data.avatar_url}"
            alt=""
            class="avatar"
          />
        </div>
        <div class="user-info">
          <h2>${data.name}</h2>
          <p>
          ${data.bio}
          </p>

          <ul>
            <li>${data.followers} <strong>Followers</strong></li>
            <li>${data.following} <strong>Following</strong></li>
            <li>${data.public_repos} <strong>Repos</strong></li>
          </ul>

          <div id="repos">
            
          </div>
        </div>
      </div>
    `;

  if (data) {
    main.innerHTML = cardHTML;
  }
};

const addReposToCard = (repos) => {
  const reposEl = document.querySelector("#repos");
  console.log(reposEl);

  repos.slice(0, 10).forEach((repo) => {
    const repoEl = document.createElement("a");
    repoEl.classList.add("repo");
    repoEl.href = repo.html_url;
    repoEl.innerText = repo.name;
    repoEl.target = "_blank";

    reposEl.appendChild(repoEl);
  });
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = search.value;

  if (user) {
    getUser(user);
  } else
    createErrorCard(
      "The search box is empty. You must enter a username to display results."
    );
});
