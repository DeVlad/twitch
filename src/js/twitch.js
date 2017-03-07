//var channels = ["freecodecamp", "ESL_SC2", "OgamingSC2", "cretetion", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
// TODO: Missing chanells
// Settings
var channelUrl = "https://wind-bow.gomix.me/twitch-api/channels/";
var streamUrl = "https://wind-bow.gomix.me/twitch-api/streams/";
// Yup it's hardcoded
var channels = ["freecodecamp", "ESL_SC2", "OgamingSC2"];
// Ugly multiple api hits
for (var channel of channels) {
    var promise = new Promise(function (resolve, reject) {
        //console.log(json);        
        resolve(fetch(channelUrl + channel).then(response => response.json()).then(json => dataCollector.myData = json,
                fetch(streamUrl + channel).then(response => response.json()).then(json => dataCollector.myData = json)));
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
            }
            else if (data.hasOwnProperty("display_name")) {
                this.name = data.display_name;
                this.logo = data.logo;
                this.url = data.url;
            }
            else {
                console.log("Error: No data");
            }
        }
    };
}
// Render View
function renderResult(name, logo, url) {
    // Display in clickable div blocks    
    return '<div class="result" id="' + name + '" onclick="window.open(' + "'" + url + "'" + ')">' + "<img src=" + "'" + logo + "'" + ">" + '<h3>' + name + '</h3>' + '<br>' + '</.div>';
}