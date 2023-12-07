import * as request from "../lib/request";

const BaseUrl = "http://localhost:3030/users";

export async function login(email, password) {
    const result = await request.post(`${BaseUrl}/login`, {
        email,
        password
    });

    return result;
}

export async function register(email, password) {
    const result = await request.post(`${BaseUrl}/register`, {
        email,
        password,
    });

    return result;
}

export async function logout() {
    await request.get(`${BaseUrl}/logout`);
}
