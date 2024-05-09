import { currentLocale } from '~/helpers'

export default function (client) {
    const locale = () => currentLocale().iso

    async function getPage(slug) {
        return client.get('/content/<slug>/', {
            params: { locale: locale() },
            pathParams: { slug }
        })
    }

    async function getFAQs() {
        return client.get('/content/get-faq/', { params: { locale: locale() } })
    }

    async function getAdvices(page, page_size) {
        return client.get('/content/get-advices/', { params: { locale: locale(), page, page_size } })
    }


    return {
        getPage,
        getFAQs,
        getAdvices,
    }
}