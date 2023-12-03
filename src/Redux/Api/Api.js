import Axios from "axios";

const Api = Axios.create({
	// baseURL: "http://localhost:5000/api",
	baseURL: "https://asp-foa-node.onrender.com/api",
});

export default Api;
