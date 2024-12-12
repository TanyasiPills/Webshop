import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export type Item = {
    id: number;
    name: string;
    purity: number;
    price: number;
    rating: number;
};

export function Cart() {
    const [cartItems, setCartItems] = useState<Item[] | null>(null);
    const userId = 123; // Replace with the actual user ID.

    useEffect(() => {
        loadCart();
    }, []);

    async function loadCart() {
        try {
            const response = await fetch(`http://localhost:3000/cart/${userId}`);
            const data = await response.json();
            setCartItems(data);
        } catch (error) {
            console.error("Failed to load cart:", error);
        }
    }

    return (
        <div className="container my-4">
            <h1 className="mb-4">Your Cart</h1>

            {cartItems ? (
                cartItems.length > 0 ? (
                    <div className="row">
                        {cartItems.map((item) => (
                            <div className="col-md-4 mb-4" key={item.id}>
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{item.name}</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">
                                            Purity: {(item.purity * 100).toFixed(1)}%
                                        </h6>
                                        <p className="card-text">Price: ${item.price.toFixed(2)}</p>
                                        <p className="card-text">Rating: {item.rating} / 5</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Your cart is empty.</p>
                )
            ) : (
                <p>Loading your cart...</p>
            )}
        </div>
    );
}