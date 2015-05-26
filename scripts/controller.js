/**
 * Controller module of the application. Connects view (UI, somehow via view.js) with model (model.js)
 */
var controller = controller || (function () {
	var changeViewButtons = $('button[data-role="changeView"]'),
		currentView = 'firstEx';	

	// attaching handler to change views
	changeViewButtons.on('click', function (evt) {
		var toView = $(evt.toElement).attr('data-id');

		currentView = toView === '#exercise-one' ? 'firstEx' : 'secondEx';

		$(toView).removeClass('invisible').addClass('visible').siblings().removeClass('visible').addClass('invisible');
		$('.check-answer').addClass('disabled');
		model.resetAnswers();
	});	

	// handler responsible for checking current answers
	$('.check-answer').on('click', function (evt) {
		model.checkAnswers(currentView);
	});

	// handler to store input from the fields to model onBlur
	$('input[type="text"]').blur(function (evt) {
		var target = $(evt.target).attr('data-id'),
			text = $(evt.target).val().toLowerCase().trim();

		model.setAnswer(target, text);		
	});

	// validation handler when model is valid (e.g. all fields are filled in)
	$(document).on('model:valid', function () {
		$('.check-answer').removeClass('disabled');
	});

	// validation handler when model is correct (e.g. answers are correct)
	$(document).on('model:correct', function (evt) {
		var responseMap = evt.originalEvent.detail;

		view.colorFields(responseMap);
		alertify.success('Correct answers');
	});

	// validation handler when model is incorrect (e.g. answers are not correct)
	$(document).on('model:incorrect', function (evt) {
		var responseMap = evt.originalEvent.detail;

		view.colorFields(responseMap);
		alertify.error('Incorrect answers');
	});

	// handler that resets the view when model is
	$(document).on('model:destoryed', function () {
		$('input[type="text"]').val('');
		view.resetColorFields();
	});
})();