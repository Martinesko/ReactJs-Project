import { useContext, useEffect } from "react"

import AuthContext from "../../contexts/context.js"

export default function Logout() {
    const { logoutHandler } = useContext(AuthContext);

    useEffect(() => {
        logoutHandler()
    } );

    return null;
}
