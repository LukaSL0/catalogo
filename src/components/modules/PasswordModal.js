import React, { useState } from "react";

export default function PasswordModal({ isOpen, onClose, onUnlock }) {
    const [password, setPassword] = useState("");

    const handleUnlock = () => {
        // eslint-disable-next-line
        if (password == "Napoli") {
            onUnlock();
            onClose();
        // eslint-disable-next-line
        } else if (password == "Catalogo24") {
            const link = document.createElement('a');
            link.href = '/assets/CatalogoRevendedor.xlsx';
            link.download = 'Catálogo 2024 Revendedor.xlsx';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            onClose();
        } else {
            alert("Senha incorreta!");
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleUnlock();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal__content">
                <span onClick={onClose}>&times;</span>
                <h2>Digite sua senha</h2>
                <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button onClick={handleUnlock}>OK</button>
            </div>
        </div>
    );
}
