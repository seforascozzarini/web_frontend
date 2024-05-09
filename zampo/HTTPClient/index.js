import Client from './client'
import authentication from './authentication'


export default function (_settings) {
    let settings = _settings
    if (settings === undefined)
        settings = useAppConfig().HTTPClient
    const client = Client(settings)

    const addPathParams = (path, params) => {
        let url = path
        for (const param in params) {
            url = url.replace(`<${param}>`, params[param])
        }
        return url
    }

    const composeUrl = (path, options) => {
        let baseURL = settings.baseURL
        if (options?.baseURL)
            baseURL = options.baseURL
        const url = `${baseURL}${path}`
        if (options.pathParams)
            return addPathParams(url, options.pathParams)
        return url
    }

    /**
     * GET request using global client
     * @param {String} url 
     * @param {HttpOptions} options 
     * @returns {Promise<HttpReponse>} 
     */
    async function get(path, options) {
        const _options = { ...options, method: 'GET' }
        return client.fetch(composeUrl(path, options), _options)
    }

    /**
     * POST request using global client
     * @param {String} url 
     * @param {HttpOptions} options 
     * @returns {Promise<HttpReponse>}
     */
    async function post(path, options) {
        const _options = { ...options, method: 'POST' }
        return await client.fetch(composeUrl(path, options), _options)
    }

    /**
     * PATCH request using global client
     * @param {String} url 
     * @param {HttpOptions} options 
     * @returns {Promise<HttpReponse>}
     * * error: true if the request failed, false otherwise
     */
    async function patch(path, options) {
        const _options = { ...options, method: 'PATCH' }
        return client.fetch(composeUrl(path, options), _options)
    }

    /**
     * PUT request using global client
     * @param {String} url  
     * @param {HttpOptions} options 
     * @returns {Promise<HttpReponse>}
     */
    async function put(path, options) {
        const _options = { ...options, method: 'PUT' }
        return client.fetch(composeUrl(path, options), _options)
    }

    /**
     * DELETE request using global client
     * @param {String} url  
     * @param {HttpOptions} options 
     * @returns {Promise<HttpReponse>}
     */
    async function del(path, options) {
        const _options = { ...options, method: 'DELETE' }
        return client.fetch(composeUrl(path, options), _options)
    }

    /**
     * Uploading files using global client. It converts the body to FormData before sending the request.
     * @param {String} url  
     * @param {HttpOptions} options 
     * @returns {Promise<HttpReponse>}
     */
    async function upload(path, options) {
        const _options = { ...options, method: 'POST' }
        const _body = new FormData()
        for (let key in _options.body) {
            _body.append(key, _options.body[key])
        }
        _options.body = _body
        _options.headers = {  }
        _options.replaceHeaders = true
        return client.fetch(composeUrl(path, options), _options)
    }

    let methods = {
        get,
        post,
        put,
        patch,
        del,
        upload
    }

    if (settings.useAuthentication) {
        methods = { ...methods, ...authentication(settings.authSettings) }
    }

    return methods


}