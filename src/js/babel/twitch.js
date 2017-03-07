"use strict";

//var channels = ["freecodecamp", "ESL_SC2", "OgamingSC2", "cretetion", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
// TODO: Missing chanells
// Settings
var channelUrl = "https://wind-bow.gomix.me/twitch-api/channels/";
var streamUrl = "https://wind-bow.gomix.me/twitch-api/streams/";
// Yup it's hardcoded
var channels = ["freecodecamp", "ESL_SC2", "OgamingSC2"];
// Ugly multiple api hits
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
    for (var _iterator = channels[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var channel = _step.value;

        var promise = new Promise(function (resolve, reject) {
            //console.log(json);        
            resolve(fetch(channelUrl + channel).then(function (response) {
                return response.json();
            }).then(function (json) {
                return dataCollector.myData = json;
            }, fetch(streamUrl + channel).then(function (response) {
                return response.json();
            }).then(function (json) {
                return dataCollector.myData = json;
            })));
            reject(Error("Error: fetch API data failed"));
        });
        promise.then(function () {
            $(".content").append(renderResult(dataCollector.name, dataCollector.logo, dataCollector.url));
        }, function (err) {
            console.log(err); // Error
        });
        // Data Collector Object
        var dataCollector = {
            // Props are public
            name: "",
            logo: "",
            url: "",
            stream: "",
            get myData() {
                // For future use ?
                return [this.name, this.logo, this.url, this.stream];
            },
            set myData(data) {
                //console.log(data);            
                if (data.hasOwnProperty("stream")) {
                    if (data.stream !== null) {
                        // Current stream
                        this.stream = data.stream.channel.status;
                    }
                } else if (data.hasOwnProperty("display_name")) {
                    this.name = data.display_name;
                    this.logo = data.logo;
                    this.url = data.url;
                } else {
                    console.log("Error: No data");
                }
            }
        };
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
//# sourceMappingURL=twitch.js.map
