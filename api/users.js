import axios from "axios";

const URL = `https://fakestoreapi.com/users`
export const handleUsers = async () => {
    try {
        const response = await axios.get(URL);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
