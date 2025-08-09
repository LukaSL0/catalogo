import React, { useState, KeyboardEvent, ChangeEvent } from "react";

type PasswordModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onUnlock: () => void;
};

export default function PasswordModal({ isOpen, onClose, onUnlock }: PasswordModalProps) {
    const [password, setPassword] = useState<string>("");

    const handleUnlock = () => {
        if (password === "Censored") {
            onUnlock();
            onClose();
        } else if (password === "Censored") {
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

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
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
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button onClick={handleUnlock}>OK</button>
            </div>
        </div>
    );
}
