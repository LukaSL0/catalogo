import React, { useEffect, useState, useRef } from "react";
import PasswordModal from "./modules/PasswordModal";

export default function Header({ onSearch, onSelectChange }) {
    const [isFixed, setIsFixed] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [pais, setPais] = useState("");
    // eslint-disable-next-line
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const inputTimer = useRef(null);

    const handleSearch = (value) => {
        setPais("default");
        clearTimeout(inputTimer.current);
        inputTimer.current = setTimeout(() => {
            onSearch(value);
        }, 250);
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsFixed(window.scrollY > 70);
        };

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const unlocked = localStorage.getItem("isUnlocked") === "true";
        setIsUnlocked(unlocked);
    }, []);

    const handleUnlock = () => {
        setIsUnlocked(true);
        localStorage.setItem("isUnlocked", "true");
    };

    return (
        <>
            <header className="header-home">
                <nav className={isFixed ? 'fixed' : ''}>
                    <a href="/"><img src="/assets/logo-branca.webp" alt="Logo" /></a>
                    <div className="select">
                        <select
                            value={pais}
                            onChange={(e) => {
                                setPais(e.target.value);
                                onSelectChange(e.target.value);
                            }}
                        >
                            <option value="default">Nenhum</option>
                            <option value="Itália">Italianos</option>
                            <option value="França">Franceses</option>
                        </select>
                    </div>
                    {(windowWidth < 550) ? (
                        <input
                            type="text"
                            placeholder="🔎︎"
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    ) : (
                        <input
                            type="text"
                            placeholder="🔎︎ O que busca?"
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    )}
                </nav>
                <div>
                    <h1>Catálogo 2024</h1>
                    <button
                        onClick={() => {
                            if (!isUnlocked) setIsModalOpen(true);
                        }}
                        style={isUnlocked ? { display: 'none' } : {}}
                    >
                        Acesse nossos valores
                    </button>
                </div>
            </header>
            <PasswordModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onUnlock={handleUnlock} 
            />
        </>
    );
}
