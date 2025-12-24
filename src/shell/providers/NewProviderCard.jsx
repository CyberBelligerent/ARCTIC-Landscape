import { useState } from "react";
import axios from "axios";
import "./ProviderView.css";
import NewProviderModal from "./NewProviderModal";

function NewProviderCard() {

    const [isOpen, setIsOpen] = useState(false);

    function handleClick() {
        // Create a modal to add a provider
        setIsOpen(true);
    };

    function handleSubmit(e) {
        e.preventDefault();
        // Submit new provider data to backend
        setIsOpen(false);
        const newProvider = {'name' : e.target[0].value, 'domain': e.target[1].value};
        axios.post("http://localhost:8080/range-api/v1/profile/providers", newProvider, { withCredentials: true })
            .then(() => {
                console.log("Provider added successfully");
            })
            .catch((error) => {
                console.log("Error adding provider:", error);
            });
    }

    return (
        <>
            {isOpen && (
                <NewProviderModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
            )}
            <div onClick={handleClick} className="provider_card template">
                Add Provider
            </div>
        </>
    );
}

export default NewProviderCard;