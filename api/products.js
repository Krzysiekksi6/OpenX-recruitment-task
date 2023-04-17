import axios from "axios";

const URL = `https://fakestoreapi.com/products`

export const handleProducts = async () => {
    try {
        const response = await axios.get(URL);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
