'use strict';
// ---------------------------------------------------------
//    Be Aware - it's not real-time API for live streams !
// ---------------------------------------------------------

// Settings
var channelUrl = "https://wind-bow.gomix.me/twitch-api/channels/";
var streamUrl = "https://wind-bow.gomix.me/twitch-api/streams/";
var proxy = "https://cors-anywhere.herokuapp.com/";
var isStreamingLive = "";
// Yup it's hardcoded
var channels = ["freecodecamp", "ESL_SC2", "OgamingSC2", "cretetion", "habathcx", "RobotCaleb", "noobs2ninjas", "comster404", "brunofin"];
// Ugly multiple api hits
for (var channel of channels) {
    var promiseGetChannel = new Promise(function (resolve, reject) {
        resolve(fetch(proxy + channelUrl + channel).then(response => response.json()).then(json => json));
        reject(Error("Error: fetch channel from API failed"));
    });
    var promiseGetStream = new Promise(function (resolve, reject) {
        resolve(fetch(proxy + streamUrl + channel).then(response => response.json()).then(json => json));
        reject(Error("Error: fetch stream from API failed"));
    });
    Promise.all([promiseGetChannel, promiseGetStream]).then(function (data) {
        if (data[0].hasOwnProperty("error")) {
            data[0].display_name = data[0].message;
            data[0].logo = "http://placehold.it/64x64";
            data[0].url = "#";
        }
        if (data[1].stream === null) {
            // Not streaming
            isStreamingLive = "";
        } else {
            isStreamingLive = data[1].stream.channel.status;
        }
        $(".content").append(renderResult(data[0].display_name, data[0].logo, data[0].url, isStreamingLive));
    });
}
// Render View
function renderResult(name, logo, url, stream) {
    // Display in clickable div blocks
    var streamClass = "offline";
    if (stream !== "" || url == "#") {
        url == "#" ? streamClass = "dead" : streamClass = "live";
    }
    return '<div class="result" id="' + name + '" onclick="window.open(' + "'" + url + "'" + ')">' + "<img class='" + streamClass + "' src=" + "'" + logo + "'" + ">" + '<h2>' + name + '</h2>' + '<h3>' + stream + '</h3>' + '</.div>';
}