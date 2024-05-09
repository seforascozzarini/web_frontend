import { useDate } from 'vuetify'
export default function () {
    const { $i18n } = useNuxtApp();
    const $t = $i18n.t;
    const date = useDate()
    const JSONPoint = (lat, lng) => {
        return JSON.stringify({
            type: 'Point',
            coordinates: [lng, lat],
        })
    }
    
    function getPostEventInfo(post) {
        const event = post.type === 1 ? $t('Ultimo Avvistamento') : $t('Data Ritrovamento')
        const eventDate = date.format(new Date(post.event_date), 'normalDateWithWeekday')
        return { event, eventDate }
    }

    function mediaLink(path) {
        return useAppConfig().local ? `http://localhost:8000${path}` : path
    }


    return {
        JSONPoint,
        getPostEventInfo,
        mediaLink,
    }
}
