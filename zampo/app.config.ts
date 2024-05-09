export default defineAppConfig({
    local:true,

    

    HTTPClient: {
        baseURL: 'http://localhost:8000/api/v1',
        // baseURL: 'http://back.zampo.it/api/v1',

        // if you want to use authentication
        useAuthentication: true,
        authSettings: {
            
            // the settings for token based authentication
            tokenAuthenticationSettings: {
                
                // expected login response keys
                tokenRespKey: 'token',
                tokenExpireRespKey: 'expiry',
                // storage keys for the token and the expire date
                tokenStorageKey: 'AUTH_TOKEN',
                tokenExpireStorageKey: 'AUTH_TOKEN_EXPIRE',

                // the header key for the token
                headerKey: 'Authorization',
                // string to prepend to the token in the header
                tokenPrepend: 'Token',
            },

            // the paths for the auth endpoints
            paths: {
                login: '/auth/login/',
                logout: '/auth/logout/',
                logoutAll: '/auth/logoutall/',
                isAuthenticated: '/auth/is-authenticated/',

                sendPasswordReset: '/auth/reset-password/',
                changePasswordOTP: '/auth/otp-change-password/',
                checkForcePasswordChange: '/auth/check-password/',
            },

        },
        // this header will be added to all requests
        commonHeaders: {
            Accept: '*/*',
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip, deflate, br',
        },

    }
})