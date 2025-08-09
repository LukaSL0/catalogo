import React, { useState, useEffect, ChangeEvent } from "react";
import Api from "../../Api";
import { useData } from "../../contexts/DataContext";
import { Produtor } from "../Types";

type GerenciarProdutorProps = {
    isOpen: boolean;
    onClose: () => void;
    produtor: Produtor | null;
    adicionando: boolean;
};

export default function GerenciarProdutor({ isOpen, onClose, produtor, adicionando }: GerenciarProdutorProps) {
    const { produtores } = useData();
    const [nomeProdutor, setNomeProdutor] = useState<string>("");
    const [imagemURL, setImagemURL] = useState<string>(produtor?.imagem || "");
    const [regiao, setRegiao] = useState<string>("");
    const [descricao, setDescricao] = useState<string>("");

    useEffect(() => {
        if (produtor) {
            setNomeProdutor(produtor.produtor ?? "");
            setImagemURL(produtor.imagem ?? "");
            setRegiao(produtor.regiao ?? "");
            setDescricao(produtor.descricao ?? "");
        } else {
            resetStates();
        }
    }, [produtor]);

    if (!isOpen) return null;

    const resetStates = (): void => {
        setNomeProdutor("");
        setImagemURL("");
        setRegiao("");
        setDescricao("");
    };

    const handleCriar = async (): Promise<void> => {
        const maxOrdem = produtores.reduce((max, p) => Math.max(max, p.ordem), 0);
        const ordem = maxOrdem + 1;

        const novoProdutor: Produtor = {
            ordem,
            produtor: nomeProdutor,
            imagem: imagemURL,
            regiao,
            descricao,
        };

        try {
            await Api.post("/admin/add-produtor", { produtor: novoProdutor });
            setTimeout(() => {
                resetStates();
                window.location.reload();
            }, 1000);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSalvar = async (): Promise<void> => {
        if (!produtor) return;
        const ordem = produtor.ordem;

        const novoProdutor: Produtor = {
            ordem,
            produtor: nomeProdutor,
            imagem: imagemURL,
            regiao,
            descricao,
        };

        try {
            await Api.post("/admin/edit-produtor", { produtor: novoProdutor });
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeletar = async (): Promise<void> => {
        if (!produtor) return;
        const ordem = produtor.ordem;

        try {
            await Api.delete(`/admin/delete-produtor/${ordem}`);
            setTimeout(() => {
                resetStates();
                window.location.reload();
            }, 1000);
        } catch (error) {
            console.error(error);
        }
    };

    const handleImageUpload = async (
        event: ChangeEvent<HTMLInputElement>
    ): Promise<void> => {
        const file = event.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "Censored");

        try {
            const response = await fetch(`Censored`, {
                method: "POST",
                body: formData,
            });

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

    return (
        <div className="gerenciarprodutor">
            <div className="gerenciarprodutor__content">
                <span onClick={onClose}>&times;</span>
                <h2>Gerenciando produtor</h2>
                <div className="gerenciarprodutor__content__imagem">
                    <label htmlFor="images" className="drop-container">
                        <span className="drop-title">Arraste a imagem para cá</span>
                        ou
                        <input
                            type="file"
                            id="images"
                            accept="image/*"
                            onChange={handleImageUpload}
                            required
                        />
                    </label>
                    <img src={imagemURL} alt={nomeProdutor} />
                </div>
                <div className="gerenciarprodutor__content__info">
                    <input
                        type="text"
                        value={nomeProdutor}
                        placeholder="Produtor"
                        onChange={(e) => setNomeProdutor(e.target.value)}
                    />
                    <input
                        type="text"
                        value={regiao}
                        placeholder="Região"
                        onChange={(e) => setRegiao(e.target.value)}
                    />
                    <input
                        type="text"
                        value={descricao}
                        className="descricaoprodutor"
                        placeholder="Descrição"
                        onChange={(e) => setDescricao(e.target.value)}
                    />
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
