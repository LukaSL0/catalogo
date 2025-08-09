import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import Api from "../../Api";
import { useData } from "../../contexts/DataContext";

type Vinho = {
    id: number;
    slug: string;
    imagem: string;
    nome: string;
    descricao: string;
    tipo: string;
    produtor: string;
    pais: string;
    regiao: string;
    uva: string;
    cor: string;
    perfume: string;
    paladar: string;
    harmonizacao: string;
    temperatura: string;
    alcool: string;
    cliente: string;
    visivel?: boolean;
};

type VinhoProps = {
    isOpen: boolean;
    onClose: () => void;
    vinho: Vinho | null;
    adicionando: boolean;
};

export default function GerenciarVinho({ isOpen, onClose, vinho, adicionando }: VinhoProps) {
    const { catalogo } = useData();
    const [slug, setSlug] = useState<string>("");
    const [imagemURL, setImagemURL] = useState<string>(vinho?.imagem || "");
    const [nome, setNome] = useState<string>("");
    const [descricao, setDescricao] = useState<string>("");
    const [tipo, setTipo] = useState<string>("");
    const [nomeProdutor, setNomeProdutor] = useState<string>("");
    const [pais, setPais] = useState<string>("");
    const [regiao, setRegiao] = useState<string>("");
    const [uva, setUva] = useState<string>("");
    const [cor, setCor] = useState<string>("");
    const [perfume, setPerfume] = useState<string>("");
    const [paladar, setPaladar] = useState<string>("");
    const [harmonizacao, setHarmonizacao] = useState<string>("");
    const [temperatura, setTemperatura] = useState<string>("");
    const [alcool, setAlcool] = useState<string>("");
    const [valor, setValor] = useState<string>("");
    const [visivel, setVisivel] = useState<boolean>(true);
    const inputStatus = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (vinho) {
            setSlug(vinho.slug || "");
            setImagemURL(vinho.imagem || "");
            setNome(vinho.nome || "");
            setDescricao(vinho.descricao || "");
            setTipo(vinho.tipo || "");
            setNomeProdutor(vinho.produtor || "");
            setPais(vinho.pais || "");
            setRegiao(vinho.regiao || "");
            setUva(vinho.uva || "");
            setCor(vinho.cor || "");
            setPerfume(vinho.perfume || "");
            setPaladar(vinho.paladar || "");
            setHarmonizacao(vinho.harmonizacao || "");
            setTemperatura(vinho.temperatura || "");
            setAlcool(vinho.alcool || "");
            setValor(vinho.cliente || "");
            setVisivel(vinho.visivel !== undefined ? vinho.visivel : true);
        } else {
            resetStates();
        }
    }, [vinho]);

    useEffect(() => {
        if (inputStatus.current !== null) {
            inputStatus.current.checked = visivel;
        }
    }, [visivel, isOpen]);

    if (!isOpen) return null;

    const resetStates = () => {
        setSlug("");
        setImagemURL("");
        setNome("");
        setDescricao("");
        setTipo("");
        setNomeProdutor("");
        setPais("");
        setRegiao("");
        setUva("");
        setCor("");
        setPerfume("");
        setPaladar("");
        setHarmonizacao("");
        setTemperatura("");
        setAlcool("");
        setValor("");
        setVisivel(true);
    };

    const handleCriar = async () => {
        const maxId = catalogo.reduce((max: number, vinho: Vinho) => Math.max(max, vinho.id), 0);
        const id = maxId + 1;

        const novoVinho: Vinho = {
            id,
            slug,
            imagem: imagemURL,
            nome,
            descricao,
            tipo,
            produtor: nomeProdutor,
            pais,
            regiao,
            uva,
            cor,
            perfume,
            paladar,
            harmonizacao,
            temperatura,
            alcool,
            cliente: valor,
            visivel
        };

        try {
            await Api.post("/admin/add-vinho", { vinho: novoVinho });
            setTimeout(() => {
                resetStates();
                window.location.reload();
            }, 1000);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSalvar = async () => {
        if (!vinho) return;
        const id = vinho.id;

        const novoVinho: Vinho = {
            id,
            slug,
            imagem: imagemURL,
            nome,
            descricao,
            tipo,
            produtor: nomeProdutor,
            pais,
            regiao,
            uva,
            cor,
            perfume,
            paladar,
            harmonizacao,
            temperatura,
            alcool,
            cliente: valor,
            visivel
        };

        try {
            await Api.post("/admin/edit-vinho", { vinho: novoVinho });
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeletar = async () => {
        if (!vinho) return;
        const id = vinho.id;

        try {
            await Api.delete(`/admin/delete-vinho/${id}`);
            setTimeout(() => {
                resetStates();
                window.location.reload();
            }, 1000);
        } catch (error) {
            console.error(error);
        }
    };

    const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "Censored");

        try {
            const response = await fetch(
                `Censored`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (response.ok) {
                const data = await response.json();
                setImagemURL(data.secure_url);
            } else {
                console.error("Failed to upload image");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    const handleLowerCaseChange = (event: ChangeEvent<HTMLInputElement>, setValue: (value: string) => void) => {
        const value = event.target.value.toLowerCase().replace(/[^a-z-]/g, "");
        setValue(value);
    };

    return (
        <div className="gerenciarvinho">
            <div className="gerenciarvinho__content">
                <span onClick={onClose}>&times;</span>
                <h2>Gerenciando vinho</h2>
                <div className="gerenciarvinho__content__imagem">
                    <label htmlFor="images" className="drop-container">
                        <span className="drop-title">Arraste a imagem para cá</span>
                        ou
                        <input type="file" id="images" accept="image/*" onChange={handleImageUpload} required />
                    </label>
                    <img src={imagemURL} alt={nomeProdutor} />
                </div>
                <div className="gerenciarvinho__content__info">
                    <input
                        type="text"
                        value={slug}
                        placeholder="URL"
                        onChange={(e) => handleLowerCaseChange(e, setSlug)}
                    />
                    <input
                        type="text"
                        value={nome}
                        placeholder="Nome"
                        onChange={(e) => setNome(e.target.value)}
                    />
                    <input
                        type="text"
                        value={descricao}
                        placeholder="Descrição"
                        onChange={(e) => setDescricao(e.target.value)}
                    />
                    <input
                        type="text"
                        value={tipo}
                        placeholder="Tipo"
                        onChange={(e) => setTipo(e.target.value)}
                    />
                    <input
                        type="text"
                        value={nomeProdutor}
                        placeholder="Produtor"
                        onChange={(e) => setNomeProdutor(e.target.value)}
                    />
                    <input
                        type="text"
                        value={pais}
                        placeholder="País de origem"
                        onChange={(e) => setPais(e.target.value)}
                    />
                    <input
                        type="text"
                        value={regiao}
                        placeholder="Região"
                        onChange={(e) => setRegiao(e.target.value)}
                    />
                    <input
                        type="text"
                        value={uva}
                        placeholder="Uvas"
                        onChange={(e) => setUva(e.target.value)}
                    />
                    <input
                        type="text"
                        value={cor}
                        placeholder="Cor"
                        onChange={(e) => setCor(e.target.value)}
                    />
                    <input
                        type="text"
                        value={perfume}
                        placeholder="Perfume"
                        onChange={(e) => setPerfume(e.target.value)}
                    />
                    <input
                        type="text"
                        value={paladar}
                        placeholder="Paladar"
                        onChange={(e) => setPaladar(e.target.value)}
                    />
                    <input
                        type="text"
                        value={harmonizacao}
                        placeholder="Harmonização"
                        onChange={(e) => setHarmonizacao(e.target.value)}
                    />
                    <input
                        type="text"
                        value={temperatura}
                        placeholder="Temperatura de serviço"
                        onChange={(e) => setTemperatura(e.target.value)}
                    />
                    <input
                        type="text"
                        value={alcool}
                        placeholder="Teor alcoólico"
                        onChange={(e) => setAlcool(e.target.value)}
                    />
                    <input
                        type="text"
                        value={valor}
                        placeholder="Preço (Cliente)"
                        onChange={(e) => setValor(e.target.value)}
                    />
                    <label className="toggle-switch">
                        <p>Visibilidade</p>
                        <input 
                            type="checkbox"
                            ref={inputStatus}
                            checked={visivel}
                            onChange={() => setVisivel(!visivel)}
                        />
                        <div className="toggle-switch__background">
                            <div className="toggle-switch__background__handle"></div>
                        </div>
                    </label>
                </div>
                {!adicionando ? (
                    <>
                        <button onClick={handleDeletar}>✗ DELETAR</button>
                        <button onClick={handleSalvar}>➔ SALVAR</button>    
                    </>
                ) : (
                    <button onClick={handleCriar}>+ ADICIONAR</button>
                )}
            </div>
        </div>
    );
}
