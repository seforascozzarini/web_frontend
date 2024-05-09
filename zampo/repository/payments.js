export default function (client) {

    async function donation(body) {
        return client.post('/payments/donate/', {body})
    }

    return {
        donation
    }
}