let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');
let message = document.getElementById('message');
let results = document.getElementById('results');
let code = document.getElementById('code');

function guess() {
    let input = document.getElementById('user-guess');

    if(answer.value === '' && attempt.value === '') {
    	setHiddenFields();
    }

    let validInput = validateInput(input.value);

    if(validInput) {
    	let result = getResults(input.value);

	    if(result) {
	    	setMessage("You Win! :)");
	    	showAnswer(true);
	    	showReplay();
	    } else if(parseInt(attempt.value, 10) >= 10) {
	    	setMessage("You Lose! :(");
	    	showAnswer(false);
	    	showReplay();
	    } else {
	    	setMessage("Incorrect, try again.");
	    }
    }
}

//implement new functions here

function setHiddenFields() {
	const random = Math.floor(Math.random() * 1000);
	let nextAnswer = random.toString();
	let length = nextAnswer.length;
	if(length < 4) {
		let diff = 4 - length;
		for(let i = 0; i < diff; i++) {
			nextAnswer = '0' + nextAnswer;
		}
	}
	answer.value = nextAnswer;
	attempt.value = 0;
}

function setMessage(text) {
	message.innerHTML = text;
}

function validateInput(input) {
	if(input.length !== 4) {
		setMessage("Guesses must be exactly 4 characters long.");
		return false;
	} else {
		attempt.value = parseInt(attempt.value, 10) + 1;
		return true;
	}
}

function getResults(input) {
	let glyphs = '';
	for(let i = 0; i < input.length; i++) {
		let char = input[i];
		let indexOfChar = answer.value.indexOf(char);
		if(indexOfChar === -1) {
			glyphs += '<span class="glyphicon glyphicon-remove"></span>';
		} else if(indexOfChar === i) {
			glyphs += '<span class="glyphicon glyphicon-ok"></span>';
		} else {
			glyphs += '<span class="glyphicon glyphicon-transfer"></span>';
		}
	}
	results.innerHTML += '<div class="row"><span class="col-md-6">' + input + '</span><div class="col-md-6">' + glyphs + '</div></div>';
	if(input.toString() === answer.value) {
		return true;
	} else {
		return false;
	}
}

function showAnswer(success) {
	code.innerHTML = answer.value;
	code.className = success ? code.className + ' success' : code.className + ' failure';
}

function showReplay() {
	document.getElementById('guessing-div').style.display = 'none';
	document.getElementById('replay-div').style.display = 'block';
}