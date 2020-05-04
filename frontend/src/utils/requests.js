import { getCookie } from './cookie'
export const postRequest = async ({ url, body }) => {
    console.log(getCookie('csrftoken'));


    try {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: JSON.stringify(body)

        });
        const promise = await res.json()
        return { response: promise, status: res.status }
    } catch (error) {
        return { response: error, status: error.status }
    }




}
