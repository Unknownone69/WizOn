
// Utility function to add mutliple functions on document load
if (!window.addLoadEvent) {
	function addLoadEvent(func) {
		var oldonload = window.onload;
		if (typeof window.onload != 'function') {
			window.onload = func;
		} else {
			window.onload = function() {
				if (oldonload) {
					oldonload();
				}
				func();
			}
		}
	}
}

// If there is an error code reported to the error page, add it to the message.
// Add our function to document load but don't overwrite other document onload functions
addLoadEvent(function() {
	if (window.LauncherViewport) {
		document.getElementById("lpLoadingMsg").innerHTML = LauncherViewport.LastErrorMessage;
		document.getElementById("lpErrorCode").innerHTML = " (" + LauncherViewport.LastErrorCode + ")";
	}
});
