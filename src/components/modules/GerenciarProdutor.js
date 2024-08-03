import React, { useState, useEffect } from "react";
import { produtores } from "../../data";
import Api from "../../Api";

export default function GerenciarProdutor({ isOpen, onClose, produtor, adicionando }) {
    const [nomeProdutor, setNomeProdutor] = useState("");
    const [imagemURL, setImagemURL] = useState(produtor?.imagem || "");
    const [regiao, setRegiao] = useState("");
    const [descricao, setDescricao] = useState("");

    useEffect(() => {
        if (produtor) {
            setNomeProdutor(produtor.produtor || "");
            setImagemURL(produtor.imagem || "");
            setRegiao(produtor.regiao || "");
            setDescricao(produtor.descricao || "");
        }
    }, [produtor]);

    if (!isOpen) return null;
    
    const resetStates = () => {
        setNomeProdutor("");
        setImagemURL("");
        setRegiao("");
        setDescricao("");
    }

    const handleCriar = async () => {
        const maxOrdem = produtores.reduce((max, produtor) => Math.max(max, produtor.ordem), 0);
        const ordem = maxOrdem + 1;

        const novoProdutor = {
            ordem,
            produtor: nomeProdutor,
            imagem: imagemURL,
            regiao,
            descricao
        }

        const payload = {
            produtor: novoProdutor
        };
    
        try {
            await Api.post("/admin/add-produtor", payload);

            const timeout = setTimeout(() => {
                resetStates();
                window.location.reload();
            }, 1000); // 1.0s

            return () => clearTimeout(timeout);
        } catch (error) {
            console.error(error);
        }
    }

    const handleSalvar = async () => {
        const ordem = produtor.ordem;

        const novoProdutor = {
            ordem,
            produtor: nomeProdutor,
            imagem: imagemURL,
            regiao,
            descricao
        }

        const payload = {
            produtor: novoProdutor
        }

        try {
            await Api.post("/admin/edit-produtor", payload);

            const timeout = setTimeout(() => {
                window.location.reload();
            }, 1000); // 1.0s
    
            return () => clearTimeout(timeout);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeletar = async () => {
        const ordem = produtor.ordem;

        try {
            await Api.delete(`/admin/delete-produtor/${ordem}`);

            const timeout = setTimeout(() => {
                resetStates();
                window.location.reload();
            }, 1000); // 1.0s
    
            return () => clearTimeout(timeout);
        } catch (error) {
            console.error(error);
        }
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
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


    return (
        <>
            <div className="gerenciarprodutor">
                <div className="gerenciarprodutor__content">
                    <span onClick={onClose}>&times;</span>
                    <h2>Gerenciando produtor</h2>
                    <div className="gerenciarprodutor__content__imagem">
                        <label htmlFor="images" className="drop-container">
                            <span className="drop-title">Arraste a imagem para cá</span>
                            ou
                            <input type="file" id="images" accept="image/*" onChange={handleImageUpload} required />
                        </label>
                        <img src={imagemURL} alt={produtor.produtor} />
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
        </>
    );
}
