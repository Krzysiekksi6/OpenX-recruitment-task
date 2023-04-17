import axios from "axios";

const URL = `https://fakestoreapi.com/carts/?startdate=2000-01-01&enddate=2023-04-07`

export const handleCarts = async () => {
    try {
        const response = await axios.get(URL);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
