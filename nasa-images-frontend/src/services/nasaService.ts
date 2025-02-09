const nasaService = async (page: number) => {

    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=${page}&api_key=${import.meta.env.VITE_NASA_KEY}`
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    };

    const options = {
        method: 'GET',
        headers: headers
    };


    try {
        const response = await fetch(url, options);
        const parseResponse = await response.json();

        if (parseResponse.response === null) {
            return parseResponse;
        }
        if (parseResponse.status === 200) {
            return parseResponse.status;
        }
        return parseResponse;
    } catch (error) {
        console.error('🚀 ~ error:', error);
        throw error;
    }
};

export default nasaService;
