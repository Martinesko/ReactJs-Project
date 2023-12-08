import * as request from '../lib/request';

const baseUrl = 'http://localhost:3030/data/comments';

export const getAll = async (id) => {
    const query = new URLSearchParams({
        where: `productId="${id}"`,
        load: `owner=_ownerId:users`,
    });

    const result = await request.get(`${baseUrl}?${query}`);

    return result;
};

export const create = async (productId, comment) => {
    const newComment = await request.post(baseUrl, {
        productId,
        comment,
    });

    return newComment;
};