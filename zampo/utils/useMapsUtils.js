export default function useMapsUtils() {
    const addressToCoordinates = async (placeId) => {
        const geocoder = new google.maps.Geocoder()
        const resp = await geocoder.geocode({ placeId })
        return {
            lat: resp.results[0].geometry.location.lat(),
            lng: resp.results[0].geometry.location.lng(),
            address: resp.results[0].formatted_address,
        }
    }

    return {
        addressToCoordinates,
    }
}