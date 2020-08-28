import React from 'react';
import { sendHttpGetReq, signInStates } from "../../util.js"

const user = (props) => {
    function signInHandler(signInWindow) {
        sendHttpGetReq("/get_req_token")
        .then(res => {
            console.log(signInWindow);
            let req_token = res;
            // console.log(req_token);

            let url = new URL("https://api.twitter.com/oauth/authenticate");
            url.searchParams.set("oauth_token", req_token.oauth_token);
            // console.log(url);

            props.signInWindowHandlers.open(url);

            // let params = "menubar=no,toolbar=no,width=600,height=600";
            // signInWindow = window.open(url, "test", params);
        });
    }

    let elem;
    if (props.signInState == signInStates.VERIFYING) {
        elem = <p className="nonclickable">Loading</p>;
    } else if (props.signInState == signInStates.SIGNED_IN) {
        elem = (
            <div id="signed-in" className="nonclickable">
                Signed in as
                <img id="user-pic" src={props.user.profile_image_url_https} />
            </div>
        );
    } else if (props.signInState == signInStates.SIGNED_OUT) {
        elem = (
            <button id="login-btn"
            className="big-button" 
            onClick={() => signInHandler(props.signInWindow)}>
                Sign in
            </button>
        );
    }

    return <div id="sign-in">{elem}</div>;
}

export default user;
