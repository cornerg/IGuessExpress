import { createRootRoute, Outlet } from '@tanstack/react-router'
import "../styles/text.css";
import "../App.css";
import "../index.css";
import "../styles/layout.css";
import "../App.css";
import "../styles/imports.css";
import Header from "../components/header.tsx";
import backgroundImage from "../assets/images/trainBG1.png";

function Root() {
    return (
        <>
            <Header/>
            <div id="wrapper" style={{backgroundImage: `url(${backgroundImage})`}}>
                <Outlet/>
            </div>
        </>
    )
}

export const Route = createRootRoute({
    component: Root,
})