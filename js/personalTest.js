class PersonalTest {
    constructor(target) {
        this.container = document.querySelector(target); // 추후 dom 내용을 바꾸기 위한 선택자
        this.page = 0; // 0: intro, 1: test, 2: result 현재 페이지
        this.progress = 0; // 현재 질문 단계
        this.questions = {
            EI: [
                {
                    question: '나는 혼자있을때 더 편안함을 느낀다.',
                    answer: { a: '그렇다', b: '아니다' },
                },{
                    question: '나는 혼자있을때 더 편안함을 느낀다.',
                    answer: { a: '그렇다', b: '아니다' },
                },{
                    question: '나는 혼자있을때 더 편안함을 느낀다.',
                    answer: { a: '그렇다', b: '아니다' },
                },{
                    question: '나는 혼자있을때 더 편안함을 느낀다.',
                    answer: { a: '그렇다', b: '아니다' },
                },
            ],
            SN: [
                {
                    question: '재밌는 영화를 보고 난 후 나는...',
                    answer: { a: '재밌었다. 밥이나 먹으러 가야지', b: '인터넷에서 영화 해석을 검색해본다.' },
                },{
                    question: '재밌는 영화를 보고 난 후 나는...',
                    answer: { a: '재밌었다. 밥이나 먹으러 가야지', b: '인터넷에서 영화 해석을 검색해본다.' },
                },{
                    question: '재밌는 영화를 보고 난 후 나는...',
                    answer: { a: '재밌었다. 밥이나 먹으러 가야지', b: '인터넷에서 영화 해석을 검색해본다.' },
                },{
                    question: '재밌는 영화를 보고 난 후 나는...',
                    answer: { a: '재밌었다. 밥이나 먹으러 가야지', b: '인터넷에서 영화 해석을 검색해본다.' },
                },
            ],
            TF: [
                {
                    question: '누군가 나를 싫어하는 걸 알았을 때.',
                    answer: { a: '어쩌라는건지', b: '왜 나를 싫어할까?' },
                },{
                    question: '누군가 나를 싫어하는 걸 알았을 때.',
                    answer: { a: '어쩌라는건지', b: '왜 나를 싫어할까?' },
                },{
                    question: '누군가 나를 싫어하는 걸 알았을 때.',
                    answer: { a: '어쩌라는건지', b: '왜 나를 싫어할까?' },
                },
            ],
            JP: [
                {
                    question: '나는 과제를 할 때',
                    answer: { a: '계획부터 세운다.', b: '일단 시작한다.' },
                },{
                    question: '나는 과제를 할 때',
                    answer: { a: '계획부터 세운다.', b: '일단 시작한다.' },
                },{
                    question: '나는 과제를 할 때',
                    answer: { a: '계획부터 세운다.', b: '일단 시작한다.' },
                },{
                    question: '나는 과제를 할 때',
                    answer: { a: '계획부터 세운다.', b: '일단 시작한다.' },
                },{
                    question: '나는 과제를 할 때',
                    answer: { a: '계획부터 세운다.', b: '일단 시작한다.' },
                },{
                    question: '나는 과제를 할 때',
                    answer: { a: '계획부터 세운다.', b: '일단 시작한다.' },
                },
            ],
        }; // 질문 모음
        this.results = []; // 사용자가 선택한 답모음
        this.init();
    }

    init() {
        this.questionArray = this.getQuestion(); // 질문을 배열로 저장
    }

    start() {
        if(this.progress !== 0) return; // 진행중이면 실행하지 않음
        console.log(this.getCurrentQuestions()) // 브라우저 개발자 도구에 log 출력 용도
        return this.getCurrentQuestions();
    }

    getQuestion() { // questions의 키를 참조해서 질문을 반환
        return Object.keys(this.questions)
        .flatMap(key => this.questions[key].map(question => ({ ...question, type: key })));
    }

    getCurrentQuestions() { // 현재 progress의 질문을 반환
        return this.questionArray[this.progress];
    }

    submitAnswer(answer) {
        if(this.questionArray.length <= this.progress){ // 질문이 끝났으면
            console.log('더이상 질문이 없습니다.');
            return `당신의 성향은 ${this.calcResult()}입니다.`;
        }

        this.results.push({
            type: this.questionArray[this.progress].type,
            answer: Object.keys(this.questionArray[this.progress].answer)
            .find(selectedAnswer => {
                return this.questionArray[this.progress].answer[selectedAnswer] === answer;
            })
        }); // 사용자가 선택한 답을 results에 추가 (type: 질문의 키, answer: 사용자가 선택한 답의 키)
        this.progress++; // 질문 단계 증가
        return this.getCurrentQuestions();
    }

    calcResult() {
        const totalResult = this.result = Object.keys(this.questions).reduce((acc, cur) => {
            acc[cur] = this.results.filter(result => result.type === cur).reduce((acc, cur) => {
                acc[cur.answer] = acc[cur.answer] ? acc[cur.answer] + 1 : 1;
                return acc;
            }, {});
            return acc;
        }, {});

        return this.createPersonalResult(totalResult); // 결과를 createPersonalResult에 넘겨줌
    }

    createPersonalResult(totalResult) {
        return Object.keys(totalResult).reduce((acc, cur) => {
            if(!totalResult[cur].a) return acc + cur[1]; // a가 없으면 b를 반환
            if(!totalResult[cur].b) return acc + cur[0]; // b가 없으면 a를 반환

            if(totalResult[cur].a === totalResult[cur].b){ // a와 b가 같으면
                acc += '★';
                return acc;
            }
            if(totalResult[cur].a > totalResult[cur].b){ // a가 b보다 크면
                acc += cur[0]
            }else{ // b가 a보다 크면
                acc += cur[1]
            };

            return acc;
        }, "");
    }

    render() {} // 추후 dom에 내용을 바꾸기 위한 함수 작성
}
