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
for (var channel of channels) {
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
        }
        else {
            //console.log(streamData.stream.channel.status);
            return streamData.stream.channel.status;
        }
    });
}