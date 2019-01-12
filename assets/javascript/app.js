var triviaQuestions = [{
	question: "The Dallas Cowboys do not play in Dallas, but in which Texas city?",
	answerList: ["Irving", "Arlington", "Plano", "Frisco"],
	answer: 1
},{
	question: "Which Dallas quarterback was inducted into the Pro Football Hall of Fame in 2006?",
	answerList: ["Dak Prescott", "Tony Romo", "Troy Aikman", "Roger Staubach"],
	answer: 2
},{
	question: "What year did the Dallas Cowboys join the NFL?",
	answerList: ["1960", "1965", "1972", "1956"],
	answer: 0
},{
	question: "This Cowboys receiver was drafted from Oklahoma State in the 2010 NFL draft. He decided to wear number 88. What was this receiver's name?",
	answerList: ["Terrell Owens", "Michael Irvin", "Cole Beasley", "Dez Bryant"],
	answer: 3
},{
	question: "The Cowboys won three Super Bowls in a four-year span during the early 1990s. Two of these three Super Bowl wins were against the same team. Who was this team?",
	answerList: ["Pittsburgh Steelers", "Buffalo Bills", "Baltimore Colts", "Miami Dolphins"],
	answer: 1
},{
	question: "In one of the largest trade of the 20th century ,the Cowboys traded Herschel Walker to what team?",
	answerList: ["Vikings", "Bills", "Packers", "Bears"],
	answer: 0
},{
	question: "The Cowboys won their first Division title in what year?",
	answerList: ["1973", "1962", "1966", "1969"],
	answer: 2
},{
	question: "Which one of these former players did not win the Heisman Trophy?",
	answerList: ["Roger Staubach", "Ty Detmer", "Tony Dorsett", "Troy Aikman"],
	answer: 3
},{
	question: "What Dallas Cowboy holds the record for most passes to start a career without an interception?",
	answerList: ["Dak Prescott", "Tony Romo", "Roger Stauback", "Troy Aikman"],
	answer: 0
},{
	question: "Who was the first Dallas Cowboy to win the National Football League MVP Award?",
	answerList: ["Tony Romo", "Emmitt Smith", "Terrell Owens", "Michael Irvin"],
	answer: 1
}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Thats right! You know your Cowboys!",
	incorrect: "No, that's not it.",
	endTime: "You ran out of time!",
	finished: "Alright! Let's see how well you know your Cowboys!"
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); 
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}