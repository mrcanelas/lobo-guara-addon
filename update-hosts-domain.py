import requests
import sys
import os
META_ENDPOINT = os.environ.get("META_ENDPOINT")
HOST_REQUEST = os.environ.get("HOST_REQUEST")
HOST2_REQUEST = os.environ.get("HOST2_REQUEST")
def request_url(data):
    response = requests.post(META_ENDPOINT,data=data, headers={"Content-Type":"application/x-www-form-urlencoded","Connection":"keep-alive","Accept-Encoding":"gzip","Host":"teste.cinevision.site","Accept-Charset":"utf-8"})
    return response.json()["LIVETV"][0]['episode_url'].strip()
def extract_template_from(uri: str):
    if "71712" in uri:
        uri = uri.replace("71712","${id}")
    elif "82856" in uri:
        uri = uri.replace("82856","${id}")
    else:
        raise RuntimeError("Could not find TMDB id on uri")
    uri = uri.replace("1.mp4","${episode}.mp4")
    uri = uri.replace("/1/","/${season}/")
    return uri

try:
    url = extract_template_from(request_url(HOST_REQUEST))
    url2 = extract_template_from(request_url(HOST2_REQUEST))
except RuntimeError as e:
    print(e,file=sys.stderr)
    sys.exit(1)
    
print(f"""function getUrls(id, season, episode) {{
    const url = `{url}`;
    const url2 = `{url2}`;
    return {{ url, url2 }};
}}
module.exports = {{ getUrls }};""")