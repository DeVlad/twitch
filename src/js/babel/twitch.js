"use strict";

// -----------------------------------------------------------------------------------------
// TODO: Missing channels
// Be Aware - it's not real-time API for live streams !
// -----------------------------------------------------------------------------------------
// Settings
var channelUrl = "https://wind-bow.gomix.me/twitch-api/channels/";
var streamUrl = "https://wind-bow.gomix.me/twitch-api/streams/";
var isStreamingLive = "";
// Yup it's hardcoded
var channels = ["freecodecamp", "ESL_SC2", "OgamingSC2"];

//var channels = ["freecodecamp", "ESL_SC2", "OgamingSC2", "cretetion", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
// Ugly multiple api hits
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
    for (var _iterator = channels[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var channel = _step.value;

        var promiseGetChannel = new Promise(function (resolve, reject) {
            //  console.log('channel ok');                
            resolve(fetch(channelUrl + channel).then(function (response) {
                return response.json();
            }).then(function (json) {
                return json;
            }));
            reject(Error("Error: fetch channel from API failed"));
        });
        var promiseGetStream = new Promise(function (resolve, reject) {
            //console.log('stream ok');
            resolve(fetch(streamUrl + channel).then(function (response) {
                return response.json();
            }).then(function (json) {
                return json;
            }));
            reject(Error("Error: fetch stream from API failed"));
        });
        Promise.all([promiseGetChannel, promiseGetStream]).then(function (data) {
            //console.log('Rendering data');
            // console.log(data[0].display_name, data[0].logo, data[0].url);

            if (data[1].stream === null) {
                // console.log('not streaming');
                isStreamingLive = "";
            } else {
                //  console.log(data[1].stream.channel.status);
                isStreamingLive = data[1].stream.channel.status;
            }
            $(".content").append(renderResult(data[0].display_name, data[0].logo, data[0].url, isStreamingLive));
        });
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

function renderResult(name, logo, url, stream) {
    // Display in clickable div blocks
    var streamClass = "offline";
    if (stream !== "") {
        streamClass = "live";
    }

    return '<div class="result" id="' + name + '" onclick="window.open(' + "'" + url + "'" + ')">' + "<img class='" + streamClass + "' src=" + "'" + logo + "'" + ">" + '<h3>' + name + '</h3>' + '<h2>' + stream + '</h2>' + '</.div>';
}
//# sourceMappingURL=twitch.js.map
