
const quizData = [
    {
        id: 1,
        question: "De acordo com o IBGE, qual foi o crescimento aproximado do uso de IA em empresas industriais brasileiras entre 2022 e 2024?",
        options: [
            { text: "10% para 25%", correct: false },
            { text: "16,9% para 41,9%", correct: true },
            { text: "50% para 75%", correct: false },
            { text: "5% para 15%", correct: false }
        ]
    },
    {
        id: 2,
        question: "Qual é o principal risco social e econômico da automação, segundo a ONU?",
        options: [
            { text: "Aumento da poluição", correct: false },
            { text: "Risco de impacto em até 40% dos empregos globais", correct: true },
            { text: "Diminuição da velocidade da internet", correct: false },
            { text: "Aumento do custo de produção", correct: false }
        ]
    },
    {
        id: 3,
        question: "Qual das propostas de intervenção sugeridas visa a requalificação profissional?",
        options: [
            { text: "Aumentar o imposto sobre robôs", correct: false },
            { text: "Inserir literacia digital no ensino básico", correct: false },
            { text: "Instituir um Programa Nacional de Requalificação Profissional com foco em habilidades humanas e tecnológicas", correct: true },
            { text: "Proibir o uso de IA em serviços públicos", correct: false }
        ]
    },
    {
        id: 4,
        question: "Qual é a projeção do mercado de IA no Brasil para 2025?",
        options: [
            { text: "US$ 1 bilhão", correct: false },
            { text: "US$ 4,8 bilhões", correct: true },
            { text: "US$ 10 bilhões", correct: false },
            { text: "US$ 2 bilhões", correct: false }
        ]
    },
    {
        id: 5,
        question: "Qual órgão deve reformular a matriz curricular para inserir literacia digital, segundo a redação?",
        options: [
            { text: "Ministério do Trabalho", correct: false },
            { text: "Ministério da Educação (MEC)", correct: true },
            { text: "Ministério da Ciência e Tecnologia", correct: false },
            { text: "Ministério da Economia", correct: false }
        ]
    },
    {
        id: 6,
        question: "Qual é um exemplo de questão ética levantada pelo uso de IA?",
        options: [
            { text: "Aumento de empregos", correct: false },
            { text: "Viés algorítmico e concentração de poder", correct: true },
            { text: "Redução de custos", correct: false },
            { text: "Melhoria da educação", correct: false }
        ]
    },
    {
        id: 7,
        question: "Qual habilidade humana pode ser perdida com a dependência crescente de sistemas automatizados?",
        options: [
            { text: "Uso de redes sociais", correct: false },
            { text: "Pensamento crítico e criatividade", correct: true },
            { text: "Digitação rápida", correct: false },
            { text: "Navegação na internet", correct: false }
        ]
    },
    {
        id: 8,
        question: "Com qual instituição o Governo Federal deve fazer parceria para o Programa de Requalificação Profissional?",
        options: [
            { text: "Universidades privadas", correct: false },
            { text: "Sistema S (SENAI/SENAC)", correct: true },
            { text: "Empresas multinacionais", correct: false },
            { text: "Organizações não governamentais", correct: false }
        ]
    },
    {
        id: 9,
        question: "Qual é o foco principal do Programa Nacional de Requalificação Profissional proposto?",
        options: [
            { text: "Apenas habilidades técnicas", correct: false },
            { text: "Apenas habilidades humanas", correct: false },
            { text: "Habilidades humanas (criatividade, ética) e tecnológicas avançadas", correct: true },
            { text: "Apenas gestão de empresas", correct: false }
        ]
    },
    {
        id: 10,
        question: "Qual é o objetivo final da intervenção estatal e educacional proposta na redação?",
        options: [
            { text: "Parar o desenvolvimento da IA", correct: false },
            { text: "Fazer da IA uma ferramenta de desenvolvimento equitativo e não um vetor de exclusão social", correct: true },
            { text: "Aumentar o lucro das empresas", correct: false },
            { text: "Reduzir o uso de tecnologia", correct: false }
        ]
    }
];
let currentQuestionIndex = 0;
let userAnswers = [];
let quizStarted = false;
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    const activeButton = Array.from(navLinks).find(link => 
        link.textContent.toLowerCase() === 
        (sectionId === 'home' ? 'inicial' : 
         sectionId === 'contexto' ? 'contexto' :
         sectionId === 'impactos' ? 'impactos' :
         sectionId === 'solucoes' ? 'soluções' :
         sectionId === 'quiz' ? 'quiz' : '')
    );
    if (activeButton) {
        activeButton.classList.add('active');
    }
    if (sectionId === 'quiz' && !quizStarted) {
        initializeQuiz();
    }
    window.scrollTo(0, 0);
}
function initializeQuiz() {
    quizStarted = true;
    currentQuestionIndex = 0;
    userAnswers = [];
    renderQuiz();
}
function renderQuiz() {
    const quizContent = document.getElementById('quiz-content');
    const quizResult = document.getElementById('quiz-result');
    quizContent.innerHTML = '';
    quizResult.classList.add('hidden');

    if (currentQuestionIndex < quizData.length) {
        const question = quizData[currentQuestionIndex];
        const questionHTML = `
            <div class="quiz-question">
                <h3>Questão ${currentQuestionIndex + 1} de ${quizData.length}</h3>
                <p style="font-size: 1.1rem; margin-bottom: 1.5rem; color: var(--text-secondary);">${question.question}</p>
                <div class="quiz-options">
                    ${question.options.map((option, index) => `
                        <label class="quiz-option">
                            <input type="radio" name="answer" value="${index}" onchange="selectAnswer(${index})">
                            <span>${option.text}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
            <div class="quiz-submit">
                ${currentQuestionIndex > 0 ? `<button onclick="previousQuestion()" style="margin-right: 1rem; background: var(--secondary-color); color: var(--text-primary); border: 1px solid var(--border-color);">← Anterior</button>` : ''}
                ${currentQuestionIndex < quizData.length - 1 ? `<button onclick="nextQuestion()">Próxima →</button>` : `<button onclick="submitQuiz()">Enviar Quiz</button>`}
            </div>
        `;
        quizContent.innerHTML = questionHTML;
        if (userAnswers[currentQuestionIndex] !== undefined) {
            const selectedOption = document.querySelector(`input[value="${userAnswers[currentQuestionIndex]}"]`);
            if (selectedOption) {
                selectedOption.checked = true;
            }
        }
    }
}
function selectAnswer(optionIndex) {
    userAnswers[currentQuestionIndex] = optionIndex;
}
function nextQuestion() {
    if (userAnswers[currentQuestionIndex] === undefined) {
        alert('Por favor, selecione uma resposta antes de continuar.');
        return;
    }
    if (currentQuestionIndex < quizData.length - 1) {
        currentQuestionIndex++;
        renderQuiz();
    }
}
function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuiz();
    }
}
function submitQuiz() {
    if (userAnswers[currentQuestionIndex] === undefined) {
        alert('Por favor, selecione uma resposta antes de enviar.');
        return;
    }
    let score = 0;
    quizData.forEach((question, index) => {
        if (userAnswers[index] !== undefined && question.options[userAnswers[index]].correct) {
            score++;
        }
    });
    showQuizResult(score);
}
function showQuizResult(score) {
    const quizContent = document.getElementById('quiz-content');
    const quizResult = document.getElementById('quiz-result');
    quizContent.innerHTML = '';
    quizResult.classList.remove('hidden');
    const percentage = Math.round((score / quizData.length) * 100);
    let message = '';
    let messageColor = '';
    if (percentage === 100) {
        message = '🎉 Perfeito! Você domina completamente o tema!';
        messageColor = 'var(--success-color)';
    } else if (percentage >= 90) {
        message = '⭐ Excelente! Você tem um conhecimento muito profundo sobre IA e automação!';
        messageColor = 'var(--success-color)';
    } else if (percentage >= 80) {
        message = '✅ Muito bom! Você compreendeu bem os conceitos principais.';
        messageColor = 'var(--success-color)';
    } else if (percentage >= 70) {
        message = '👍 Bom! Você tem uma base sólida sobre o tema.';
        messageColor = 'var(--accent-color)';
    } else if (percentage >= 60) {
        message = '📚 Você tem uma base, mas poderia revisar alguns conceitos.';
        messageColor = 'var(--warning-color)';
    } else if (percentage >= 40) {
        message = '💡 Continue estudando! Releia o conteúdo e tente novamente.';
        messageColor = 'var(--warning-color)';
    } else {
        message = '🔄 Recomendamos revisar todo o conteúdo antes de tentar novamente.';
        messageColor = 'var(--error-color)';
    }
    let detailsHTML = '<h4 style="margin-top: 1.5rem; margin-bottom: 1rem;">Análise das Respostas:</h4>';
    quizData.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = question.options[userAnswer].correct;
        const statusIcon = isCorrect ? '✅' : '❌';
        const statusColor = isCorrect ? 'var(--success-color)' : 'var(--error-color)';
    
        detailsHTML += `
            <div style="background: rgba(6, 182, 212, 0.05); padding: 1rem; border-radius: 0.5rem; margin-bottom: 1rem; border-left: 4px solid ${statusColor};">
                <p style="color: ${statusColor}; font-weight: 600; margin-bottom: 0.5rem;">${statusIcon} Questão ${index + 1}</p>
                <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 0.5rem;"><strong>Sua resposta:</strong> ${question.options[userAnswer].text}</p>
                ${!isCorrect ? `<p style="color: var(--success-color); font-size: 0.95rem;"><strong>Resposta correta:</strong> ${question.options.find(opt => opt.correct).text}</p>` : ''}
            </div>
        `;
    });
    quizResult.innerHTML = `
        <h3>Resultado Final</h3>
        <div class="score">${score}/${quizData.length}</div>
        <p style="font-size: 1.2rem; font-weight: 600; margin-bottom: 1rem;">${percentage}%</p>
        <p class="result-message" style="color: ${messageColor}; font-weight: 600;">${message}</p>
        ${detailsHTML}
        <button class="btn btn-primary restart-btn" onclick="restartQuiz()">Fazer o Quiz Novamente</button>
    `;
}
function restartQuiz() {
    currentQuestionIndex = 0;
    userAnswers = [];
    quizStarted = false;
    initializeQuiz();
}
document.addEventListener('DOMContentLoaded', function() {
    showSection('home');
});
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});