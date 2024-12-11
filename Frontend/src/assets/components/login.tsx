import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export function Login() {
    const [identification, setIdentification] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ identification }),
            });

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error("User not found");
                }
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            setSuccessMessage("Login successful!");
            setErrorMessage("");
            console.log("User Data:", data);
        } catch (error: any) {
            console.error("Login failed:", error);
            setErrorMessage(error.message || "Login failed. Please try again.");
            setSuccessMessage("");
        }
    };

    return (
        <div className="container my-4">
            <h1 className="mb-4">Login</h1>

            {successMessage && (
                <div className="alert alert-success" role="alert">
                    {successMessage}
                </div>
            )}
            {errorMessage && (
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="identification" className="form-label">
                        Identification
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="identification"
                        value={identification}
                        onChange={(e) => setIdentification(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Login
                </button>
            </form>
        </div>
    );
}
