const dbOptions = {
  host: "api.github.com",
  pathPrefix: "",
  protocol: "https",
  owner: "mrcanelas",
  repo: "my-databases",
  path: "lobo-guara.json",
};

const GithubDB = require("github-db").default;
const githubDB = new GithubDB(dbOptions);
githubDB.auth(process.env.PERSONALACCESSTOKEN)
githubDB.connectToRepo();

async function getUrls(id, season, episode) {
  return githubDB.find().then((results) => {
      return JSON.parse(results).map(el => {
          return el.value
          .replace("id", id)
          .replace("season", season)
          .replace("episode", episode)
      })
  });
}
module.exports = { getUrls };