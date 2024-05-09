export default function (client) {

    async function create(body) {
        return client.post('/users/create/', { body })
    }

    async function activate(token) {
        const user_id = token.split('_')[0]
        return client.post('/users/activate/', { body: { token, user_id } })
    }

    async function account() {
        return client.get('/users/account/', {})
    }

    async function update(body) {
        return client.patch('/users/account/', { body })
    }

    async function updateProfileImage(image) {
        return client.upload('/users/image/', { body: { image } })
    }

    async function newsletterSubscribe(email) {
        return client.post('/users/newsletter/', { body: { email } })
    }

    return {
        create,
        activate,
        account,
        update,
        updateProfileImage,
        newsletterSubscribe,
    }
}