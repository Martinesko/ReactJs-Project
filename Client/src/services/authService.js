import * as request from "../lib/request";

const BaseUrl = "http://localhost:3030/users";

export async function login(email, password) {
    const result = await request.post(`${BaseUrl}/login`, {
        email,
        password
    });

    return result;
}

export async function register(email, password, profile) {
    const result = await request.post(`${BaseUrl}/register`, {
        email,
        password,
        profile
    });

    return result;
}

export async function logout() {
    await request.get(`${BaseUrl}/logout`);
}
export async function addLikedPost(userId, productId) {
    const userProfile = await request.get(`${BaseUrl}/data/${userId}`);

    console.log("hello");
    console.log(userId);

    const likedPosts = userProfile.likedPosts || [];

    likedPosts.push(productId);

    await request.put(`${BaseUrl}/user/${userId}/profile`, {likedPosts});
}
export async function getLikedPosts(userId) {
    const userProfile = await request.get(`${BaseUrl}/user/${userId}`);
    return userProfile.likedPosts;
}