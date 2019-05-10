
// Method to close shell window on event
function closeWindow() {
	setTimeout(function() {
		try {
			console.log('Close window event : LauncherViewport.AppCloseBySystem()');
			window.LauncherViewport.AppCloseBySystem();
		}
		catch(err) {
			console.log('Close window event : external.appClose()');
			WebInstaller.external.appClose();
		}
	}, 1);
}
// Method to minimize shell window on event
function minimizeWindow() {
	setTimeout(function() {
		try {
			console.log('Minimize window event : LauncherViewport.AppMinimizeByUser()');
			window.LauncherViewport.AppMinimizeByUser();
		}
		catch(err) {
			console.log('Minimize window event : external.appMinimize()');
			WebInstaller.external.appMinimize();
		}
	}, 1);
}

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

// Set up events for Close and Minimize buttons
// Add our function to document load but don't overwrite other document onload functions
addLoadEvent(function() {
	var closeButton = document.getElementById("lpFrameClose");
	var minimizeButton = document.getElementById("lpFrameMinimize");

	closeButton.onclick = closeWindow;
	minimizeButton.onclick = minimizeWindow;
});
