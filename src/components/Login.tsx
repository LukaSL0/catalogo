import { useState, useRef, FormEvent } from "react";
import Api from "../Api";

export default function Login() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const response = useRef<HTMLSpanElement | null>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const info = { username, password };
            const res = await Api.post<{ token: string }>("/login", info);

            localStorage.setItem('_token', res.data.token);
            window.location.reload();
        } catch (err) {
            if (response.current) {
                response.current.classList.remove('hidden');
            }
        }
    };

    return (
        <>
            <section className="login">
                <div className="login__box">
                    <h1>Login</h1>
                    <p>Faça seu login para continuar</p>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Nome de Usuário <span className="importante">*</span></label>
                        <input
                            type="text"
                            name="username"
                            onChange={e => setUsername(e.target.value)}
                            placeholder="Digite o usuário"
                            required
                        />
                        <label htmlFor="password">Senha <span className="importante">*</span></label>
                        <input
                            type="password"
                            name="password"
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Digite a senha"
                            required
                        />
                        <button type="submit" className="loadingbtn">Login</button>
                        <span className="importante hidden" ref={response}>Usuário ou senha incorretos.</span>
                    </form>
                </div>
            </section>
        </>
    )
}