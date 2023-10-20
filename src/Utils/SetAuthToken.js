import Api from "../Redux/Api/Api";

const SetAuthToken = (token) => {
	if (token) {
		localStorage.setItem("foa-token", token);
		Api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	} else {
		localStorage.removeItem("foa-token");
		delete Api.defaults.headers.common["Authorization"];
	}
};

export default SetAuthToken;
