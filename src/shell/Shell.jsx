import "./Shell.css";
import ShellLinks from "./ShellLinks";

function DashboardShell({ children }) {
    return (
        <div className="wrapper">
            <div className="menu">
                <div className="header">
                    <p>ARCTIC</p>
                </div>

                <ShellLinks />
                
                <div className="recent">
                    <p>Recent Changes</p>
                    <ul>
                        <li className="change_link">Example Range 1</li>
                    </ul>
                </div>
            </div>

            <div className="main_body">
                <div className="header">
                    <div className="information">
                        <button className="profile">Profile</button>
                    </div>
                </div>
                
                <div className="content">
                    {children}
                </div>
            </div>

        </div>
    );
};

export default DashboardShell;