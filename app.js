function populate()
{
	if(quiz.isEnded())
	{
		showScores();
	}
	else{
		//show question
		var element = document.getElementById("question");
		element.innerHTML = quiz.getQuestionIndex().text;

		//show choices
		var choices = quiz.getQuestionIndex().choices;
		for(var i = 0; i< choices.length; i++)
		{
			var element = document.getElementById("choice" + i);
			element.innerHTML = choices[i];
			guess("btn"+i, choices[i]);
		}

		showProgress();
	}
};

function guess(id, guess)
{
	var button = document.getElementById(id);
	button.onclick = function()
	{
		quiz.guess(guess);
		populate();
	}
};

function showProgress()
{
	var currentQuestionNumber = quiz.questionIndex + 1;
	var element = document.getElementById("progress");
	element.innerHTML = "Question" + currentQuestionNumber + "of " + quiz.questions.length;
}

function showScores()
{
	var gameOverHtml = "<h1>Result</h1>";
	gameOverHtml += "<h2 id = 'score'> Your scores: " + quiz.score + "</h2>";
	var element = document.getElementById("quiz");
	element.innerHTML = gameOverHtml;
};


var questions = [
		new Question("Сколько было сыновей у Ноя?", ["1", "2", "3", "4"],"4"),
		new Question("Сколько раз Ветхий завет упоминается в Откровении", ["121", "799", "84", "245"],"245" ),
		new Question("Какой проповедник огорчился, что после его проповеди все покаялись?", ["Иона", "Иисус", "Иоанн Креститель", "Павел"],"Иона" ),
		new Question("Сколько лет прожил Ной после потопа?", ["100", "1000", "350", "365"],"350" )
		
];


var quiz = new Quiz(questions);

populate();

