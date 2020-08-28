const apiURL = "https://1poxidle5i.execute-api.us-west-2.amazonaws.com/production";
export async function sendHttpGetReq(endpoint) {
    let response = await fetch(apiURL + endpoint, { credentials: "include" });
    response = await response.json();
    return response;
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
