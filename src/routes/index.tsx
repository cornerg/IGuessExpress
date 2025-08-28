import {createFileRoute, redirect} from '@tanstack/react-router';

export const Route = createFileRoute('/')({
    component: Index,
    beforeLoad: () => {
        redirect({to: "/ticket", throw: true})
    }
})

function Index() {
    return <div id="wrapper"/>
}