

const useUserStore = defineStore('user-store', {

    state: () => ({
        user: null,
    }),

    getters: {
        /** search radius in kilometers */
        radius(){
            return Number(this.user?.radius ?? 10000)/1000
        },

        address(){
            return this.user?.address
        },

        /** user location 
         * @returns {Object} {address, lat, lng}
         */
        location(){
            // TODO
            return 
        }

    }, 
})

export default useUserStore