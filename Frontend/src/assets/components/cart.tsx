import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from 'universal-cookie';

export type Item = {
    id: number;
    name: string;
    purity: number;
    price: number;
    rating: number;
};

export function Cart() {
    const [cartItems, setCartItems] = useState<Item[] | null>(null);

    useEffect(() => {
        loadCart();
    }, []);

    async function loadCart() {
        try {
            const cookie = new Cookies();
            const tokenkun = cookie.get("token");

            const reresponse = await fetch(`http://localhost:3000/auth/id`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${tokenkun}`,
                },
                body: JSON.stringify({ token: tokenkun}),
            });
            let id = await reresponse.json();

            const response = await fetch(`http://localhost:3000/cart/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${tokenkun}`,
                },
            });
            const data = await response.json();
            console.log(data);

            setCartItems(data.items);

        } catch (error) {
            console.error("Failed to load cart:", error);
        }
    }

    async function removeFromCart(id: number) {
        try {
            const cookie = new Cookies();
            const tokenkun = cookie.get("token");

            const reresponse = await fetch(`http://localhost:3000/auth/id`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${tokenkun}`,
                },
                body: JSON.stringify({ token: tokenkun}),
            });
            let userid = await reresponse.json();

            const response = await fetch(`http://localhost:3000/cart/${userid}/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${tokenkun}`,
                },
            });

            if (response.ok) {
                console.log("Item removed from cart");
                loadCart();
            } else {
                console.error("Failed to remove item from cart:", await response.text());
            }
        } catch (error) {
            console.error("Error while removing item from cart:", error);
        }
    }

    async function clearCart() {
        try {
            const cookie = new Cookies();
            const tokenkun = cookie.get("token");

            const reresponse = await fetch(`http://localhost:3000/auth/id`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${tokenkun}`,
                },
                body: JSON.stringify({ token: tokenkun}),
            });
            let userid = await reresponse.json();

            const response = await fetch(`http://localhost:3000/cart/${userid}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${tokenkun}`,
                },
            });

            if (response.ok) {
                console.log("All items removed from cart");
                loadCart();
            } else {
                console.error("Failed to clear cart:", await response.text());
            }
        } catch (error) {
            console.error("Error while clearing cart:", error);
        }
    }

    return (
        <div className="container my-4 d-flex flex-column justify-content-start" style={{ minHeight: '100vh', minWidth: '70vw' }}>
            <h1 className="mb-4">Your Cart</h1>

            <button className="btn btn-danger mb-3" onClick={clearCart}>Clear Cart</button>

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
                                        <button 
                                            className="btn btn-danger" 
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            Remove from Cart
                                        </button>
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