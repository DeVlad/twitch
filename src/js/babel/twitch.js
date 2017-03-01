'use strict';

function jsonp(url, callback) {
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    window[callbackName] = function (data) {
        delete window[callbackName];
        document.body.removeChild(script);
        callback(data);
    };
    var script = document.createElement('script');
    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
}
//var channels = ["freecodecamp", "ESL_SC2", "OgamingSC2", "cretetion", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
var channels = ["freecodecamp", "ESL_SC2"];
// Ugly multiple api hits
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
    for (var _iterator = channels[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var channel = _step.value;

        //console.log(channel);
        jsonp('https://wind-bow.gomix.me/twitch-api/channels/' + channel, function (channelData) {
            console.log(channelData.display_name);
            console.log(channelData.logo);
            console.log(channelData.url);
        });
        isStreaming(channel);
    }
    // Is Live
} catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
} finally {
    try {
        if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
        }
    } finally {
        if (_didIteratorError) {
            throw _iteratorError;
        }
    }
}

function isStreaming(channel) {
    jsonp('https://wind-bow.gomix.me/twitch-api/streams/' + channel, function (streamData) {
        if (streamData.stream == null) {
            console.log("no");
        } else {
            console.log(streamData.stream.channel.status);
        }
    });
}
//# sourceMappingURL=twitch.js.map
