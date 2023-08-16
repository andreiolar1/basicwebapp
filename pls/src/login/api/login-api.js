import { HOST } from '../../commons/hosts';
import performRequest from "../../commons/api/rest-client";


const endpoint = {
    post_login: '/login',


};

function login(user, callback) {
    let request = new Request(HOST.backend_api + endpoint.post_login, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });

    console.log("URL: " + request.url);

    performRequest(request, callback);
}




export {
    login
};
