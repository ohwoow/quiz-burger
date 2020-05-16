document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    const btnOpenModal = document.getElementById('btnOpenModal');
    const modalBlock = document.getElementById('modalBlock');
    const closeModal = document.getElementById('closeModal');
    const modalQuestion = document.getElementById('question');
    const formAnswers = document.getElementById('formAnswers');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');

    const questions = [
        {
            question: "Какого цвета бургер?",
            answers: [
                {
                    title: 'Стандарт',
                    url: './image/burger.png'
                },
                {
                    title: 'Черный',
                    url: './image/burgerBlack.png'
                }
            ],
            type: 'radio'
        },
        {
            question: "Из какого мяса котлета?",
            answers: [
                {
                    title: 'Курица',
                    url: './image/chickenMeat.png'
                },
                {
                    title: 'Говядина',
                    url: './image/beefMeat.png'
                },
                {
                    title: 'Свинина',
                    url: './image/porkMeat.png'
                }
            ],
            type: 'radio'
        },
        {
            question: "Дополнительные ингредиенты?",
            answers: [
                {
                    title: 'Помидор',
                    url: './image/tomato.png'
                },
                {
                    title: 'Огурец',
                    url: './image/cucumber.png'
                },
                {
                    title: 'Салат',
                    url: './image/salad.png'
                },
                {
                    title: 'Лук',
                    url: './image/onion.png'
                }
            ],
            type: 'checkbox'
        },
        {
            question: "Добавить соус?",
            answers: [
                {
                    title: 'Чесночный',
                    url: './image/sauce1.png'
                },
                {
                    title: 'Томатный',
                    url: './image/sauce2.png'
                },
                {
                    title: 'Горчичный',
                    url: './image/sauce3.png'
                }
            ],
            type: 'radio'
        }
    ];
    


    // Рендер вопросов в модальном окне 
    const playTest = () => {
        let numQuestion = 0; // индекс вопроса

        const renderAnswer = (index) => { //index - индекс объектов в массиве
            questions[index].answers.forEach((answer) => {
                const answerItem = document.createElement('div');

                // *добавляем классы
                answerItem.classList.add('answers-item', 'd-flex', 'flex-column');

                // *рендер динамической верстки
                answerItem.innerHTML = `
                <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none">
                <label for="${answer.title}" class="d-flex flex-column justify-content-between">
                <img class="answerImg" src="${answer.url}" alt="burger">
                <span>${answer.title}</span>
                </label>
                `;

                // *Добавляем элементы на новую позицию
                formAnswers.appendChild(answerItem);
            });
        };

        // рендер вопроса
        const renderQuestions = (indexQuestion) => { //indexQuestion - индекс вопросов в массиве
            formAnswers.innerHTML = '';

            modalQuestion.textContent = `${questions[indexQuestion].question}`;

            // *скрываем кнопки при определенных условиях

            if (numQuestion == 0) {
                prevBtn.style.display = 'none';
            } else {
                prevBtn.style.display = '';
            }

            if (numQuestion == questions.length -1) {
                nextBtn.style.display = 'none';
            } else {
                nextBtn.style.display = '';
            }

            renderAnswer(indexQuestion); //передаем в renderAnswer аргумент indexQuestion(индекс вопроса)
        };
        renderQuestions(numQuestion); //передаем в renderQuestions переменную numQuestion, которая является индексом и элементов в объекте и вопросов

        nextBtn.onclick = () => {
            numQuestion++;
            renderQuestions(numQuestion);
        };
        prevBtn.onclick = () => {
            numQuestion--;
            renderQuestions(numQuestion);
        };
    
    };


    btnOpenModal.addEventListener('click', () => {

        modalBlock.classList.add('d-block');
        playTest();
    });


    closeModal.addEventListener('click', () => {
        modalBlock.classList.remove('d-block');
    });

});

