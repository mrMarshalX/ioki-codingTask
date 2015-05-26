/** 
 * Basic view modifications module
 */
var view = view || (function () {
	return {
		// changes color of the field based on the model validation result
		colorFields: function colorFields(map) {
			var keys = Object.keys(map),
				inputEl = null;
			this.resetColorFields();
			for (var i = 0; i < keys.length; i++) {
				inputEl = $('input[data-id="' + keys[i] + '"]');

				if (map[keys[i]]) {
					inputEl.addClass('correct');				
				} else {
					inputEl.addClass('incorrect');
				}
			}
		},
		// resets color of the fields when model is destroyed
		resetColorFields: function resetColorFields() {
			$('input[data-id]').removeClass('correct incorrect');
		}
	}
})();