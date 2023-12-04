import * as request from "../lib/request";

const BaseUrl = "http://localhost:3030/data/products";

export  const getProducts = async () =>{
    const result = await request.get(BaseUrl);

    return Object.values(result);
}
export  const getUserProducts = async (UserId) =>{
    const result = await request.get(`${BaseUrl}`);
    console.log(UserId);
    return Object.values(result).filter(x=>x.creatorId===UserId);
}
export  const getProduct = async (_id) => {
    const result = await request.get(`${BaseUrl}/${_id}`,);

    return result;
}
export const create = async (productData) => {
    const result = await request.post(BaseUrl, productData);

    return result;
};
