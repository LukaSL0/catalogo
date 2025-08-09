export default function Footer() {

    return (
        <>
            <footer>
                <div className="imagem">
                    <img src="/assets/logo-branca.webp" alt="Logo" />
                </div>
                <div className="redes">
                    <a href="https://www.instagram.com/" className="redes__instagram" target="_blank" rel="noreferrer">
                        <i className="fab fa-instagram"></i> instagram
                    </a>
                    <a href="https://wa.me/" className="redes__whatsapp" target="_blank" rel="noreferrer">
                        <i className="fab fa-whatsapp"></i> (00) 0 0000-0000
                    </a>
                    <a href="mailto:google@gmail.com" className="redes__email" target="_blank" rel="noreferrer">
                        <i className="fas fa-envelope"></i> google@gmail.com
                    </a>
                    <a href="https://www.facebook.com/" className="redes__facebook" target="_blank" rel="noreferrer">
                        <i className="fab fa-facebook"></i> Facebook
                    </a>
                </div>
            </footer>
        </>
    )
}