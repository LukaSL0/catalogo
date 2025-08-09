import Header from "./Header";
import Footer from "./modules/Footer";
import Vinhos from "./modules/Vinhos";
import { useEffect, useState } from 'react';
import { useData } from '../contexts/DataContext';
import { Link } from "react-router-dom";
import { Produtor, Vinho } from "./Types";
import Api from "../Api";

export default function Home() {
    const { produtores, catalogo } = useData();
    const [filteredVinhos, setFilteredVinhos] = useState<Vinho[]>([]);
    const [isRegiao, setIsRegiao] = useState(false);
    const [produtoresObject, setProdutoresObject] = useState<Produtor[]>([]);
    const [selectedPais, setSelectedPais] = useState("default");
    const [status, setStatus] = useState(true);
    const [noResult, setNoResult] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const res = await Api.get("/admin/status");
            setStatus(res.data);
        };
        fetchData();
    }, []);

    const handleSelectChange = (pais: string) => {
        setSelectedPais(pais);
        setNoResult(false);
        if (pais !== "default") {
            const vinhosByPais = catalogo.filter((vinho: Vinho) => vinho.pais === pais && vinho.visivel !== false);
            setFilteredVinhos(vinhosByPais);
        } else {
            setFilteredVinhos([]);
        }
    };

    const searchVinhos = (term: string) => {
        setIsRegiao(false);
        setSelectedPais("default");
        setNoResult(false);
        if (term.length === 0) {
            setFilteredVinhos([]);
            return;
        }

        const regiao = catalogo.filter((vinho: Vinho) => vinho.regiao.toLowerCase() === term.toLowerCase() && vinho.visivel !== false);
        const produtoresUnicos = [...new Set(regiao.map(v => v.produtor))];
        setProdutoresObject(produtores.filter(produtor => produtoresUnicos.includes(produtor.produtor)));
        if (regiao.length > 0) {
            setIsRegiao(true);
            setFilteredVinhos(regiao);
            return;
        }

        const vinhos = catalogo.filter((vinho: Vinho) => vinho.nome.toLowerCase().includes(term.toLowerCase()) && vinho.visivel !== false);
        if (vinhos.length === 0) {
            setFilteredVinhos([]);
            setNoResult(true);
            return;
        }

        setFilteredVinhos(vinhos);
    };

    return (
        <>
            <Header onSearch={searchVinhos} onSelectChange={handleSelectChange} />
            <section className="catalogo">
                {!status ? (
                    <h1 className="semresultado">Nosso catálogo está em manutenção temporária, pedimos desculpas pelo ocorrido.</h1>
                ) : selectedPais !== "default" ? (
                    <div className="catalogo__vinhos">
                        {filteredVinhos.length > 0 && filteredVinhos.map(vinho => (
                            <div key={vinho.id}>
                                <div className="catalogo__vinhos__card">
                                    <Link to={`/vinho/${vinho.slug}`}>
                                        <div>
                                            <img src={vinho.imagem} alt={vinho.nome} />
                                        </div>
                                        <div className="catalogo__vinhos__card__textos">
                                            <p>{vinho.nome}</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : isRegiao ? (
                    produtoresObject.map((item, index) => (
                        <div key={index}>
                            <div className="catalogo__regiao">
                                <div className="catalogo__regiao__img">
                                    <img src={item.imagem} alt="Produtor" />
                                </div>
                                <div className="catalogo__regiao__textos">
                                    <h1>{item.produtor}</h1>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M18 10.8289C18 12.4864 16.6575 13.8289 15 13.8289C13.3425 13.8289 12 12.4864 12 10.8289C12 9.17136 13.3425 7.82886 15 7.82886C16.6575 7.82886 18 9.17136 18 10.8289ZM15 25.5C15 25.5 7.5 15 7.5 10.5C7.5 6.3645 10.8645 3 15 3C19.1355 3 22.5 6.3645 22.5 10.5C22.5 15 15 25.5 15 25.5ZM15 0C9.201 0 4.5 4.701 4.5 10.5C4.5 16.299 15 30 15 30C15 30 25.5 16.299 25.5 10.5C25.5 4.701 20.799 0 15 0Z" fill="black"/>
                                        </svg>
                                        {item.regiao}
                                    </span>
                                    <p>{item.descricao}</p>
                                </div>
                            </div>
                            <Vinhos produtor={catalogo.filter((vinho: Vinho) => vinho.produtor === item.produtor)} />
                        </div>
                    ))
                ) : noResult ? (
                    <h1 className="semresultado">Ops! Não encontramos nenhum vinho com este nome em nosso banco de dados.</h1>
                ) : filteredVinhos.length === 0 ? (
                    produtores.map((item, index) => (
                        <div key={index}>
                            <div className="catalogo__regiao">
                                <div className="catalogo__regiao__img">
                                    <img src={item.imagem} alt="Produtor" />
                                </div>
                                <div className="catalogo__regiao__textos">
                                    <h1>{item.produtor}</h1>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M18 10.8289C18 12.4864 16.6575 13.8289 15 13.8289C13.3425 13.8289 12 12.4864 12 10.8289C12 9.17136 13.3425 7.82886 15 7.82886C16.6575 7.82886 18 9.17136 18 10.8289ZM15 25.5C15 25.5 7.5 15 7.5 10.5C7.5 6.3645 10.8645 3 15 3C19.1355 3 22.5 6.3645 22.5 10.5C22.5 15 15 25.5 15 25.5ZM15 0C9.201 0 4.5 4.701 4.5 10.5C4.5 16.299 15 30 15 30C15 30 25.5 16.299 25.5 10.5C25.5 4.701 20.799 0 15 0Z" fill="black"/>
                                        </svg>
                                        {item.regiao}
                                    </span>
                                    <p>{item.descricao}</p>
                                </div>
                            </div>
                            <Vinhos produtor={catalogo.filter((vinho: Vinho) => vinho.produtor === item.produtor)} />
                        </div>
                    ))
                ) : (
                    <div className="catalogo__vinhos">
                        {filteredVinhos.map(vinho => (
                            <div key={vinho.id}>
                                <div className="catalogo__vinhos__card">
                                    <Link to={`/vinho/${vinho.slug}`}>
                                        <div>
                                            <img src={vinho.imagem} alt={vinho.nome} />
                                        </div>
                                        <div className="catalogo__vinhos__card__textos">
                                            <p>{vinho.nome}</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
            <Footer />
        </>
    );
}