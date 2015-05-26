// application data initialization
var correctAnswers = {
	firstEx: {
		first: 'foggy',
		second: 'raining',
		third: 'sunny', 
		fourth: 'cloudy',
		fifth: 'windy',
		sixth: 'snowing'
	},
	secondEx: {
		first:'2',
		second:'3',
		third:'4',
		fourth:'1',
		fifth:'5',
		sixth:'6'	
	}
}

/**
 * Model controller
 */
var model = model || (function () {
	// defaults values
	var exerciseAnswers = {
		first: null,
		second: null,
		third: null,
		fourth: null,
		fifth: null,
		sixth: null
	},
	correctness = {
		first: null,
		second: null,
		third: null,
		fourth: null,
		fifth: null,
		sixth: null	
	};

	// resets model to defaults
	function resetAnswers() {
		exerciseAnswers = {
			first: null,
			second: null,
			third: null,
			fourth: null,
			fifth: null,
			sixth: null
		},
		correctness = {
			first: null,
			second: null,
			third: null,
			fourth: null,
			fifth: null,
			sixth: null	
		};

		document.dispatchEvent(new CustomEvent('model:destoryed'));	
	}

	// saves answer to the model
	function setAnswer(number, answer) {
		exerciseAnswers[number] = answer;

		if (isValid()) {
			document.dispatchEvent(new CustomEvent('model:valid'));
		}		
	}

	// checks models answers against the data initialized at the start of the application
	function checkAnswers(model) {
		var isCorrect = exerciseAnswers.first === correctAnswers[model].first && exerciseAnswers.second === correctAnswers[model].second &&
		exerciseAnswers.third === correctAnswers[model].third && exerciseAnswers.fourth === correctAnswers[model].fourth && 
		exerciseAnswers.fifth === correctAnswers[model].fifth && exerciseAnswers.sixth === correctAnswers[model].sixth;

		var keys = Object.keys(exerciseAnswers);
		for (var i = 0; i < keys.length; i++) {
			correctness[keys[i]] = exerciseAnswers[keys[i]] === correctAnswers[model][keys[i]];			
		}
		
		if (isCorrect) {
			document.dispatchEvent(new CustomEvent('model:correct', {detail: correctness }));
		} else {
			document.dispatchEvent(new CustomEvent('model:incorrect', {detail: correctness}));
		}
	}

	// checks if model is filled in properly
	function isValid() {
		return exerciseAnswers.first !== null && exerciseAnswers.second !== null &&
		exerciseAnswers.third !== null && exerciseAnswers.fourth !== null && 
		exerciseAnswers.fifth !== null && exerciseAnswers.sixth !== null;	
	}

	return {
		setAnswer: setAnswer,
		checkAnswers: checkAnswers,
		resetAnswers: resetAnswers
	}
})();