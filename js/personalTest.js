class PersonalTest {
    constructor(target) {
        this.container = document.querySelector(target); // 추후 dom 내용을 바꾸기 위한 선택자
        this.page = 0; // 0: intro, 1: test, 2: result 현재 페이지
        this.progress = 0; // 현재 질문 단계
        this.questions = {
            IE: [{ question: '나는 혼자있을때 더 편안함을 느낀다.', answer: { a:'그렇다', b: '아니다'} }],
            SN: [{ question: '나는 아무 생각도 안할 수 있다.', answer: { a: '그렇다', b: '아무 생각도 안하는 생각도 생각 아닌가?' } }],
            TF: [{ question: '누군가 나를 싫어하는 걸 알았을 때.', answer: { a: '어쩌라는건지', b: '왜 나를 싫어할까?' } }],
            JP: [{ question: '당신의 방을 깨끗한가요?', answer: { a: '그렇다', b: '아니다' } }],
        }; // 질문 모음
        this.results = []; // 사용자가 선택한 답모음
        this.resultInfors = {
            ISTJ: {title:"틀딱", desc: "원리원칙적, 계획적<br />여행가면 나서서 계획짬<br /> 협동하고 이런거 극혐 그냥 나혼자 하는게 젤 편하고 젤 빠름<br /> 누가 도와준다고 해도 혼자 할 수 있음 혼자 함<br /> 내 일이랑 의견에 간섭받는 거 싫어함<br /> 남한테 관심 별로 없는 편<br /> 내 얘기 하는것도 싫고 남 얘기 들어주는 것도 힘듦 내가 왜 듣고있어야 하는지 모르겠음<br /> 책임감 많음<br /> 가끔 공감능력 부족한 거 같다는 소리 들음(남 이야기에 잘 공감 못함)<br /> 딱딱하단 소리 자주 들음<br /> 철벽 잘 침<br /> 프젝같은거 할 때 이야기 딴데로 새는거 개 싫어함 시작했으면 목표한 거 끝내야함 "},
            ISFJ: {title:"소심충", desc: "원칙주의자<br />남 눈치봄, 남들 챙기는 거 좋아함<br />외로움 많이 타는데 많은 사람이랑 있는건 싫음<br />아싸무리에서 인싸, 인싸무리에서 아싸<br />전화오면 고민 오조오억번 하고 받음<br />게으른 완벽주의자<br />게으름뱅이<br />조 짜서 하는 단체활동 안 좋아함<br />혼자서 할 수 있는 일 좋아함<br />남이 볼땐 인생 노잼처럼 보이지만 자기선에선 매우 만족하며 삶<br />배려심 쩔고 공감 잘해줌, 생각 많음<br />인간관계에 스트레서 많이 받음<br />아니면 아니고 말면 말자 마인드<br />겉으론 무덤덤해보여도 속으론 온갖 생각 다 함<br />살짝 비판적<br />어쩔 땐 내향적이고 어쩔 땐 외향적, 성격 왔다갔다해서 나도 내 성격 잘 모름<br />겸손하고 칭찬 많이 해줌<br />진짜 싫어하는 사람 아니면 잘 안까고 남한테 관심도 별로 없음<br />성격 온화, 하자고 하면 거의 다 해줌<br />계획 세우는 거 좋아하고 메모하고 기억해둠<br />사람들한테 나에 대한 어필 잘 안함<br />나서는 거 싫어하는데 관심 받는건 좋음<br />사람들과 어울리는거 좋아하는데 그만큼 혼자 노는것도 좋음<br />되게 쓸데없는 것까지 신경씀 근데 또 쿨함(왔다리 갔다리)<br /> 애인 사귀면 오래감"},
            INFJ: {title:"음침 오타쿠", desc: "생각이 너무 많음<br />새로운 일 시작하는거, 새로운 사람 만나는거 극혐<br />낯가림 심함, 눈치 빠름<br />겉으로 웃는데 속으로 욕 많이 함<br />집순인데 여행가는 건 좋음<br />할거 미리 해치우는 편<br />친해지고 싶은 사람이 있어도 그 사람이 먼저 다가와주길 바람<br />관심받고 싶은데 나서는 건 싫어함<br />내사람한테는 존나 잘해줌 물론 그냥 아는 사람한테도 어느정도 선의를 베풀지만 잘못하면 얄짤없이 버림<br />엄청 조용히 다니는데 엠티 이런곳 가면 나가서 막 춤추고 노래부르고 싶음(가끔 좀 튀고싶을 때 있음)<br />나 혼자 생각할 시간 꼭 필요<br />계획적인거 좋아함, 항상 계획을 세움<br />친하고 마음 맞는 애랑 단 둘이 노는거 좋아함<br />내가 하고싶은건 열심히 함 특히 예술쪽으로<br />감수성 풍부<br />혼자서 생각 정리할 시간 꼭 필요<br />다같이 노는 무의미한 시간이 제일 지루<br />무슨 말을 하더라도 근거가 없으면 너무 싫음 어디서 주워들어서 말하는거 절대 못믿음<br />생각 존나 많고 망상 잦음"},
            INTJ: {title:"정치질", desc: "혼자있는거 존나 좋아함, 사회활동 극혐 근데 단체활동할 때 주도적인 역할 자주 맡음<br />사람많고 시끄러운 장소 극혐<br />굉장한 개인주의자, 이기적<br />하루하루 세세하게 계획짜놓고 지내는 것 좋아함(시간별로, 순서대로)<br />돈관리도 잘 하는 편, 사실과 원리원칙 중요시<br />감정에 휘둘리는 거 싫어함<br />남에게 관심 없고 친구가 고민 상담할때도 공감 못함(근데 겉으로 관심있는 척)-그래서 문제 해결에 도움은 줘도 위로 자체는 잘 못함(남 연애사 듣는게 세상에서 제일 재미없음)<br />공상 잦음, 어떤 사안이나 작품에 대해 다각도로 해석하는 거 좋아함<br />수다 떠는 거 좋아함<br />인간관계 정리 잘 하고 사람에게 정 붙이는데 시간 오래 걸림<br />사람 얼굴, 이름 잘 기억 못함<br />약간 관종끼 있지만 내성적이라 표출은 안함<br />동물들에게는 한없이 친절, 좀 완벽주의자<br />몇몇 물건에 집착함<br />무신경하다는 소리 들음 근데 좋아하는건 또 쩔게 집착함<br />할땐 함 안할땐 안함<br />이성적인데 감성적<br />성격 이상하다는 생각 스스로 자주 함<br />특이하고 특별한데 남에게 그런소리 듣는 건 싫음<br />남 눈치 안보고 남 일에 무신경"},
            ISTP: {title:"정신승리", desc: "만사가 귀찮음★<br />무미건조, 낯가림 근데 친해지면 말 많고 장난도 잘 침<br />새로운 사람 만나는거 극혐<br />남한테 관심 없고 내 얘기도 잘 안함<br />혼자만의 문화생활 즐김, 마웨<br />쓸데없는 소비 엄청함(꽂힌게 있으면 관련된거 다 사야함)<br />노력절약형, 효율적인거 개 좋아함<br />망상 잘 함<br />내가 제일 잘난줄 암<br />카톡 할말없으면 읽씹, 대화 이어가기 안함<br />주류에 속하기 싫어함<br />자기자랑 꼴뵈기 싫음<br />이것저것 공부하고 싶은게 너무 많음 근데 끝을 못봄<br />미루고 미루다 발등에 불떨어져도 안하다가 발등 타들어가면 그제야 함(벼락치기 존나 잘함)<br />기계조작 잘하고 재미있어함<br />하나에 꽂히면 끝장을 봐야함 내가 질릴때까지<br />관심있고 하고싶은것만 함 하기싫은건 죽어도 안함<br />내가 맡은바는 다 함<br />위계질서 개싫어하고 내가 하는거 간섭받으면 육성으로 욕나옴<br />친하면 활발한데 내사람 아니면 입 꾹다물고 있음<br />관종이라 관심받는건 좋은데 시끄러운건 싫어함<br />누가 내 욕해도 별로 신경 안씀<br />웹툰같은거 귀찮아서 못 챙겨봄-챙겨보다가 한번 놓치면 걍 안봄<br />관찰력 뛰어남, 멀티 안됨, 호불호 강함<br />공감능력 부족★티안내려고 노력은 하는데 그래도 티남)<br />엠비티아, 사주, 타로 관심많음<br />청소 안함"},
            ISFP: {title:"융통성 제로", desc: "귀찮음, 행동 느림 감정기복 심하고 공감능력 개쩜<br />모든 일 미룰 수 있을 때까지 다 미룸<br />귀찮고 무기력(매사에 의욕 부족) 근데 한번 삘타면 제대로 함<br />존나 집순이(밖에 나돌아 다니는거 개싫어함)<br />집에가면 연락두절됨<br />배려형 개인주의<br />누구랑 약속 있었는데 취소되면 속으로 기뻐함(약속 잡히는거 극혐)<br />혼자가 좋은데 놀 때가 좋을때가 있기도 하고(막상 만나면 잘 놈)<br />노는건 좋지만 금방 지침<br />조용한 관종(관심받는거 개싫은데 좋음, 소심한 관종)<br />칭찬 받으면 그거 하루종일 생각남<br />갈등, 불화 싫어함<br />다이어리 끝까지 써본 적 없음<br />사람들이랑 만나면 기빨림<br />한번 받은 일은 끝까지 해야한다는 생각이 있음 근데 하다가 잠<br />친해지면 활발함<br />남 눈치 존나 많이 봄<br />하기 싫은거 안하고 하고싶은것만 함<br />착한 줄 아는데 사실 이기적(겉으로 착한척하고 속으로 영악한 생각함)<br />고집, 자존심 진짜 셈<br />남한테 속마음 얘기 잘 안함(제일 친한 사람에게도 얘기할까말까)<br />사람 만나는거 좋은데 싫음<br />결정 잘 못함<br />거절을 잘 못함, 양보를 잘함<br />분석, 비판, 판단은 잘하는데 이러한 판단을 적극적으로 행동에 옮기지는 않음<br />미룰 수 있을때까지 미룸<br />겸손하다는 말 자주 들음<br />낙천적<br />인간관계에 신경 많이 쓰는 편<br />자존감 낮음<br />주변 의견, 주변 분위기 따라감<br />불평불만 다 쌓아두기만하고 표출은 못함"},
            INFP: {title:"찐따", desc: "해야될 일 생각만 하고 실제로는 발만 담그고 안 함<br /> 완전 처음 보는 사람한테는 말 잘 거는데 학교같이 조직생활 하는 곳에서는 낯 엄청 가림<br /> 좋아하는 건 미친 듯이 파고 집중 근데 열정이 초기에만 불타고 빨리 식음<br /> 너무 게을러서 벼락치기 함<br /> 멀티 안됨, 연락 귀찮아함, 안읽씹 잘함<br /> 내적 성장 엄청 중요하게 여김<br /> 가끔 우울한 나에 심취<br /> 내 개인적인 얘기 남들한테 하는거 싫어함(가족포함)<br /> 화날 때 혼자 있어야 함 누가 건들면 안됨<br /> 한번 싫은건 끝까지 싫음(호불호 명확)<br /> 남한테 정말 관심 없음, 남을 잘 안믿음<br /> 남이 나를 어떻게 생각할지 고민 많이 함<br /> 누가 내 일하는 방식에 대해 간섭하면 개빡침, 한국에 살면 예민충이나 사회 부적응자로 보임<br /> 남의 가치관 같은거에 별로 신경 안쓰고 인정하는 편, 누가 내 가치관에 뭐라하는거 싫어함<br /> 남들한테 뭐라고 잘 안 함 근데 이건 귀찮아서지 불만이 없어서가 아님<br /> 인간 존재에 대한 생각을 많이 하고 그래서 인간 자체에 대한 기대치 낮음<br /> 남한테 의지하는 방법을 잘 모르기도 하고 의지하기도 싫어서 힘들어도 혼자 해결하려고 함<br /> 혼자 있는건 좋은데 외로운 건 싫음<br /> 나가는거 귀찮아하는데 막상 나가면 잘놈<br /> 집에서 뒹굴거리면서 티비보는거 개좋아함(존나 집순이)<br /> 여러명이서 노는것보다 한두명이서 노는게 좋음<br /> 돈개념 존나 없음 쓰는데 합리화함<br /> 싸우는 거 싫어해서 걍 내가 희생함<br /> 인간관계에 존나 예민함 나한테 백번을 잘해주다가 한번만 반응 안해줘도 내가 뭐 잘못했나 혼자 생각함<br /> 내 성격 존나 싫은데 스스로를 너무 아끼고 사랑함(난 왜 이럴까 싶으면서도 나자신 겁나 좋아함)<br /> 자기애 강한데 자존감은 낮음<br /> 처음 보는 사이면 먼저 말 못걸음 근데 말 걸면 또 잘 얘기함<br /> 남얘기 잘 들어주는척 하는데 사실 딴생각함(남얘기에 큰 관심없고 공감하고 싶은 마음도 없음)<br /> 시작은 창대하나, 정작 끝을 내는 법은 없음 근데 또 하면 평균 이상<br /> 계획적으로 뭘 하질 못해서 항상 벼락치기함 근데 성적은 나름 잘 나옴<br /> 끈기 없음, 생각만 하고 실천 안함<br /> 남한테 폐끼치는 거 제일 싫어함<br /> 낯 심하게 가리고 사람 사귈 때 따지는거 존나 많음"},
            INTP: {title:"자기합리화", desc: "자발적 아웃사이더(혼자 있는게 제일 편하고 행복), 낯가림<br /> 자기애 개쩜(나 존나 잘난줄 암)<br /> 공상 자주함<br /> 분석, 추리 좋아함, 생각 많음<br /> 무뚝뚝한 편이고 잡담같은것도 잘 못하고 싫어함<br /> 논리력 부족한, 어리석은 사람들 보면 화가 너무 남<br /> 책 진짜 좋아하는데 읽기 귀찮아서 리스트에만 적어놓음<br /> 지식에 대한 욕망 강함<br /> 인간은 싫지만 흥미로운 존재라고 생각<br /> 진지충이라는 소리 자주 들음<br /> 팩폭 하지말라는 소리 자주 들음<br /> 주변에 사람들 별로 없는데 남아있는 사람들이랑은 정말 잘 지냄<br /> 감수성 풍부, 말 많이 안함, 귀찮은거 싫어함<br /> 존나 게으르고 미루기의 끝판왕<br /> 시끄러운거 존나 싫어함<br /> 감정기복 없음<br /> 누구한테 내 감정 잘 표현 안하고 묵혀두는데 딱히 그거에 스트레스 받진 않음(필요성을 못느껴서 말 안하는 것)<br /> 웬만한 일에 상처 안받음<br /> 남이 내 욕하는거 신경 안쓰고 남 욕도 안함<br /> 인간관계 계산적<br /> 친해질 사람이랑 안 맞는 사람은 잠깐 얘기해보면 마음 속으로 바로 결정가능<br /> 사람많은 곳, 시끄러운 곳, 시간약속 안지키는 사람, 멍청한 사람, 무논리 무능력인데 목소리만 큰 사람 존나 싫어함<br /> 친구들이랑 얘기할 때 가벼운 얘기하는거 싫어함 이상한 말장난, 농담따먹기 등<br /> 논리적인거 환장하는데 막상 본인은 논리적으로 말이 안나옴<br /> 공감능력 조금 부족(다른사람 고민 들어주는 척 하지만 속으로 멍때림)-근데 겉으로 사회적인 척 함<br /> 위로 개못해줌 사실 말 자체를 잘 안함<br /> 뭐 하나 시작하면 끝을 봐야함<br /> 개인주의자<br /> 완벽하게 못할거면 안함<br /> 남에게 피해주는 거 싫어하고 남에게 관심 별로 없음(남에게 피해 안끼치려고 아주 조심함)<br /> 할 말 앞에서 다 함<br /> 마웨심함<br /> 자기주관 뚜렷, 호불호 확실<br /> 감수성 풍부"},
            ESTP: {title:"일호선 광인", desc: "외로움 오지게 탐<br /> 손재주 좋아서 취미가 베이킹, 뜨개질, 인형만들기<br /> 리더쉽 있음 조별활동 조장 혹은 반장 도맡아 함<br /> 좀 관종<br /> 표현을 아끼지 않음<br /> 어른들이 좋아함<br /> 밖에서 사람 만나는거 개좋아하는데 게을러서 나가기가까지가 싫음<br /> 하고싶은거 다 해야됨 못하면 혼자서 부들부들하다가 곧 까먹음<br /> 걍 대충살고 눈치도 안봄<br /> 스트레스도 잘 안받음 근데 그렇게 적극적인 편도 아님 걍 사는대로 삼<br /> 공감능력 조금 부족<br /> 남한테 관심 없고 생각하는것도 귀찮음<br /> 모임에서 어느새 내가 분위기 주도하고 있음(정신차리고 보면 내가 다 역할 정해주고 조장하고 있음)<br /> 근자감 쩔"},
            ESFP: {title:"개관종", desc: "성격 개급함(처리하고 싶은 일은 빨리빨리 해야됨 근데 막상 귀찮을 땐 할 일 미루고 미루다가 늦게서야 시작함)<br />우주최강오지랖<br />생각없이 잘삼 아무리 걱정되는 일 있어도 좀만 지나면 무생각<br />하고싶다고 생각한거 다 해야됨 근데 하기싫은건 끝까지 미룸<br />고집 개 셈<br />소액결제할 때 대부분 미래의 나에게 맡김<br />혼자 있으면 지루해서 뭔갈 계속 하고 있어햐 함<br />모임장소에서 침묵 흐르는거 제일 싫어함<br />사람의 단점보단 장점을 보려하고 싸움보단 평화가 좋음<br />사교성 개쩜 모르는 애랑도 잘 놀고 친구의 친구랑 껴서 놀아도 전혀 노상관<br />카톡 용건 있는거 아니면 오래 안읽씹 근데 안오는 건 싫음<br />자존감 개높음 모든게 내 위주<br />사람 너무 좋고 어울리는 거 개좋은데 집밖에 나가기 귀찮음<br />어쩔 수 없는 상황 때문에 어디에 콕 박혀 사람들과 어울리지 못하는 자신을 발견하는 것만큼 이들을 속상하게 하는 것은 없음"},
            ENFP: {title:"머가리 꽃밭", desc: "정신산만함, 생각 많음, 고집 셈<br />일머리 있음<br />흥미있고 관심있는건 겁나 열정적 그러나 관심 없는건 별로 알고싶어하지도 않음, 호불호 분명<br />매번 나서서 무얼 하진 않는데 아무도 안나서면 답답해서 나서는 스타일<br />낯을 좀 가리는데 풀리면 금방 친해지고 말도 많아짐, 얘기하는 거 좋아함<br />생존에 의한 인싸력<br />친구만들려고 인싸력 폭발하지만 친구 생기면 찌질이로 바뀌어서 문제임<br />남 욕 찰지게 잘하는데 내가 욕했던 애는 이미 나를 욕함 삘받아서 더 욕함<br />하나를 제대로 완성 시킨적이 손에 꼽음(완성하면 그거 죽을때까지 행복해함)<br />무언가에 쉽게 몰두했다 쉽게 그만둠<br />약간 집순이(누가 나 안끼워주는건 싫은데 그렇다고 나가서 놀기는 귀찮)<br />외향적이라 친구들이랑 노는게 좋지만 내 시간을 갖고 싶을 땐 철저하게 혼자 있음(종종 잠수탐)<br />남 얘기에 리액션을 잘 해줘서 고민상담 하는 애들 많음<br />거짓말 잘 못해서 입에 발린 말 잘 못함<br />하루에 행복한 일 하나씩 정해놓고 설레함<br />친구들이랑 얘기하는거 좋아함 남얘기든 내얘기든 뭐든 존나 재밌음<br />힘든 친구에게 마음에 없는 위로보다는 극복 방법 제시하는 편<br />새롭게 친구 사귀는 거 좋아함, 사람들이랑 노는거 너무 좋고 친해지는 과정도 행복, 사람들한테 친절 베푸는것도 짱 재밌음<br />감정기복 심함<br />감정 얼굴에 다 드러나는 편<br />일 크게 만들고 싫증나서 안한거 오조오억개<br />눈치 개빠른데 모른척함<br />인간관계 개극단적<br />무계획, 즉흥적인 편, 감정기복 심함<br />내가 하고싶은거 꼭 해야함, 노간지 허용 불가<br />갑자기 꽂혀서 계획한게 오조오억개지만 미루는 것도 그만큼임(확 꽂혔다가 몇 번 해보더니 금방 식음)<br />나서는 걸 좋아해서 모두가 나에게 관심줬으면 함<br />저금 잘 안함"},
            ENTP: {title:"쿨병 말기", desc: "개썅마웨, 이상주의자<br />혼자서 돌아다니는게 제일 편함<br />독립심 강함(한국에 진짜 없는 유형이래!!)<br />탐욕적, 자존심, 고집 셈, 냉철함<br />겉으론 인싸 속모습은 아싸 나한테 잘해주는 사람은 두 배로 잘해주는데 나한테 못해주면 걍 1도 없음<br />밖에 놀러가면 진짜 잘 노는데 집 안에 있는것도 좋음<br />변덕 심함, 자기애 강함, 프레임에 안 놀아남<br />내 의견이랑 상대 의견 다르면 설득하려는 스타일 토론이나 논쟁할 때 내 의견으로 끝나야 속이 시원<br />성공하려면 존나게 성공하고 싶고 바닥을 치려면 아예 방탕하게 살고싶음 중간에서 기는거 딱 질색 직설적이고 솔직하게 내 맘을 표현하는 것에 거리낌이 없음<br />다른 사람들 일에 관심없고 다른 사람들이 나를 어떻게 생각하는지도 별 관심없음 평소에 쪽팔린 일 있어도 어차피 지금 말고 또 볼 일 없는 사람들인데 쪽팔리면 뭐 어떠냐는 식으로 생각함(지나간 일에 후회가 없음, 그래서 힘든 일 있어도 빨리 털어내는 편) 자기합리화랑 포기 존나 잘하고 뒷일 생각 안하고 지금 내가 하고싶은대로 다 하면서 삼(스트레스 거의 없는 삶) 감정기복 심함, 남들한테 기분 바뀌는거 다 티냄<br />사람한테 가장 힐링받고 사람한테 가장 스트레스 받음 좋아하는 사람 싫어하는 사람 명확히 구분됨<br />뒷심부족★ 끈기부족 의지부족(뒷심부족은 정말 매번 나오는 듯…!!)<br />시작을 해도 마무리를 못지음 근데 스트레스는 안받음 언젠가는 잘할거란 맏음이 강해서<br />여기저기 관심 많아서 존나 잡다한거 상식으로 많이 알고 있는데 뒷심부족+집중력 부족으로 공부는 못함<br />무식한 사람 이해하기 힘듬<br />관심있는 건 진짜 관심있음 근데 관심 없는거는 1도 모름<br />다른 사람 생각 안하고 내뱉어서 후회할 때 많은데 그순간뿐임<br />친구들이랑 어디가면 계획 다 내가 짜는데 잘 안지킴(혹은 세세하게 계획짜지 않는 경우도 있음!!)<br />혼자 있는거 좋아하는데 외로움 탐 뭐 하나에 꽂히면 그것만 함 질리면 아예　안함(싫은건 절대 안함)<br />방 개더러움(나만의 정리방식으로 정리한 건데 남이 보기엔 드러워보이나봄)<br />정해진 틀에 갇힌 생활 못함, 반복되는 일 매우 싫어함 잘못된거 잘못됐다고 말해야함<br />계획 못지킴(애초에 세우지도 않음)(계획은 많이 짜는데 못지킨다는 경우도 있더라!!)<br />이기적으로 사는데 이기적인거 안싫어함<br />다방면에 적당한 재능, 근데 다 잘하는데 엄청 잘하진 않음<br />과정보다 결과 중요<br />사람들과 지내는거 좋아하고 친화력 좋고 외향적인데 혼자만의 시간도 필요함<br />손재주 있음"},
            ESTJ: {title:"젊은 꼰대", desc: "고집 셈, 현실적, 이성적, 직설적<br />호불호 확실함<br />사람 많은거 극혐<br />리더 맡는거 싫어하는데 막상 하면 잘함<br />나가서 노는것보단 이것저것 배우는게 좋음<br />외로움 별로 안탐<br />싸우는 거 싫어하지만 싸워서 지는거 싫어함<br />일처리 못하는 거 세상에서 제일 싫음<br />시간약속 어기는 거 싫고 즉흥적인거 싫음 번개약속 개 극 혐<br />내 시간 방해받는거 싫고 나한테 지적하려면 오억가지 근거 갖고 와야함 근데 하나라도 아닌 것 가으면 다 씹고 걍 마웨함<br />남에게 관심없고 오로지 나한테만 집중<br />목표 설정해놓고 그 목표 이룰때까지 한 우물만 팜<br />사람들이 아는 내 성격이랑 혼자 있을 때랑 조금 다름<br />모든게 제자리에 있어야 하고 내 계획이 절대 틀어지면 안됨<br />뭐든 확실한 게 좋음 딱딱 떨어지는거<br />리더역할 주도적으로 자주 함<br />누가 일 못하는 거 못 보고 차라리 그럴바에 내가 두세배로 일 다 해놓음(entj랑 비슷한 듯)<br />공감능력 부족(누가 힘든얘기 하면 감정적 공감보다 상황분석 먼저하고 누가 잘못했네 머릿속으로 따지고 있음<br />그치만 상처받을까봐 얘기는 안함(위로 존나 못함)"},
            ESFJ: {title:"친목질", desc: "생각보다 철저함 혼자 계획 세우고 그 계획 틀어지는 거 싫어함<br />술자리 좋아함(특히 새로운 사람과의)<br />남 눈치 많이 봄(남 생각 잘해서 그에 맞춰줌)<br />책 읽고 영화보는거 좋아함<br />상담, 고민 들어주는 거 잘함<br />친구, 가족 내 주변 인물들 다 챙기고 이 사람들 불행하면 내가 다 불행해지는 수준임 인간관계 틀어지면 스트레스 오지게 받음<br />인간관계에서 상처받아도 그 사람 배려한다고 얘기 못함<br />어디 나가면 어색한거 못참고 먼저 말 검"},
            ENFJ: {title:"우유부단", desc: "존나 시끄러움<br />핵인싸 되고싶어함<br />사람들을 이끄는 것에 타고난 기질이 있고 좋아하기도 함 사람을 되게 좋아함<br />상대방도 본인을 신뢰한다는 느낌을 받으면 살아있음을 느낌<br />단순함, 멘탈 강함<br />무리에 속해있는 것도 좋아하지만 마이웨이 기질 약간 있음<br />여가시간 혼자 보내는거 좋아함<br />많은 사람들의 신뢰를 받는 성격<br />사람들한테 잘 맞춰주는 성격<br />객관적, 직관적<br />내가 스스로를 잘 앎<br />일에 흥미가 많은 사람이라 꿈이 여러개<br />센스있고 눈치가 빠름<br />계획짜는거 개좋아함 조금이라도 벗어나면 개빡침<br />남들 눈치봄<br />남들 신경쓰고 잘해주려하는데 그만큼 상처도 받음"},
            ENTJ: {title:"선민의식", desc: "시원찮은 애랑 팀플하면 엄청 답답해하고 결국 총대매고 내가 함<br />활동적이고 집순이 기질은 아님 근데 누구한테 의존하거나 의지하는 스타일도 아님 오직 세상에 믿을 사람은 나 하나 이런 마인드<br />열등감 느낀적 극히 드뭄<br />약간 관종끼<br />피해 주는거, 피해 받는거 싫어하고 남 일에 노관심<br />남이 이래라 저래라 하는거 싫어하고 냉철해질땐 끝도 없이 냉철해짐<br />나서서 하는걸 좋아한다기보단 남들이 하는 꼬라지가 맘에 안들어서 못보겠음<br />누가 뭐 못하면 답답하고 이해가 안됨<br />성격 불도저 같은 경향<br />자기애 강함<br />감정적 공감 안됨<br />내 일은 내 일 니 일은 니 일<br />친구들이 하소연해도 공감이 아니라 해결책 찾아줌<br />머리 개똑똑해서 인생 사는게 쉽지만 내가 하기싫은건 안함 그래도 억지로 해야할 땐 최대한 힘 안들이고 빨리 끝낼 수 있는 방법 찾느라 머리 오지게 굴림<br />새로운 사람 만나는 거 좋아하지만 인간과 깊은 관계　맺는건 별로 안좋아함<br />앞일 걱정할 시간에 오만가지 루트 머릿속에서 시뮬레이션 다 해보고 해결책 찾아가는 쪽<br />존나 현실적, 논리적 근데 혼자있을 땐 상상력 개오져짐<br />사람많을 땐 프로페셔널한 정상인, 혼자있을 땐 몽상가"},
        }
        this.init();
    }

    init() {
        this.questionArray = this.getQuestion(); // 질문을 배열로 저장

        const answerAButton = this.container.querySelector('button[data-answer="a"]');
        const answerBButton = this.container.querySelector('button[data-answer="b"]');
        const startButton = this.container.querySelector('button[data-action="start"]');
        const restartButton = this.container.querySelector('button[data-action="restart"]');

        answerAButton.addEventListener('click', () => this.submitAnswer(answerAButton.innerText));
        answerBButton.addEventListener('click', () => this.submitAnswer(answerBButton.innerText));
        startButton.addEventListener('click', this.start.bind(this));
        restartButton.addEventListener('click', this.restart.bind(this));

        /*
        2023-05-19 리팩토링
        1. 이벤트 리스너 함수 분리: 이벤트 리스너를 분리하여 코드 가독성 향상.
        2. e.target.innerText 대신 클릭한 버튼의 innerText를 매개변수로 전달. (직관성)
        3. querySelector 결과를 변수에 저장: 반복적인 querySelector 호출을 피하여 가독성 향상.
        */

        this.render();
    }

    start() {
        if(this.progress !== 0) return; // 진행중이면 실행하지 않음

        this.page = 1;
        this.render();
    }

    restart() {
        this.page = 0;
        this.progress = 0;
        this.results = [];
        this.render();
    }

    getQuestion() { // questions의 키를 참조해서 질문을 반환
        return Object.entries(this.questions)
        .flatMap(([type, questions]) => questions.map(question => ({ ...question, type })));

        /*
        2023-05-19 리팩토링
        1. Object.entries를 사용하여 객체를 배열로 변환 후 이차원 배열을 flatMap으로 평탄화.
        */
    }

    getCurrentQuestions() { // 현재 progress의 질문을 반환
        const currentQuestionIndex = this.progress;
        return this.questionArray[currentQuestionIndex];

        /*
        2023-05-19 리팩토링
        1. currentQuestionIndex 변수 도입으로 현재 질문의 인덱스를 명시적으로 표현하여 가독성 향상.
        */
    }

    submitAnswer(answer) {
        const currentQuestion = this.questionArray[this.progress];

        if (this.questionArray.length <= this.progress + 1) {
            this.page = 2;
            this.render();
        }

        const selectedAnswer = Object.keys(currentQuestion.answer)
        .find(selectedAnswer => currentQuestion.answer[selectedAnswer] === answer);

        this.results.push({
            type: currentQuestion.type,
            answer: selectedAnswer
        });

        this.progress++;
        this.render();

        return this.getCurrentQuestions();

        /*
        2023-05-19 리팩토링
        1. this.questionArray[this.progress]를 반복해서 사용하는 대신 currentQuestion라는 변수를 도입하여 가독성 향상
        2. Object.keys() 및 find() 메서드를 사용하여 사용자가 선택한 답변에 해당하는 키 값을 찾는 과정을 단순화.
        */
    }

    calcResult() {
        const totalResult = Object.keys(this.questions).reduce((acc, cur) => {
            acc[cur] = this.results
                .filter(result => result.type === cur)
                .reduce((acc, cur) => {
                acc[cur.answer] = acc[cur.answer] ? acc[cur.answer] + 1 : 1;
                return acc;
            }, {});
            return acc;
        }, {});
        
        return this.createPersonalResult(totalResult);
        /*
        2023-05-19 리팩토링
        1. this.result = 부분 제거, totalResult 변수에 할당 이후 중첩 reduce() 메서드를 사용하여 가독성 향상.
        */
    }

    createPersonalResult(totalResult) {
        return Object.keys(totalResult).reduce((acc, cur) => {
            const result = totalResult[cur];
            
            if (!result.a) return acc + cur[1];
            if (!result.b) return acc + cur[0];
        
            if (result.a === result.b) {
                return acc + cur[0];
            }
            
            return acc + (result.a > result.b ? cur[0] : cur[1]);
        }, "");
        /*
        2023-05-19 리팩토링
        1. totalResult[cur]를 result 변수로 저장하여 가독성 향상
        2. if문의 반환 값이 같은 경우를 하나로 통합하여 가독성을 개선
        */
    }

    render() {
        const introContainer = this.container.querySelector('.intro_container');
        const testContainer = this.container.querySelector('.test_container');
        const resultContainer = this.container.querySelector('.result_container');

        if (this.page === 0) {
            introContainer.classList.add('active');
            testContainer.classList.remove('active');
            resultContainer.classList.remove('active');

        } else if (this.page === 1) {
            testContainer.classList.add('active');
            introContainer.classList.remove('active');
            resultContainer.classList.remove('active');

            const progressElement = this.container.querySelector('.progress');
            const questionElement = this.container.querySelector('.question');
            const answerAElement = this.container.querySelector('button[data-answer="a"]');
            const answerBElement = this.container.querySelector('button[data-answer="b"]');
        
            progressElement.textContent = `Q${this.progress + 1}. `;
            questionElement.textContent = this.getCurrentQuestions().question;
            answerAElement.textContent = this.getCurrentQuestions().answer.a;
            answerBElement.textContent = this.getCurrentQuestions().answer.b;

        } else if (this.page === 2) {
            resultContainer.classList.add('active');
            introContainer.classList.remove('active');
            testContainer.classList.remove('active');
        
            const resultTextElement = this.container.querySelector('.result_text');
            const resultInforTitleElement = this.container.querySelector('.result_infor_title');
            const resultInforElement = this.container.querySelector('.result_infor');
            const calcResult = this.calcResult();
        
            resultTextElement.innerHTML = `당신의 성향은 <span class="point_text">${calcResult}</span>입니다.`;
            resultInforTitleElement.innerHTML = `[ ${this.resultInfors[calcResult].title} ]`;
        
            resultInforElement.innerHTML = this.resultInfors[calcResult].desc
            .split('<br />')
            .map(el => `<li>${el}</li>`)
            .join('');
        }
        /*
        2023-05-19 리팩토링
        1. 각각의 UI 요소를 변수로 저장하여 가독성을 향상 
        2. 텍스트 콘텐츠와 HTML 내용을 설정하는 부분을 변수로 분리하여 가독성을 개선
        */
    }
}
