function ProviderCard({ name, status, service, errorMessage, config }) {
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
				<div className="provider_setting"><span className="provider_setting_key">endpoint</span><span className="provider_setting_value">{config.endpoint}</span></div>
				<div className="provider_setting"><span className="provider_setting_key">username</span><span className="provider_setting_value">{config.username}</span></div>
				<div className="provider_setting"><span className="provider_setting_key">password</span><span className="provider_setting_value">{config.password}</span></div>
				<div className="provider_setting"><span className="provider_setting_key">projectId</span><span className="provider_setting_value">{config.projectId}</span></div>
			</div>
			<div className="provider_buttons">
				<button className="provider_profile">Test Connection</button>
				<button className="provider_profile">Edit Profile</button>
			</div>
		</div>
    );
}
export default ProviderCard;