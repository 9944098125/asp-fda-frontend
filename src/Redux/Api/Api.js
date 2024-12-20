import Axios from "axios";

const Api = Axios.create({
	// baseURL: "http://localhost:5000/api",
	baseURL: "https://asp-fda-backend-production.up.railway.app/api",
});

export default Api;
