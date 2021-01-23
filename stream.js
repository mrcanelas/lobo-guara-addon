var axios = require("axios").default;

async function getMeta(imdbId, tmdbToken = "e4e9c05e1c65b5dc20e239cae5a88b2c") {
    try {
        var meta = (
            await axios.get(
                `https://api.themoviedb.org/3/find/${imdbId}?api_key=${tmdbToken}&language=en-US&external_source=imdb_id`
            )
        ).data;
    } catch (error) {
        console.error(`The MovieDB id retrieval failed with http status ${error.response.status}`);
    }
    return meta.tv_results[0];
}

module.exports = { getMeta };
