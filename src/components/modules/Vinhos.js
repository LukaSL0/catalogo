import { Link } from "react-router-dom";

export default function Footer(props) {

    return (
        <>
            <div className="catalogo__vinhos">
                {props.produtor.map(vinho => (
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
        </>
    )
}