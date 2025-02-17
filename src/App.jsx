import { useState, useEffect } from 'react'

import './App.css'
import { Outlet } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import Header from "./components/Header/Header"
import Footer from "./components/footer/Footer"
import authService from './appwrite/auth'
import Logo from "./components/Logo"
import Loader from './components/Loader'

function App() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        authService
            .getCurrentUser()
            .then((userData) => {
                if (userData) dispatch(login({ userData }));
                else dispatch(logout());
            })
            .finally(() => setLoading(false));
    }, [dispatch]);
    useEffect(() => {
        // Check if the script is already in the document
        if (!document.getElementById('chatbase-script')) {
            // Create the configuration script tag
            const configScript = document.createElement('script');
            configScript.id = 'chatbase-config';
            configScript.innerHTML = `
            window.embeddedChatbotConfig = {
              chatbotId: "Yp3oLdyYMZBIVRudn1Gx7",
              domain: "www.chatbase.co"
            }
          `;
            document.body.appendChild(configScript);

            // Create the chatbot embed script tag
            const script = document.createElement('script');
            script.id = 'chatbase-script';
            script.src = 'https://www.chatbase.co/embed.min.js';
            script.setAttribute('chatbotId', 'Yp3oLdyYMZBIVRudn1Gx7');
            script.setAttribute('domain', 'www.chatbase.co');
            script.defer = true;
            document.body.appendChild(script);
        }
    }, []);
    return !loading ? (
        <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
            <div className="w-full block">
                <Header />
                <main>
                    <Outlet />
                </main>
            </div>
            <div className="w-full block">
                <Footer />
            </div>
        </div>
    ) : null;
}

export default App
