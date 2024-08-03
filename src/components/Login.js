import { useState, useRef } from "react"
import Api from "../Api.js";

export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("");

    const response = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const info = {
                username,
                password,
            }

            const res = await Api.post("/login", info);

            localStorage.setItem('_token', res.data.token);
            window.location.reload();
        } catch (err) {
            response.current.classList.remove('hidden');
        }
    }

    return (
        <>
            <section className="login">
                <div className="login__box">
                    <h1>Login</h1>
                    <p>Faça seu login para continuar</p>

                    <form action="" onSubmit={(e) => (handleSubmit(e))}>
                        <label htmlFor="username">Nome de Usuário <span className="importante">*</span></label>
                        <input type="text" name="username" onChange={(e) => {setUsername(e.target.value)}} placeholder="Digite o usuário" required />
                        <label htmlFor="password">Senha <span className="importante">*</span></label>
                        <input type="password" name="password" onChange={(e) => {setPassword(e.target.value)}} placeholder="Digite a senha" required />

                        <button type="submit" className="loadingbtn">Login</button>
                        <span className="importante hidden" ref={response}>Usuário ou senha incorretos.</span>
                    </form>
                </div>
            </section>
        </>
    )
}