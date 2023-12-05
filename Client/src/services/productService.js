import * as request from "../lib/request";

const baseUrl = "http://localhost:3030/data/products";

export  const getProducts = async () =>{
    const result = await request.get(baseUrl);

    return Object.values(result);
}
export  const getUserProducts = async (UserId) =>{
    const result = await request.get(`${baseUrl}`);
    console.log(UserId);
    return Object.values(result).filter(x=>x._ownerId===UserId);
}
export  const getProduct = async (_id) => {
    const result = await request.get(`${baseUrl}/${_id}`,);

    return result;
}
export const create = async (productData) => {
    const result = await request.post(baseUrl, productData);
    return result;
};
export const removeProduct = async (_id) => {
    console.log(_id);
    await request.remove(`${baseUrl}/${_id}`);
    return null;

};
export const edit = async (_id,productData) => {
    const result = await request.put(`${baseUrl}/${_id}`, productData);

    return result;

};

