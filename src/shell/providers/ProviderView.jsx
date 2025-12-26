import { useEffect, useState } from "react";
import ProviderCard from "./ProviderCard";
import NewProviderCard from "./NewProviderCard";
import "./ProviderView.css";
import axios from "axios";

function ProviderView() {

    const [loading, setLoading] = useState(true);
    const [providers, setProviders] = useState([]);
    const [reloadFlag, setReloadFlag] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:8080/range-api/v1/profile/providers", { withCredentials: true })
            .then((response) => {
                console.log("Fetched providers:", response.data);
                setProviders(response.data);
            })
            .catch((error) => {
                console.log("Error fetching providers:", error);
            })
            .finally(() => {
                setLoading(false);
                setReloadFlag(false);
            });
    }, [reloadFlag]);

    return (
        <div className="provider_cards">
			{ !loading && providers && providers.map((provider) => (
				<ProviderCard key={provider.name} reload={setLoading} name={provider.name} status={provider.status} service={provider.domain} errorMessage={provider.errorMessage} config={provider.values} />
			)) }

            <NewProviderCard reload={setReloadFlag} />
		</div>
    );
}

export default ProviderView;