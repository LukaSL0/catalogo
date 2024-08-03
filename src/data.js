import Api from "./Api";

const infoProdutores = await Api.get("/produtores");
const infoCatalogo = await Api.get("/catalogo");

const produtores = infoProdutores.data;
const catalogo = infoCatalogo.data;

export { produtores, catalogo };