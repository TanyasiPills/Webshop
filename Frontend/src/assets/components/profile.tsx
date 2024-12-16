import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

export function Profile() {
    const [formData, setFormData] = useState({
        username: "", 
        password: "",
    });

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [userId, setUserId] = useState<number>(9999999);
    const [tokenkunkun, setTokenkunkun] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
         const fetchdata = async() =>{
            load();
            console.log('loaded')
        }
        fetchdata();
    }, []);

    async function load(){
        try{
            const cookie = new Cookies();
            const tokenkun = cookie.get("token");

            setTokenkunkun(tokenkun);

            const reresponse = await fetch(`http://localhost:3000/auth/id`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${tokenkun}`,
                },
                body: JSON.stringify({ token: tokenkun}),
            });
            let userid = await reresponse.json();
            setUserId(userid);

            const response = await fetch(`http://localhost:3000/user/${userid}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${tokenkun}`,
                },
            });

            const heo = await response.json();
            formData.username = heo.username;
            formData.password = heo.password; 
            setEmail(heo.email);
        }
        catch (error) {
            console.error(error);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/user/${userId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${tokenkunkun}`,
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password,
                    email: email,
                }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            setSuccessMessage("Modification successful!");
            setErrorMessage("");
        } catch (error) {
            console.error("Registration failed:", error);
            setErrorMessage("Registration failed. Please try again.");
            setSuccessMessage("");
        }
    };

    return (
        <div className="container my-4">
            <h1 className="mb-4">Profil szerlesztés</h1>

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
                    <label htmlFor="username" className="form-label">
                        Username
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Password
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Modify
                </button>
            </form>
        </div>
    );
}
