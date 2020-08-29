
const apiURL = "https://1poxidle5i.execute-api.us-west-2.amazonaws.com/production";
export async function sendHttpGetReq(endpoint) {
    let response = await fetch(apiURL + endpoint, { credentials: "include" });
    response = await response.json();
    return response;
}

export function getVids(tweets) {
    let vids = [];

    if (tweets.length > 0) { // if tweets were returned
        tweets.forEach(tweet => {
            let entities = tweet.extended_entities;
            let thumbnail = tweet.entities.media[0].media_url_https;

            let variants = entities.media[0].video_info.variants; // parse through video metadata
            let max_bitrate = -1;
            let vid = variants[0];

            variants.forEach(variant => {
                if (variant.bitrate > max_bitrate) {
                    max_bitrate = variant.bitrate;
                    vid = variant;
                }
            });

            vids.push({ vid: vid.url, thumbnail: thumbnail });
        });
    }

    return vids;
}

export const signInStates = {
    VERIFYING: "verifying",
    SIGNED_IN: "signed in",
    SIGNED_OUT: "signed out"
};

export const dashboardStates = {
    TL: "timeline",
    ACCS: "accs"
};


export const tabToggleStyle = {
    color: "#638897",
    backgroundColor: "#ffffc9",
    padding: "12px",
    borderStyle: "solid",
    cursor: "auto"
}
