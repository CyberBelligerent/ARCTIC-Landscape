import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "./ProviderView.css";

function NewProviderModal({ reload, isOpen, onClose }) {
    const [profileName, setProfileName] = useState("");
    const [configOptions, setConfigOptions] = useState(null);
    const [selectedProvider, setSelectedProvider] = useState("");
    // const [providerOptions, setProviderOptions] = useState([]);
    const [profileValues, setProfileValues] = useState({});

    useEffect(() => {
        axios.get("http://localhost:8080/range-api/v1/profile/providers/list", { withCredentials: true })
            .then((response) => {
                console.log("Fetched providers:", response.data);
                setConfigOptions(response.data);
            })
            .catch((error) => {
                console.log("Error fetching providers:", error);
            })
    }, []);

    const providerOptions = useMemo(() => {
        if(!configOptions || !selectedProvider) return [];
        return configOptions[selectedProvider] ?? [];
    }, [configOptions, selectedProvider]);

    useEffect(() => {
        if(!providerOptions.length) return;

        setProfileValues((prev) => {
            const next = { ...prev };
            for(const opt of providerOptions) {
                if(next[opt.key] === undefined) next[opt.key] = "";
            }
            return next;
        });
    }, [providerOptions]);

    function handleClose() {
        onClose();
    }

    function handleSubmit(e) {
        e.preventDefault();
        const newProvider = { 
            name: profileName, 
            domain: selectedProvider,
            status: "Error",
            values: profileValues 
        };
        axios.post("http://localhost:8080/range-api/v1/profile/providers", newProvider, { withCredentials: true })
            .then((e) => {
                console.log("Provider added successfully");
                console.log(e);
                onClose();
            })
            .catch((error) => {
                console.log("Error adding provider:", error);
            })
            .finally(() => {
                reload(true);
            });
    }

    function handleProviderSwitch(e) {
        e.preventDefault();

        if(e.target.value === '-') {
            setSelectedProvider("");
            // setProfileValues({});
            return;
        }

        setSelectedProvider(e.target.value);
        // setProviderOptions(configOptions[e.target.value]);
    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal_card">
                <h2>Add New Provider</h2>
                <form>
                    <label htmlFor="select_provider">Provider</label>
                    <select id="select_provider" value={selectedProvider} onChange={handleProviderSwitch} name="selectedProvider">
                        <option value="-">---</option>
                        { configOptions && Object.keys(configOptions).map((keyName) => (
                            <option key={keyName} value={keyName}>{keyName}</option>
                        )) }
                    </select>

                    <input id="name" value={profileName} type="text" placeholder="Profile Name" required={true} onChange={(e) => setProfileName(e.target.value)} />
                    
                    { providerOptions && providerOptions.map((option) => (
                        <div key={option.key}>
                            <label htmlFor={option.key}>{option.key}</label>
                            <input id={option.key} value={profileValues[option.key] ?? ""} type="text" placeholder={option.key} required={option.required} onChange={(e) => 
                                setProfileValues(prev => ({
                                    ...prev,
                                    [option.key]: e.target.value
                                }))
                            } />
                        </div>
                    ))}
                    
                    <button onClick={handleSubmit}>Add Provider</button>
                    <button onClick={handleClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
}
export default NewProviderModal;