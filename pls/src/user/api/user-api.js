import {HOST} from '../../commons/hosts';
import performRequest from "../../commons/api/rest-client";


const endpoint = {
    get_users: '/user/',
    post_user: "/user/"
};

function getUsers(callback) {
    let request = new Request(HOST.backend_api + endpoint.get_users, {
        method: 'GET',
    });
    console.log(request.url);
   performRequest(request, callback);
}

function getUserById(params, callback){
    let request = new Request(HOST.backend_api + endpoint.get_users + params.id, {
       method: 'GET'
    });

    console.log(request.url);
    performRequest(request, callback);
}

function postUser(user, callback){
    let request = new Request(HOST.backend_api + endpoint.post_user , {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });

    console.log("URL: " + request.url);

    performRequest(request, callback);
}

export {
    getUsers,
    getUserById,
    postUser
};
