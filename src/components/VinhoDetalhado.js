import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";
import { catalogo } from "../data.js";
import Footer from "./modules/Footer";

function VinhoDetalhado() {
    const { name } = useParams();
    const vinho = catalogo.find(vinho => vinho.slug.replace(/ /g, "-") === name);
    const [isUnlocked, setIsUnlocked] = useState(false);
    const headerRef = useRef(null);

    useEffect(() => {
        const unlocked = localStorage.getItem("isUnlocked") === "true";
        setIsUnlocked(unlocked);

        const timeout = setTimeout(() => {
            if (headerRef.current) {
                headerRef.current.scrollIntoView({ behavior: "smooth" });
            }
        }, 200); // 0.2s

        return () => clearTimeout(timeout);
    }, []);

    return (
        <>
            {vinho ? (
                <>
                    <header className="header-vinhodetalhado" ref={headerRef}>
                        <nav>
                            <a href="/"><img src="/assets/logo-branca.webp" alt="Logo" /></a>
                        </nav>
                    </header>
                    <div className="banner">
                        <h1>{vinho.produtor}</h1>
                    </div>
                    <section className="especificacoes">
                        <div className="especificacoes__foto">
                            <img src={vinho.imagem} alt={vinho.nome} />
                        </div>
                        <div className="especificacoes__textos">
                            <div className="especificacoes__textos__titulo">
                                <h1>{vinho.nome}</h1>
                            </div>
                            <div className="especificacoes__textos__info">
                                <div className="especificacoes__textos__info__descricao">
                                    <p>{vinho.descricao}</p>
                                </div>
                                <div className="especificacoes__textos__info__tipo">
                                    <h3>Tipo</h3>
                                    <span>{vinho.tipo}</span>
                                </div>
                                <div className="especificacoes__textos__info__produtor">
                                    <h3>Produtor</h3>
                                    <span>{vinho.produtor}</span>
                                </div>
                                <div className="especificacoes__textos__info__pais">
                                    <h3>País</h3>
                                    <span>{vinho.pais}</span>
                                </div>
                                <div className="especificacoes__textos__info__regiao">
                                    <h3>Região</h3>
                                    <span>{vinho.regiao}</span>
                                </div>
                                <div className="especificacoes__textos__info__uva">
                                    <h3>Uva</h3>
                                    <span>{vinho.uva}</span>
                                </div>
                                <div className="especificacoes__textos__info__cor">
                                    <h3>Cor</h3>
                                    <span>{vinho.cor}</span>
                                </div>
                                <div className="especificacoes__textos__info__perfume">
                                    <h3>Perfume</h3>
                                    <span>{vinho.perfume}</span>
                                </div>
                                <div className="especificacoes__textos__info__paladar">
                                    <h3>Paladar</h3>
                                    <span>{vinho.paladar}</span>
                                </div>
                                <div className="especificacoes__textos__info__harmonizacao">
                                    <h3>Harmonização</h3>
                                    <span>{vinho.harmonizacao}</span>
                                </div>
                                <div className="especificacoes__textos__info__temperatura">
                                    <h3>Temperatura de Serviço</h3>
                                    <span>{vinho.temperatura}</span>
                                </div>
                                <div className="especificacoes__textos__info__alcool">
                                    <h3>Teor Alcoólico</h3>
                                    <span>{vinho.alcool}</span>
                                </div>
                                {
                                    isUnlocked ? (
                                        <div className="especificacoes__textos__info__preco">
                                            <h3>Preço</h3>
                                            <span>{vinho.cliente}</span>
                                            <p>(Valor à vista)</p>
                                        </div>
                                    ) : (<></>)
                                }
                            </div>
                        </div>
                    </section>
                    <Footer />
                </>
            ) : (
                <NotFound />
            )}
        </>
    );
}

export default VinhoDetalhado;
