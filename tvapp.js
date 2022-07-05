const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question:'How many episodes are there of Friends?',
        choice1: '236',
        choice2: '266',
        choice3: '296',
        choice4: '316',
        answer: 1,
    },
    {
        question: "In what year did episode 1 of Game of Thrones first air?",
        choice1: "2009",
        choice2: "2010",
        choice3: "2011",
        choice4: "2012",
        answer: 3,
    },
    {
        question: "Who starred in the most episodes of Friends?",
        choice1: "Paul Rudd",
        choice2: "Elle McPherson",
        choice3: "Tom Selleck",
        choice4: "Helen Baxendale",
        answer: 1,
    },
    {
        question: "What was Mulder's first name in X-Files?",
        choice1: "Hank",
        choice2: "Fox",
        choice3: "Paul",
        choice4: "William",
        answer: 2,
    },
    {
        question: "The winner of Squid Game, Gi-Hun, wore what number?",
        choice1: "001",
        choice2: "196",
        choice3: "236",
        choice4: "456",
        answer: 4,
    },
    {
        question: "What subject did Walter White teach in Breaking Bad?",
        choice1: "Biology",
        choice2: "Chemistry",
        choice3: "Physics",
        choice4: "Geology",
        answer: 2,
    },
    {
        question: "What is the longest-running scripted television series in history?",
        choice1: "The Simpsons",
        choice2: "Family Guy",
        choice3: "Law & Order",
        choice4: "Grey's Anatomy",
        answer: 1,
    },
    {
        question: "Which of these names has never been the name of the hospital in Greys Anatomy?",
        choice1: "Seattle Grace Hospital",
        choice2: "Grey-Sloan Memorial Hospital",
        choice3: "Seattle Grace Mercy West Hospital",
        choice4: "Seattle Sloan Hospital",
        answer: 4,
    },
    {
        question: "What is the name of the french exchange student who stays with Will in the inbetweeners?",
        choice1: "Michel",
        choice2: "Patrice",
        choice3: "Hugo",
        choice4: "Pascal",
        answer: 2,
    },
    {
        question: "In the Office Christmas Special, David Brent did a show dressed at Austin Powers in what nightclub?",
        choice1: "Chasers",
        choice2: "Mumbo Jumbos",
        choice3: "Tiger Tiger",
        choice4: "The Union",
        answer: 2,
    }
]

const SCORE_POINTS = 10
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('tvend.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()





