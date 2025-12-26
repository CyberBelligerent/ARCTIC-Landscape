import axios from "axios";

function ProviderCard({ reload, name, status, service, errorMessage, config }) {

	function handleDelete() {
		const deleteName = {
			name: name
		};
		axios.delete("http://localhost:8080/range-api/v1/profile/providers", deleteName, {withCredentials: true })
			.then(() => {
				console.log("Provider deleted successfully");
				reload(true);
			})
			.catch((error) => {
				console.log("Error deleting provider:", error);
			});
	};

	function testConnection() {
		const name = {
			name: name
		};
		axios.post("http://localhost:8080/range-api/v1/profile/test-connection", name, {withCredentials: true})
		.then(() => {
			console.log("Tested connection to provider...")
			reload(true);
		})
		.catch((error) => {
			console.log("Error testing connection:", error);
		});
	}

    return (
        <div className="provider_card solid">
			<div className="provider_header">
				<span className="provider_name">{name}</span>
				<span className={`provider_status ${status}`}>{status}</span>
			</div>
			<div className="provider_information">
				<p className="provider_header_text">{service}</p>
				<p className="provider_error"></p>
				<p className="provider_error_message">{errorMessage}</p>
			</div>
			<div className="provider_settings">
				<p className="provider_header_text">Configuration</p>

				{ config && Object.keys(config).length > 0 && Object.keys(config).map((key, index) => (
						<div key={index} className="provider_setting">
							<span className="provider_setting_key">{key}</span>
							<span className="provider_setting_value">{config[key]}</span>
						</div>
					))
				}
			</div>
			<div className="provider_buttons">
				<button className="provider_profile" onClick={handleDelete}>Delete Profile</button>
				<button className="provider_profile" onClick={testConnection}>Test Connection</button>
				<button className="provider_profile">Edit Profile</button>
			</div>
		</div>
    );
}
export default ProviderCard;