function init() {
    ymaps.geolocation.get({
        provider: 'yandex',
        mapStateAutoApply: true
    }).then(function (res) {
        gottMap = new ymaps.Map("map", {
            center: res.geoObjects.position,
            zoom: 16
        });
    });
}