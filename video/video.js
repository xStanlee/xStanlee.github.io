export default function videoStream(device, receiver) {
    device.getUserMedia = device.getUserMedia ||
        device.webkitGetUserMedia ||
        device.mozGetUserMedia;

    if (device.getUserMedia) {
        device.getUserMedia({ audio: false, video: { width: 640, height: 300 } },
            function (stream) {
                var video = document.querySelector(receiver);
                video.srcObject = stream;
                video.onloadedmetadata = function (e) {
                    video.play();
                };
            },
            function (err) {
                console.log("The following error occurred: " + err.name);
            }
        );
    } else {
        console.log("getUserMedia not supported");
    }
}