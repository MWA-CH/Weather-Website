const request = require('postman-request');

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibXdhcWFyYWhtZWQiLCJhIjoiY2w5c3VlZWVuMGJ1ZTQxbGV6d3Q4NDZtMyJ9.iMNuFyVuNgOi9lh4Q4JaKQ'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location sevices!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })

}
module.exports = geoCode