import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export type Item = {
    id: number;
    name: string;
    purity: string;
    price: number;
    rating: number;
}

export function ProductListing(){
    const [data, setData] = useState<Item[] | null>(null);

    useEffect(() => {
        load();
        console.log('loaded')
    }, []);

    async function load() {
        const response = await fetch('http://localhost:3000/item');
        setData(await response.json());
    }

    return(<>
        <div className="container my-4">
            <h1 className="mb-4">Product Listing</h1>

            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search for products..."
                />
            </div>

            <div className="row">
                {data && data.length > 0 ? (
                    data.map((item) => (
                        <div className="col-md-4 mb-4" key={item.id}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">Purity: {item.purity}</h6>
                                    <p className="card-text">Price: ${item.price.toFixed(2)}</p>
                                    <p className="card-text">Rating: {item.rating} / 5</p>
                                    <button className="btn btn-primary">Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Loading products...</p>
                )}
            </div>
        </div>
    </>);
}