export default function Footer() {

    return (
        <>
            <footer>
                <div className="imagem">
                    <img src="/assets/logo-branca.webp" alt="Logo" />
                </div>
                <div className="redes">
                    <a href="https://www.instagram.com/felicella.antonio" className="redes__instagram" target="_blank" rel="noreferrer">
                        <i className="fab fa-instagram"></i> felicella.antonio
                    </a>
                    <a href="https://wa.me/+5582981019427" className="redes__whatsapp" target="_blank" rel="noreferrer">
                        <i className="fab fa-whatsapp"></i> (82) 98101-9427
                    </a>
                    <a href="mailto:felicellavino@gmail.com" className="redes__email" target="_blank" rel="noreferrer">
                        <i className="fas fa-envelope"></i> felicellavino@gmail.com
                    </a>
                    <a href="https://www.facebook.com/profile.php?id=61559014004928&mibextid=LQQJ4d" className="redes__facebook" target="_blank" rel="noreferrer">
                        <i className="fab fa-facebook"></i> Felicella Vino
                    </a>
                </div>
            </footer>
        </>
    )
}