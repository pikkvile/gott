'use strict';

var props = [];

const geoSpan = 0.0001;
const timeSpan = 1800 * 1000; // 30 min

function contains(interval, x) {
    return x >= interval[0] && x <= interval[1];
}

function findSimilar(prop, props) {
    let fromLatInterval = [prop.fromPoint.lat - geoSpan, prop.fromPoint.lat + geoSpan],
        fromLongInterval = [prop.fromPoint.long - geoSpan, prop.fromPoint.long + geoSpan],
        toLatInterval = [prop.toPoint.lat - geoSpan, prop.toPoint.lat + geoSpan],
        toLongInterval = [prop.toPoint.long - geoSpan, prop.toPoint.long + geoSpan],
        timeInterval = [prop.fromTime - timeSpan, prop.fromTime + timeSpan];
    return props.filter(p => contains(fromLatInterval, p.fromPoint.lat) &&
                      contains(fromLongInterval, p.fromPoint.long) &&
                      contains(toLatInterval, p.toPoint.lat) &&
                      contains(toLongInterval, p.toPoint.long) &&
                      contains(timeInterval, p.fromTime));
}

module.exports = {
    process: proposal => {
        let sims = findSimilar(proposal, props);
        if (sims.length) {
            // todo
        } else {
            props.push(proposal);
        }
    }
}

// 56.311508, 43.988949
// 56.311568, 43.985173