import axios from "axios";

export const handleData = async (URL) => {
    try {
        const response = await axios.get(URL);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
