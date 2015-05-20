$(function() {
	$(".ui.radio.checkbox").checkbox();
	$('.selection.dropdown').dropdown();
	var videoObj = {
			video: true
		},
		current_stream,
		mediaStream = $("#mediaStream")[0];
	$("#photo").click(function() {
		takeMediaStream();
	});
	var closeCamera = function(stream) {
			if (current_stream != null) {
				stream.stop();
				current_stream = null;
			}
		},
		takeMediaStream = function() {
			$(mediaStream).show();
			$("#phto_Modal canvas").remove();
			navigator.webkitGetUserMedia({
					video: true
				}, function(stream) {
					showModal();
					mediaStream.src = URL.createObjectURL(stream);
					current_stream = stream;
				},
				function(err) {
					console.log(err);
				}
			);
		},
		takePhoto = function() {
			if (current_stream == null) takeMediaStream();
			var canvas = document.createElement("canvas"),
				ctx = canvas.getContext('2d'),
				cw = mediaStream.videoWidth,
				ch = mediaStream.videoHeight;
			canvas.width = mediaStream.clientWidth;
			canvas.height = mediaStream.clientHeight;
			canvas.className = mediaStream.className;
			ctx.fillStyle = "#ffffff";
			ctx.fillRect(0, 0, cw, ch);
			ctx.drawImage(mediaStream, 0, 0, cw, ch, 0, 0, mediaStream.clientWidth, mediaStream.clientHeight);
			ctx.closePath();
			closeCamera(current_stream);
			$(mediaStream).hide();
			$(mediaStream).parent().append(canvas);
			return canvas;
		},
		showModal = function() {
			var _canvas = null;
			$("#phto_Modal").modal({
				closable: false,
				onDeny: function() {
					_canvas = takePhoto(current_stream);
					return false;
				},
				onApprove: function() {
					converImg2Base64(_canvas.toDataURL("image/png"));
					return true;
				},
				onHide: function() {
					closeCamera(current_stream);
				},
				transition: "vertical flip",
				duration: 1000
			}).modal("show");
		},
		converImg2Base64 = function(data) {
			var baseData = data.substr(22);
			$("#user_photo").attr("src", "data:image/png;base64," + baseData);
			// console.log(baseData);
		}

	//submit
	// $("#submit").click(function (e) {
	// 	var dataJson = $(userForm).serialize();
	// 	dataJson+="&html="+document.body.outerHTML;
	// 	console.log(dataJson);
	// 	$.post("/save",dataJson,function(data,textStatus,jqXHR){
	// 		console.log(data);
	// 		console.log(textStatus);
	// 	});
	// });
	$(".form").form({
		username: {
			identifier: 'username',
			optional:true,
			rules: [{
				type: 'empty',
				prompt: 'Please enter your name'
			}]
		}
	});
});