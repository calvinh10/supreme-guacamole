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
        question:'Whose real name is Stefani Joanne Germanotta?',
        choice1: 'Lady Gaga',
        choice2: 'Gwen Stefani',
        choice3: 'Pink',
        choice4: 'Madonna',
        answer: 1,
    },
    {
        question: "which singer has had no.1 hits in the 50s, 60s, 70s, 80s & 90s?",
        choice1: "Stevie Wonder",
        choice2: "Tom Jones",
        choice3: "Cliff Richard",
        choice4: "Elvis Pressley",
        answer: 3,
    },
    {
        question: "In 1975 Bohemian Rhapsody was no.1 for 9 weeks. What song knocked it off the top slot by a song with a name that appears in the lyrics of Bohemian Rhapsody?",
        choice1: "Easy Come, Easy Go - Elvis",
        choice2: "Too Late - Carol King",
        choice3: "Mama Mia - ABBA",
        choice4: "Never Let You Go - Bloodstone",
        answer: 3,
    },
    {
        question: "Taylor Swift released 2 studio albums in 2020: one was titled Folklore, but what was the name of the other one?",
        choice1: "Lover",
        choice2: "Evermore",
        choice3: "Red",
        choice4: "Reputation",
        answer: 2,
    },
    {
        question: "What was Madonna's first top 10 hit?",
        choice1: "Material Girl",
        choice2: "Vogue",
        choice3: "Like a Virgin",
        choice4: "Holiday",
        answer: 4,
    },
    {
        question: "Who was the 1st woman inducted into the Rock & Roll Hall of Fame?",
        choice1: "Dianna Ross",
        choice2: "Aretha Franklin",
        choice3: "Debbie Harry",
        choice4: "Whitney Houston",
        answer: 2,
    },
    {
        question: "The Weeknd samples which 80s hit in Blinding Lights?",
        choice1: "Take On Me - A-ha",
        choice2: "Rio - Duran Duran",
        choice3: "Don't You Want Me - Human League",
        choice4: "Call Me - Blondie",
        answer: 1,
    },
    {
        question: "What was the bestselling rock album of the 1990s?",
        choice1: "Achtung Baby - U2",
        choice2: "(What's The Story) Morning Glory - Oasis",
        choice3: "Never Mind - Nivana",
        choice4: "Jagged Little Pill - Alanis Morisette",
        answer: 4,
    },
    {
        question: "Who sang the theme song to James Bond's No Time to Die?",
        choice1: "Adele",
        choice2: "Billie Eilish",
        choice3: "Sam Smith",
        choice4: "Tina Turner",
        answer: 2,
    },
    {
        question: "Kanye West & Jay-Z collaborated on which 2011 album?",
        choice1: "The Blueprint",
        choice2: "Watch the Throne",
        choice3: "Magna Carter Holy Grail",
        choice4: "No Church in the Wild",
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

        return window.location.assign('musicend.html')
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





