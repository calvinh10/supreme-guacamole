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
        question:'In the 1985 film Back to the Future, Doc makes a time machine from which brand of car?',
        choice1: 'DeLorean',
        choice2: 'Ford',
        choice3: 'Cadillac',
        choice4: 'Chevrolet',
        answer: 1,
    },
    {
        question:
            "Freddy Krueger wears a striped sweater that is which colors?",
        choice1: "Red & Yellow",
        choice2: "Red & White",
        choice3: "Red & Green",
        choice4: "Red & Blue",
        answer: 3,
    },
    {
        question: "What is the name of the land where Frozen takes place?",
        choice1: "Napendelle",
        choice2: "Florindelle",
        choice3: "Arendelle",
        choice4: "Grenedelle",
        answer: 3,
    },
    {
        question: "If you watch the Marvel movies in chronological order, which movie would you watch first?",
        choice1: "Iron Man",
        choice2: "Captain America: The First Avenger",
        choice3: "Doctor Strange",
        choice4: "Captain Marvel",
        answer: 2,
    },
    {
        question: "Which is the first movie in the Austin Powers franchise?",
        choice1: "Spy of the World",
        choice2: "The Spy Who Shagged Me",
        choice3: "Goldmember",
        choice4: "International Man of Mystery",
        answer: 4,
    },
    {
        question: "How many Oscars has Halle Berry won?",
        choice1: "0",
        choice2: "1",
        choice3: "2",
        choice4: "3",
        answer: 2,
    },
    {
        question: "Which was the first movie adapted from a Stephen King book?",
        choice1: "Carrie",
        choice2: "The Shining",
        choice3: "IT",
        choice4: "Stand By Me",
        answer: 1,
    },
    {
        question: "Which actor plays Private Ryan in Saving Private Ryan?",
        choice1: "Tom Hanks",
        choice2: "Edward Burns",
        choice3: "Vin Diesel",
        choice4: "Matt Damon",
        answer: 4,
    },
    {
        question: "Which movie did Leonardo Di Caprio not receive a best actor nomination?",
        choice1: "The Aviator",
        choice2: "Django Unchained",
        choice3: "Blood Diamond",
        choice4: "Once Upon a Time in Hollywood",
        answer: 2,
    },
    {
        question: "In The Ring, how long do people have to live after they watch a cursed videotape?",
        choice1: "1 Day",
        choice2: "7 Days",
        choice3: "9 Days",
        choice4: "5 Days",
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

        return window.location.assign('movieend.html')
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





