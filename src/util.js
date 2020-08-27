const apiURL = "https://1poxidle5i.execute-api.us-west-2.amazonaws.com/production";
export async function sendHttpGetReq(endpoint) {
    let response = await fetch(apiURL + endpoint, { credentials: "include" });
    response = await response.json();
    return response;
}
