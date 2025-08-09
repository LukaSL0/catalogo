export type Vinho = {
    id: number;
    slug: string;
    produtor: string;
    imagem: string;
    nome: string;
    descricao: string;
    tipo: string;
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
    [key: string]: any;
};

export type Produtor = {
    ordem: number;
    produtor: string;
    imagem: string;
    regiao: string;
    descricao: string;
    [key: string]: any;
};