import { Link } from "react-router-dom";
import { Vinho } from "../Types";

type VinhosProps = {
    produtor: Vinho[];
};

export default function Vinhos({ produtor }: VinhosProps) {
    return (
        <div className="catalogo__vinhos">
            {produtor.map(vinho => (
                <div className="catalogo__vinhos__card" key={vinho.id}>
                    <Link to={`/vinho/${vinho.slug}`}>
                        <div>
                            <img src={vinho.imagem} alt={vinho.nome} />
                        </div>
                        <div className="catalogo__vinhos__card__textos">
                            <p>{vinho.nome}</p>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    )
}