const AUTH_REQ_PATHS = ['account', 'post-create', 'post-edit-id']
const NO_AUTH_PATH = ['auth-login', 'auth-passwword-forgotten', 'auth-signup', 'auth-activate-token']


export default defineNuxtRouteMiddleware((to, from, a) => {
    if(useAuthStore().authenticated){
        if(NO_AUTH_PATH.includes(to.name))
            return navigateTo('/')
    }
    else{
        if(AUTH_REQ_PATHS.includes(to.name))
            return navigateTo('/auth/login/')
    }
})