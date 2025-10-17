import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome to the Digital Certificate Generator.</p>
            
            <nav className="dashboard-nav">
                <h3>Core Features</h3>
                <ul>
                    <li>
                        <Link to="/templates">Manage Certificate Templates</Link>
                    </li>
                    {/* We will add more links here for future modules */}
                </ul>
            </nav>
        </div>
    );
};

export default Dashboard;