
//replace your api key
var rapidAPIKey ;
var resultObject;

//converts image to base 64
function readFile() {
    if (this.files && this.files[0]) {
        $('#uploadedFileName').removeClass('hide');
        $('#uploadedFileName').text(this.files[0].name);
        var FR = new FileReader();
        $(FR).on("load", function (e) {
            console.log('b64 result: ' + e.target.result);
            b64 = e.target.result;

        });
        FR.readAsDataURL(this.files[0]);
    }
}

$("#fileInput").on("change", readFile);

function submit(event){
    //event.preventDefault();
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://google-ai-vision.p.rapidapi.com/cloudVision/imageObjectDetection",
        "method": "POST",
        "headers": {
            "x-rapidapi-host": "google-ai-vision.p.rapidapi.com",
            "x-rapidapi-key": rapidAPIKey,
            "content-type": "application/json",
            "accept": "application/json"
        },
        "processData": false,
        "data": "{ \"source\":\"" + b64 + "\", \"sourceType\": \"base64\"}"
    }
    $.ajax(settings).done(function (response) {
        console.log(response);
        localStorage.setItem('scanned-image', JSON.stringify(response.objects));
        resultObject = _.map(response.objects, 'name');
        resultObject = _.uniq(resultObject);
    });
}

