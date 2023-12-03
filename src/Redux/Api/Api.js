import Axios from "axios";

const Api = Axios.create({
	// baseURL: "http://localhost:5000/api",
	baseURL: "https://order-food-0hlv.onrender.com/api",
});

export default Api;
