import http from "../utils/http";


export const getProfile = (id) => {
    return http.post(`/users/profile/${id}`);
}

