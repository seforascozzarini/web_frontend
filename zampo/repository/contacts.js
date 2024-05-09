export default function (client){
    async function sendContactForm(body){
        return client.post('/contacts/', {body})
    }

    async function sendPartnerContactForm(body){
        return client.post('/contacts/partner/', {body})
    }

    return {
        sendContactForm,
        sendPartnerContactForm
    }

} 