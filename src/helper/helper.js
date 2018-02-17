import localforage from 'localforage'

const parseToken = async () => {
    const token = await getToken()
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace('-', '+').replace('_', '/')
    return JSON.parse(window.atob(base64))
}

const getToken = async () => {
    const token = await localforage.getItem('token')
    return token
}

const removeToken = () => (
    localforage.removeItem('token')
)

export default {
    parseToken,
    removeToken
}
