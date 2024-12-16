// Game Data
const questions = [
    {
        question: "What is a key challenge in cloud engineering?",
        answers: [
            "Limited scalability of cloud platforms",
            "Diverse tools and services from different cloud providers",
            "Inability to access open-source models"
        ],
        correct: "Diverse tools and services from different cloud providers"
    },
    {
        question: "Which tool is essential for containerization in cloud computing?",
        answers: ["Docker", "Kubernetes", "CI/CD pipelines"],
        correct: "Docker"
    },
    {
        question: "What is one trend shaping the future of cloud computing?",
        answers: [
            "Decreasing use of serverless architectures",
            "Increased integration of AI services",
            "Shift from cloud to traditional servers"
        ],
        correct: "Increased integration of AI services"
    },
    {
        question: "Why is cloud computing gaining popularity for AI applications?",
        answers: [
            "It offers physical hardware for AI development",
            "It provides easy access to scalable resources and open-source models",
            "It requires no technical expertise"
        ],
        correct: "It provides easy access to scalable resources and open-source models"
    },
    {
        question: "What is one skill aspiring cloud engineers should focus on?",
        answers: [
            "Understanding legacy systems",
            "Mastering tools like Kubernetes and CI/CD pipelines",
            "Avoiding certifications"
        ],
        correct: "Mastering tools like Kubernetes and CI/CD pipelines"
    },
    {
        question: "Which of the following is NOT a major cloud provider?",
        answers: ["AWS", "Google Cloud", "Intel Cloud"],
        correct: "Intel Cloud"
    },
    {
        question: "What framework does Thu Ya explore in AI projects?",
        answers: [
            "Recurrent Neural Networks",
            "AI agent frameworks with self-correcting methodologies",
            "Blockchain frameworks"
        ],
        correct: "AI agent frameworks with self-correcting methodologies"
    },
    {
        question: "What is a critical practice for ensuring reliability in cloud computing?",
        answers: [
            "Avoiding monitoring tools",
            "Effective logging and feedback",
            "Using unstructured workflows"
        ],
        correct: "Effective logging and feedback"
    }
];

// Game Variables
let currentQuestionIndex = 0;
let cloudHealth = 100;
let playerHealth = 100;
let playerScore = 0;

// DOM Elements
const questionText = document.getElementById("question-text");
const answerZone = document.getElementById("answer-zone");
const answerCards = document.getElementById("answer-cards");
const cloudHealthDisplay = document.getElementById("cloud-health");
const resultMessage = document.getElementById("result-message");
const healthFill = document.getElementById("health-fill");
const scoreDisplay = document.getElementById("score");

// Shuffle Questions
function shuffleQuestions() {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
    console.log("Shuffled Questions: ", questions); // Debugging step to verify shuffling
}

// Initialize Game
function initializeGame() {
    shuffleQuestions(); // Shuffle questions at the start of the game
    currentQuestionIndex = 0; // Ensure starting from the first question
    cloudHealth = 100; // Reset cloud health
    playerHealth = 100; // Reset player health
    playerScore = 0; // Reset player score
    healthFill.style.width = `${playerHealth}%`; // Reset player health bar
    scoreDisplay.textContent = `Score: ${playerScore}`; // Reset score display
    cloudHealthDisplay.textContent = `Health: ${cloudHealth}`; // Reset cloud health display
    resultMessage.textContent = ""; // Clear result message
    answerZone.textContent = "Drop Your Answer Here"; // Reset answer zone text
    answerCards.innerHTML = ""; // Clear answer cards
    loadQuestion(); // Load the first question
}

// Load Question
function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        endGame(); // Call the endGame function
        return;
    }

    const question = questions[currentQuestionIndex];
    questionText.textContent = question.question;

    // Clear and create answer cards
    answerCards.innerHTML = "";
    question.answers.forEach((answer) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("draggable", "true");
        card.setAttribute("data-answer", answer);
        card.textContent = answer;

        // Add drag events
        card.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", answer);
        });

        answerCards.appendChild(card);
    });
}

// Check Answer
function checkAnswer(answer) {
    const question = questions[currentQuestionIndex];
    if (answer === question.correct) {
        cloudHealth -= 20; // Cloud takes damage
        resultMessage.textContent = "Correct! The cloud takes damage!";
        resultMessage.className = "correct";
        updateScore(10); // Increase score for correct answer
    } else {
        resultMessage.textContent = "Wrong! The cloud counterattacks!";
        resultMessage.className = "wrong";
        updatePlayerHealth(20); // Decrease player health for incorrect answer
    }

    // Update Cloud Health
    cloudHealthDisplay.textContent = `Health: ${cloudHealth}`;

    // Check if Cloud Boss is defeated or move to next question
    if (cloudHealth <= 0) {
        resultMessage.textContent = "You defeated the Cloud Boss!";
        answerZone.textContent = "Game Over";
        answerCards.innerHTML = ""; // Clear answer cards
        endGame(); // End game logic
    } else if (playerHealth > 0) {
        currentQuestionIndex++;
        loadQuestion();
    }
}

// Update Player Health
function updatePlayerHealth(damage) {
    playerHealth -= damage;
    if (playerHealth < 0) playerHealth = 0;

    // Update health bar width
    healthFill.style.width = `${playerHealth}%`;

    // End game if player health reaches 0
    if (playerHealth === 0) {
        resultMessage.textContent = "Game Over! The Cloud Boss defeated you!";
        answerZone.textContent = "Game Over";
        answerCards.innerHTML = ""; // Clear answer cards
        endGame(); // End game logic
    }
}

// Update Player Score
function updateScore(points) {
    playerScore += points;
    scoreDisplay.textContent = `Score: ${playerScore}`;
}

// End Game
function endGame() {
    // Clear the question area and answer cards
    questionText.textContent = "Game Over!";
    answerCards.innerHTML = "";

    // Create Try Again button
    const tryAgainButton = document.createElement("button");
    tryAgainButton.textContent = "Try Again";
    tryAgainButton.classList.add("try-again");
    tryAgainButton.addEventListener("click", initializeGame);

    // Append the button to the game container
    answerZone.innerHTML = ""; // Clear the answer zone text
    answerZone.appendChild(tryAgainButton);
}

// Drag and Drop Events
answerZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    answerZone.classList.add("dragover");
});

answerZone.addEventListener("dragleave", () => {
    answerZone.classList.remove("dragover");
});

answerZone.addEventListener("drop", (e) => {
    e.preventDefault();
    const answer = e.dataTransfer.getData("text/plain");
    answerZone.classList.remove("dragover");
    checkAnswer(answer);
});

// Start the Game
initializeGame();