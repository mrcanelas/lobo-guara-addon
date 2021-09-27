const dbOptions = {
  host: "api.github.com",
  pathPrefix: "",
  protocol: "https",
  owner: "mrcanelas",
  repo: "my-databases",
  path: "lobo-guara.json",
};

const axios = require("axios");
const GithubDB = require("github-db").default;
const githubDB = new GithubDB(dbOptions);
githubDB.auth(process.env.PERSONALACCESSTOKEN);
githubDB.connectToRepo();

const headers = { "Content-Type": "application/x-www-form-urlencoded" };
const META_ENDPOINT = process.env.ENDPOINT;
const DATA = [process.env.HOSTDATA, process.env.HOST2DATA];

DATA.map((host) => {
  axios.post(META_ENDPOINT, host, { headers }).then((data) => {
    githubDB.update(
      { key: parseHost(new URL(data.data.LIVETV[0].episode_url).pathname) },
      { value: parseURL(data.data.LIVETV[0].episode_url) },
      { multi: true, upsert: true }
    );
  });
});

function parseURL(url) {
  return url
    .replace(/\n/g, "")
    .replace("71712", "id")
    .replace("82856", "id")
    .replace("1.mp4", "episode.mp4")
    .replace("/1/", "/season/");
}

function parseHost(host) {
  return host.replace(/[/]/g, "").replace(/.php/g, "");
}
