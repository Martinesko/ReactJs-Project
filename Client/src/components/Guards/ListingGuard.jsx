import { useContext } from "react"
import { Outlet, useNavigate, useParams } from "react-router-dom";

import AuthContext from "../../contexts/context.js"

import * as productService from '../../services/productService.js';

export default function ListingGuard() {
    const { userId } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();

    productService.getProduct(id)
        .then(result => {
            if (result._ownerId != userId) {
                navigate('/listings');
            }
        });

    return <Outlet />;
}