import HTTPClient from "~/HTTPClient"

export default defineNuxtPlugin((app) => {
    return {
        provide: {
            HTTPClient: HTTPClient()
        }
    }
})