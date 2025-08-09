import { useEffect, useRef, useState } from 'react';
import GerenciarProdutor from './modules/GerenciarProdutor';
import GerenciarVinho from './modules/GerenciarVinho';
import Api from '../Api';
import { useData } from '../contexts/DataContext';
import { Produtor, Vinho } from './Types';

export default function Admin() {
    const { produtores, catalogo } = useData();
    const [isGerenciarProdutorOpen, setIsGerenciarProdutorOpen] = useState(false);
    const [adicionandoProdutor, setAdicionandoProdutor] = useState(false);
    const [selectedProdutor, setSelectedProdutor] = useState<Produtor | null>(null);

    const [isGerenciarVinhoOpen, setIsGerenciarVinhoOpen] = useState(false);
    const [adicionandoVinho, setAdicionandoVinho] = useState(false);
    const [selectedVinho, setSelectedVinho] = useState<Vinho | null>(null);

    const inputStatus = useRef<HTMLInputElement | null>(null);
    const [status, setStatus] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Api.get("/admin/status");
                setStatus(response.data);
                if (inputStatus.current) {
                    inputStatus.current.checked = response.data;
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const handleResetStatesProdutor = () => {
        setSelectedProdutor(null);
        setAdicionandoProdutor(false);
    };

    const handleResetStatesVinho = () => {
        setSelectedVinho(null);
        setAdicionandoVinho(false);
    };

    const handleStatus = async () => {
        const newStatus = !status;
        setStatus(newStatus);

        const payload = {
            online: newStatus
        };

        try {
            await Api.post("/admin/change-status", payload);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <section className="admin">
                <div className="admin__panel">
                    <div className="admin__panel__produtores">
                        <h1>Produtores</h1>
                        <label className="toggle-switch__admin">
                            <p>Catálogo</p>
                            <input 
                                type="checkbox"
                                ref={inputStatus}
                                checked={status}
                                onChange={handleStatus}
                            />
                            <div className="toggle-switch__admin__background">
                                <div className="toggle-switch__admin__background__handle"></div>
                            </div>
                        </label>
                        <div className="admin__panel__produtores__itens">
                            {produtores.map((item, index) => (
                                <div key={index}>
                                    <button
                                        className="botaoprodutor"
                                        onClick={() => {
                                            setSelectedProdutor(item);
                                            setIsGerenciarProdutorOpen(true);
                                        }}
                                    >
                                        <img src={item.imagem} alt={item.produtor} />
                                    </button>
                                </div>
                            ))}
                            <div className='add'>
                                <button
                                    className="add__btn"
                                    onClick={() => {
                                        setAdicionandoProdutor(true);
                                        setIsGerenciarProdutorOpen(true);
                                    }}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="admin__panel__vinhos">
                        <h1>Catálogo</h1>
                        <div className="admin__panel__vinhos__itens">
                            {catalogo.map((item, index) => (
                                <div key={index}>
                                    <button
                                        className="botaovinho"
                                        onClick={() => {
                                            setSelectedVinho(item);
                                            setIsGerenciarVinhoOpen(true);
                                        }}
                                    >
                                        <img src={item.imagem} alt={item.produtor} />
                                        <p>{item.nome}</p>
                                    </button>
                                </div>
                            ))}
                            <div className='add'>
                                <button
                                    className="add__btn"
                                    onClick={() => {
                                        setAdicionandoVinho(true);
                                        setIsGerenciarVinhoOpen(true);
                                    }}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <GerenciarProdutor 
                isOpen={isGerenciarProdutorOpen} 
                onClose={() => {
                    setAdicionandoProdutor(false);
                    setIsGerenciarProdutorOpen(false);
                    handleResetStatesProdutor();
                }}
                produtor={selectedProdutor}
                adicionando={adicionandoProdutor}
            />
            <GerenciarVinho
                isOpen={isGerenciarVinhoOpen} 
                onClose={() => {
                    setAdicionandoVinho(false);
                    setIsGerenciarVinhoOpen(false);
                    handleResetStatesVinho();
                }}
                vinho={selectedVinho}
                adicionando={adicionandoVinho}
            />
        </>
    )
}