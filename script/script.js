document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    const btnOpenModal = document.getElementById('btnOpenModal');
    const modalBlock = document.getElementById('modalBlock');
    const closeModal = document.getElementById('closeModal');
    const modalQuestion = document.getElementById('question');
    const formAnswers = document.getElementById('formAnswers');


    let burgerName = 'Стандарт';
    let sourceToImg = './image/burger.png';


    const playTest = () => {

        const renderQuestions = () => {

            modalQuestion.textContent = 'Какого цвета бургер вы хотите?';

            formAnswers.innerHTML = `
            <div class="answers-item d-flex flex-column">
                <input type="radio" id="answerItem1" name="answer" class="d-none">
                <label for="answerItem1" class="d-flex flex-column justify-content-between">
                <img class="answerImg" src="${sourceToImg}" alt="burger">
                <span>${burgerName}</span>
                </label>
            </div>
            `;
        };

        renderQuestions();
    };


    btnOpenModal.addEventListener('click', () => {

        modalBlock.classList.add('d-block');
        playTest();
    });

    closeModal.addEventListener('click', () => {
        modalBlock.classList.remove('d-block');
    });

});

