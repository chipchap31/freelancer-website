import { getCookie } from './cookie'
export const postRequest = async ({ url, body }) => {

    const res = await fetch(url, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify(body)

    });
    if (res.status !== 200) {
        throw await res.json()
    }

    return await res.json()





}
