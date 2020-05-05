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



export const getRequest = async ({ url, auth }) => {
    let res;

    if (!auth) {
        res = await fetch(url);
    }

    res = await fetch(url, {
        headers: {
            'Authorization': `Token ${sessionStorage.getItem('token')}`
        }
    });

    if (res.status !== 200) {
        throw await res.json();
    }
    return await res.json();
}