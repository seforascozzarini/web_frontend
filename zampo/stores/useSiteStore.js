const useSiteStore=defineStore('site-store',{
    persist:{
        storage:sessionStorage,
        paths:['lastSearch']
    },

    state:()=>({
        title:'',
        subtitle:'',
        lastSearch:'',
        footerBackground:''
    }),

    actions:{
        setPageInfo(title,subtitle){
            this.title=title
            this.subtitle=subtitle
        },
    }
})

export default useSiteStore