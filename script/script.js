document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    const btnOpenModal = document.getElementById('btnOpenModal');
    const modalBlock = document.getElementById('modalBlock');
    const closeModal = document.getElementById('closeModal');
    const modalQuestion = document.getElementById('question');
    const formAnswers = document.getElementById('formAnswers');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const sendBtn = document.getElementById('send');

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

        const finalAnswers = [];

        const renderAnswer = (index) => { //index - индекс объектов в массиве
            questions[index].answers.forEach((answer) => {
                const answerItem = document.createElement('div');

                // добавляем классы
                answerItem.classList.add('answers-item', 'd-flex', 'justify-content-center');

                // рендер динамической верстки
                answerItem.innerHTML = `
                <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none" value='${answer.title}'>
                <label for="${answer.title}" class="d-flex flex-column justify-content-between">
                <img class="answerImg" src="${answer.url}" alt="burger">
                <span>${answer.title}</span>
                </label>
                `;

                // *Добавляем элементы на новую позицию
                formAnswers.appendChild(answerItem);
            });
        };

        // рендер вопроса и ответа
        const renderQuestions = (indexQuestion) => { //indexQuestion - индекс вопросов в массиве
            formAnswers.innerHTML = ''; // при новом открытии очищаем окно от элементов

            switch(numQuestion) {

                case questions.length:
                prevBtn.style.display = 'none';
                nextBtn.style.display = 'none';
                sendBtn.classList.remove('d-none');
                modalQuestion.textContent = '';
                formAnswers.innerHTML = `
                <div class="form-group">
                <label for="phoneNumber">Ваш телефон</label>
                <input type="phone" class="form-control" id="phoneNumber">
                </div>
                `
                break;
                
                case questions.length + 1:
                modalQuestion.textContent = 'Спасибо за пройденный тест!';
                setTimeout(() => {
                modalBlock.classList.remove('d-block');
                }, 2000);
                break;
                
                default:
                prevBtn.style.display = (indexQuestion === 0 ? 'none' : 'block');
                nextBtn.style.display = (indexQuestion === questions.length + 1? 'none' : 'block');
                sendBtn.classList.add('d-none');
                
                modalQuestion.textContent = `${questions[indexQuestion].question}`; //рендер вопроса
                renderAnswer(indexQuestion); //передаем в renderAnswer аргумент indexQuestion(индекс вопроса)
                break;
                }
            
        };
        renderQuestions(numQuestion); //передаем в renderQuestions переменную numQuestion, которая является индексом и элементов в объекте и вопросов

        const checkAnswer = () => {
            
            const obj = {};
            

            const inputs = [...formAnswers.elements].filter((input) => input.checked || input.id === 'phoneNumber');

            inputs.forEach((input, index) => {
                if (numQuestion >= 0 && numQuestion <= questions.length - 1) {
                    obj[`${index}_${questions[numQuestion].question}`] = input.value;
                }
                if (numQuestion == questions.length) {
                    obj['Номер телефона'] = input.value;
                }
            });
            
            finalAnswers.push(obj);
        };

        nextBtn.onclick = () => {
            checkAnswer();
            numQuestion++;
            renderQuestions(numQuestion);
        };
        prevBtn.onclick = () => {
            numQuestion--;
            renderQuestions(numQuestion);
        };

        
        sendBtn.onclick = () => {
            checkAnswer();
            numQuestion++;
            renderQuestions(numQuestion);
            console.log(finalAnswers);
            
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

