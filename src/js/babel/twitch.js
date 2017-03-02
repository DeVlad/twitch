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
// TODO: Missing chanells
var channels = ["freecodecamp", "ESL_SC2", "OgamingSC2"];
// Ugly multiple api hits
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
    for (var _iterator = channels[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var channel = _step.value;

        //console.log(channel);
        jsonp('https://wind-bow.gomix.me/twitch-api/channels/' + channel, function (channelData) {
            //console.log(channelData.display_name);
            //console.log(channelData.logo);
            //console.log(channelData.url);
            $(".content").append(renderResult(channelData.display_name, channelData.logo, channelData.url));
        });
        // isStreaming(channel);
    }
    // Render View
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

function renderResult(name, logo, url) {
    // Display in clickable div blocks    
    return '<div class="result" id="' + name + '" onclick="window.open(' + "'" + url + "'" + ')">' + "<img src=" + "'" + logo + "'" + ">" + '<h3>' + name + '</h3>' + '<br>' + '</.div>';
}
// Is Live
function isStreaming(channel) {
    jsonp('https://wind-bow.gomix.me/twitch-api/streams/' + channel, function (streamData) {
        if (streamData.stream == null) {
            //console.log("no");
            return "";
        } else {
            //console.log(streamData.stream.channel.status);
            return streamData.stream.channel.status;
        }
    });
}
//# sourceMappingURL=twitch.js.map
