
const useAuthStore = defineStore('auth-store', () => {
    const loading = ref(false)
    const error = ref(false)
    const errorMessage = ref(false)

    const client = useNuxtApp().$HTTPClient
    const $t = useNuxtApp().$i18n.t
    const authPaths = useAppConfig().HTTPClient.authSettings.paths

    // key used to set/get the username to/from responses/requests
    const usernameKey = 'email'

    // the username used for authentication
    const username = ref(null)
    const setUsername = (value) => username.value = value
    const getUsername = (value) => username.value

    // states of the authentication process
    const authenticationStates = {
        'none': null,
        'login-enter-user': 0,
        'login-enter-ps': 1,
        'force-ps-change': 2,
        'start-ps-reset': 3,
        'otp-ps-reset': 4,
    }
    // current state of the authentication process
    const currentState = ref(authenticationStates.none)
    const setState = (state) => {
        error.value = false
        currentState.value = authenticationStates[state]
    }
    const checkState = (state) => currentState === authenticationStates[state]

    const isLogin = computed(() => checkState('login-enter-user') || checkState('login-enter-ps'))
    const isOTP = computed(() => checkState('force-ps-change') || checkState('otp-ps-reset'))
    const isReset = computed(() => checkState('start-ps-reset'))

    // user data from login
    const userData = ref(null)

    // STORE COMMON ACTIONS
    async function clientRequest(method, args) {
        if (args === undefined) args = []
        loading.value = true
        const response = await client[method](...args)
        loading.value = false
        return response
    }

    async function login(username, password) {
        error.value = false
        setUsername(username)
        const response = await clientRequest('login', [username, password])
        if (response.error) {
            error.value = true
            if (response.status == 401) errorMessage.value = $t('invalid_login_credentials')
            else errorMessage.value = $t('unknown_server_error')
            return { success: false, message: errorMessage.value, response }
        }
        userData.value = response.data
        return { success: true, message: 'ok', response }
    }

    async function logout() {
        setUsername(null)
        error.value = false
        const response = await clientRequest('logout')
        if (response.error) {
            error.value = true
            if (response.status == 401) errorMessage.value = $t('not_authenticated')
            else errorMessage.value = $t('unknown_server_error')
            return { success: false, message: errorMessage.value, response }
        }
        return { success: true, message: 'ok', response }
    }

    async function logoutAll() {
        setUsername(null)
        error.value = false
        const response = await clientRequest('logoutAll')
        if (response.error) {
            error.value = true
            if (response.status == 401) errorMessage.value = $t('not_authenticated')
            else errorMessage.value = $t('unknown_server_error')
            return { success: false, message: errorMessage.value, response }
        }
        return { success: true, message: 'ok', response }
    }


    const authenticated = computed(() => {
        return client.authenticated().value
    })

    async function isAuthenticated(remoteCheck) {
        return await clientRequest('isAuthenticated', [remoteCheck])
    }

    async function sendPasswordReset(username) {
        error.value = false
        const body = {}
        body[usernameKey] = username
        setUsername(username)
        const response = await clientRequest('post', [authPaths.sendPasswordReset, { body }])
        if (response.error) {
            error.value = true
            if (response.status == 404) errorMessage.value = $t('user_not_found')
            else errorMessage.value = $t('unknown_server_error')
            return { success: false, message: errorMessage.value, response }
        }
        return { success: true, message: 'ok', response }
    }

    async function changePasswordOTP(username, password, otp) {
        error.value = false
        const body = { password, otp }
        body[usernameKey] = username
        const response = await clientRequest('post', [authPaths.changePasswordOTP, { body }])
        if (response.error) {
            error.value = true
            if (response.status == 404) errorMessage.value = $t('user_not_found')
            else if (response.status == 400) {
                if ('otp' in response.data)
                    errorMessage.value = $t('invalid_otp')
                else
                    errorMessage.value = $t('invalid_password')
            }
            else errorMessage.value = $t('unknown_server_error')
            return { success: false, message: errorMessage.value, response }
        }
        return { success: true, message: 'ok', response }
    }

    async function checkForcePasswordChange(username) {
        error.value = false
        const body = {}
        body[usernameKey] = username
        const response = await clientRequest('post',
            [authPaths.checkForcePasswordChange, { body }])
        if (response.error) {
            error.value = true
            if (response.status == 404) errorMessage.value = $t('user_not_found')
            else errorMessage.value = $t('unknown_server_error')
            return { success: false, message: errorMessage.value, response }
        }
        return { success: true, message: 'ok', response }
    }

    const state = {
        loading,
        error,
        errorMessage,
        authPaths,
        client,
        setState,
        checkState,
        authenticationStates,
        currentState,
        isLogin,
        isOTP,
        isReset,
        username,
        setUsername,
        getUsername,
        userData,
    }

    const authMethods = {
        login,
        logout,
        logoutAll,
        isAuthenticated,
        authenticated,
        sendPasswordReset,
        changePasswordOTP,
        checkForcePasswordChange,
        clientRequest,
    }




    return {
        ...state,
        ...authMethods,

    }
},
    {
        persist: {
            storage: localStorage,
            paths: ['username', 'userData'],
        },
    })


export default useAuthStore