export default function (client) {
    async function list(params, page, page_size) {
        return client.get('/stories/', { params: { ...params, page, page_size } })
    } 

    async function create(body) {
        return client.upload('/stories/create/', { body })
    }

    

    return {
        list, 
        create, 
    }
}