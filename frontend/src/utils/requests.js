export const postRequest = async ({ url, body }) => {


    try {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(body)

        });
        const promise = await res.json()
        return { response: promise, status: res.status }
    } catch (error) {
        return { response: error, status: error.status }
    }




}
