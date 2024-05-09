export default function (client) {
    async function byPost(postId, page, page_size) {
        return client.get('/comments/<postId>/', { params: {  page, page_size }, pathParams: {postId}})
    }

    async function create(postId, text) {
        return client.post('/comments/', {body: {post: postId, text}})
    }

    async function action(commentId, action) {
        return client.post('/comments/action/', {body: {comment:commentId, type:action}})
    }

    return {
        byPost,
        create,
        action,
    }
}