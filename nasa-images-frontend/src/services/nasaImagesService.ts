const nasaImagesService = async ({
        url = '',
        auth = '',
        body = {},
        method = 'GET'
    }): Promise<[boolean, unknown, number]> => {

    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth}`
    };

    const options = {
        method: method,
        headers: headers,
        body: JSON.stringify(body)
    };

    try {
        const response = await fetch(url, method === 'GET' ? { method, headers } : { ...options });
        const parseResponse = await response.json();
        
        return [response.ok, parseResponse.detail, response.status];
        
    } catch (error) {
        return [false, `error - ${error}`, 0];
    }
};

export default nasaImagesService;
