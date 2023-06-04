'use strict';

const helper = {};

helper.createStarList = (stars) => {
    let star = Math.floor(stars);
    let half = stars - star;
    let str = '<div class="ratting">';
    let i = 0;
    for (; i < star; i++) {
        str += '<i class="fa fa-star"></i>';
    }
    if (half > 0) {
        str += '<i class="fa fa-star-half"></i>';
        i++;
    }
    for (; i < 5; i++) {
        str += '<i class="fa fa-star-o"></i>';
    }
    str += '</div>';
    return str;
}

module.exports = helper;