function getUrls(id, season, episode) {
    const url = `http://pixconection.xyz/host04.php?b=tv/${id}/${season}/dub/${episode}.mp4`;
    const url2 = `http://pixconection.xyz/host06.php?b=thor/${id}/${season}/dub/${episode}.mp4`;
    return { url, url2 };
}
module.exports = { getUrls };
