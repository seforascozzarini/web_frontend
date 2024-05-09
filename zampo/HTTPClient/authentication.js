import HTTPClient from '../HTTPClient'
import dayjs from 'dayjs'

export default function (settings) {
    const _settings = settings.tokenAuthenticationSettings

    const token = () => localStorage.getItem(_settings.tokenStorageKey)
    const tokenExpire = () => localStorage.getItem(_settings.tokenExpireStorageKey)

    /**
     * invalidate the authentication session locally
     */
    function endLocalSession() {
        localStorage.removeItem(_settings.tokenStorageKey)
        localStorage.removeItem(_settings.tokenExpireStorageKey)
    }

    /**
     * Basic authentication login using the username and password
     * @param {String} username 
     * @param {String} password 
     * @returns {Promise} the response object from the request
     */
    async function login(username, password) {
        endLocalSession()
        const loginHeader = {}
        loginHeader[_settings.headerKey] = `Basic  ${window.btoa(username + ':' + password)}`
        const response = await HTTPClient().post(settings.paths.login, { headers: loginHeader, useAuthentication: false })
        if (response.error) return response
        else {
            // set the token and the expire date in the storage
            localStorage.setItem(_settings.tokenStorageKey,
                response.data[_settings.tokenRespKey])
            localStorage.setItem(_settings.tokenExpireStorageKey,
                response.data[_settings.tokenExpireRespKey])
        }

        return response
    }

    async function logout() {
        const resp = await HTTPClient().post(settings.paths.logout, {})
        endLocalSession()
        return resp
    }

    async function logoutAll() {
        const resp = await HTTPClient().post(settings.paths.logoutAll, {})
        endLocalSession()
        return resp
    }

    /**
     * Check whether the user is authenticated or not.
     * @returns {Object} object with the following keys:
     * * value: true if the user is authenticated, false otherwise
     * * reason: the reason why the user is not authenticated. Possible values are:
     * * * no-session: the token is not stored
     * * * expired: the token has expired
     * * * invalid: the token is not valid on the server
     */
    function authenticated() {
        // case 1: the token is not stored   
        if (token() === null)
            return { value: false, reason: 'no-session' }
        const expire = dayjs(tokenExpire(), 'YYYY-MM-DDTHH:mm:ss')
        // case 2: the token has expired
        if (dayjs().isAfter(expire))
            return { value: false, reason: 'expired' }
        // case 3: the token is not expired

        return { value: true, reason: 'valid' }
    }

    /**
     * Check whether the user is authenticated or not.
     * @param {Boolean} remoteCheck if true, it will check if the token is valid on the server
     * @returns {Object} object with the following keys:
     * * value: true if the user is authenticated, false otherwise
     * * reason: the reason why the user is not authenticated. Possible values are:
     * * * no-session: the token is not stored
     * * * expired: the token has expired
     * * * invalid: the token is not valid on the server
     */
    async function isAuthenticated(remoteCheck) {
        const localCheck = authenticated()
        if (remoteCheck) {
            // check if the token is valid on the server
            const response = await HTTPClient().get(settings.paths.isAuthenticated)
            // if the token is not valid, end the local session and return false
            if (response.error) {
                endLocalSession()
                return { value: false, reason: 'invalid' }
            }
        }
        return localCheck
    }

    /**
     * authenticate the request by adding the token to the headers
     * @param {Object} request 
     */
    function authenticateRequest(request) {
        
        if (authenticated().value) {
            
            request['headers'][_settings.headerKey] = `${_settings.tokenPrepend} ${token()}`
        }
    }

    return {
        login,
        logout,
        logoutAll,
        isAuthenticated,
        authenticated,
        authenticateRequest,
    }

}