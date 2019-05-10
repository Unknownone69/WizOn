
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

		// Tells the native windows show how big to make the drag area on the title bar
		try {
			// All themes are the same height
			window.LauncherViewport.SetDragHeight('120');
		}
		catch (err) {
		}

		// Signify that the page has finished loading
		try {
			window.LauncherViewport.ReadyToShow();
		}
		catch (err) {
		}

	}
});
