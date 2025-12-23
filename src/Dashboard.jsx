import { useAuth } from "./AuthProvider.jsx";
import { useEffect, useState } from "react";
import DashboardShell from "./shell/Shell.jsx";
import ProviderView from "./shell/providers/ProviderView.jsx";

function Dashboard() {

    // Make sure to check if the user is logged in before loading page
    const { loggedIn, authReady } = useAuth();
    const [ activeView, setActiveView ] = useState("providers");

    useEffect(() => {
        if(authReady && !loggedIn) {
            window.location.href = "/";
        }
    }, [ authReady, loggedIn ]);

    if(!authReady) return <h1>Loading...</h1>;
    if(!loggedIn) return null;

    function renderActiveView(name) {
        switch(name) {
            case "home":
                return <h1>Home View</h1>;
            case "providers":
                return <ProviderView />;
            default:
                return <h1>Dashboard View</h1>;
        }
    }

    return (
        <>
            <DashboardShell>
                { renderActiveView(activeView) }
            </DashboardShell>
        </>
    );
}

export default Dashboard;