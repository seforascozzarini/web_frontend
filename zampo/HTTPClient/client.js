import authentication from './authentication'

export default function (settings) {
    const { authenticateRequest } = authentication(settings.authSettings)

    // onResponse interceptor builder
    function _onResponse(options) {
        let parser = options.responseParser ?? settings.responseParser ?? ((data, error, status) => data)
        return ({ request, response, options }) => {
            const data = { data: response?._data ?? {} }
            data.status = response.status
            data.statusText = response.statusText
            data.error = !response.ok
            response._data = data
        }

    }

    // onResponseError interceptor builder
    function _onResponseError(options) {
        let handler = options.onErrorResponse ?? settings.onErrorResponse
        return ({ request, response, options }) => {
            if (handler) {
                handler(response._data, response.status)
            }
        }
    }

    // onRequest interceptor builder
    function _onRequest(options) {
        return ({ request, options }) => {
            if (options.replaceHeaders) {
                options.headers = options.headers
            }
            else {
                options.headers = {
                    ...settings.commonHeaders,
                    ...options.headers,
                }
            }
            // perform authentication if needed
            if (settings.useAuthentication &&
                (options.useAuthentication === true || options.useAuthentication === undefined)) {
                authenticateRequest(options)
            }
        }
    }

    /**
     * This function is used to make requests to the server.
     * It is a wrapper around the useFetch composable.
     * @param {String} url 
     * @param {Object} options 
     * Structure of the options object:
     *  * method: the method of the request [GET, POST, PUT, PATCH, DELETE]
     *  * params: the query params of the request
     *  * body: the body of the request
     *  * headers: additional headers for the request - can be used to override the common headers
     *  * useAuthentication: boolean, if true, the request will be authenticated (if the user is logged in) 
     *  * responseParser: a function to parse the response - can be used to override the default response parser
     *  * onErrorResponse: a function to handle the error response - can be used to override the default error handler
     * @returns {Promise} An object with the following structure:
     * * data: the data returned by the server (parsed by the responseParser)
     * * status: the status code of the request
     * * statusText: the status text of the request
     * * error: true if the request failed, false otherwise
     */
    async function fetch(url, options) {
        // adding interceptors
        options.onRequest = _onRequest(options)
        options.onResponse = _onResponse(options)
        options.onResponseError = _onResponseError(options)

        // since ssr is not supported yet, we will disable it
        options.server = false
        const resp = await useFetch(url, options)
        if (resp.status.value === 'success')
            return resp.data.value
        return resp.error.value.data
    }

    return {
        fetch,
    }

}