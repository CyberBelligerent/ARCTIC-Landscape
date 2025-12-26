import { useState } from "react";
import axios from "axios";
import "./ProviderView.css";
import NewProviderModal from "./NewProviderModal";

function NewProviderCard({ reload }) {

    const [isOpen, setIsOpen] = useState(false);

    function handleClick() {
        // Create a modal to add a provider
        setIsOpen(true);
    };

    return (
        <>
            {isOpen && (
                <NewProviderModal reload={reload} isOpen={isOpen} onClose={() => setIsOpen(false)} />
            )}
            <div onClick={handleClick} className="provider_card template">
                Add Provider
            </div>
        </>
    );
}

export default NewProviderCard;