export default function (client) {
    async function list(params, page, page_size) {
        return client.get('/posts/', { params: { ...params, page, page_size } })
    }

    async function byId(id) {
        return client.get(`/posts/<id>/`, {pathParams: {id}})
    }

    async function remove(id) {
        return client.del(`/posts/<id>/`, {pathParams: {id}})
    }

    async function create(body) {
        return client.post('/posts/create/', { body })
    }

    async function update(id, body) {
        return client.patch(`/posts/<id>/`, { body, pathParams: {id} })
    }

    async function addImage(body) {
        return client.upload(`/posts/images/`, { body })
    }
    async function removeImage(id) {
        return client.del(`/posts/images/${id}/`, { })
    }

    async function report(body){
        return client.post('/posts/report/', { body })
    }

    return {
        list,
        byId,
        create,
        update,
        addImage,
        removeImage,
        report,
        remove,
    }
}