export const postRequest = async ({ url, body }) => {



    const res = await fetch(url, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(body)

    });

    const promise = await res.json()
    return promise
}
