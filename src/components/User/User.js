import React from 'react';
import Loading from '../Loading/Loading';

import { signInStates,
        sendHttpGetReq,
        getLargerProfPic } from "../../util.js"

const user = (props) => {
    function signInHandler() {
        sendHttpGetReq("/get_req_token")
        .then(res => {
            let req_token = res;

            let url = new URL("https://api.twitter.com/oauth/authenticate");
            url.searchParams.set("oauth_token", req_token.oauth_token);
            props.signInWindowHandlers.open(url);
        });
    }

    let elem;
    if (props.signInState == signInStates.VERIFYING) elem = <Loading />;
    else if (props.signInState == signInStates.SIGNED_IN) {
        elem = (
            <div id="signed-in" className="nonclickable">
                Signed in as 
                <img id="user-pic" src={
                    getLargerProfPic(props.user.profile_image_url_https)
                } />
            </div>
        );
    } else if (props.signInState == signInStates.SIGNED_OUT) {
        elem = (
            <button id="login-btn"
            className="big-button" 
            onClick={() => signInHandler()}>
                Sign in
            </button>
        );
    }

    return <div id="sign-in">{elem}</div>;
}

export default user;
