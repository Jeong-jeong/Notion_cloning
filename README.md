# 노션 클로닝 프로젝트

## 💬 설명

- Vanila JS를 컴포넌트화한 노션 클로닝 프로젝트입니다.

## 👍 깨달은 점

- **Vanila JS**로도 프레임워크, 라이브러리처럼 컴포넌트화 시킬 수 있다는 걸 깨달았습니다.
    - 리액트와 같이 `this.state`, `this.setState()`로 상태를 관리하고 `this.render()`를 통해 DOM 렌더링 시기를 결정했습니다.
    - Props-drilling을 피하기 위해 가장 최상단 app 컴포넌트가 아닌 기능으로 구분시킨 최상단 컴포넌트에서부터 props를 내려 props의 연관성을 낮추고자 하였습니다.
    - isvalid 함수로 최소한의 state validation을 검사하고자 노력하였습니다.
- customEvent를 적용한 pushUrl 함수로 **router를 구현**하였고, 두번째 인자로 boolean 값을 받아 **선택적 렌더링**을 구현하였습니다.
    - 같은 리스트 클릭 시에 pushUrl 호출을 방지해 전체 라우팅을 최소화하였습니다.
    - pushState와 popstate로 페이지 깜빡임을 방지하며 라우팅하였습니다.
    - History.pushState()와 popstate()를 이해하며, popstate 이벤트 발생 시 scrollTarget.scrollIntoView로 이전 active 위치로 scrollView를 이동시켰습니다.
- **localStorage**에 active key, toggle key를 저장해 사용자가 active한 리스트와 토글한 리스트들의 새로고침 초기화를 방지하였습니다.

## 🥶 아쉬웠던 점

- 디바운싱과 쓰로틀링의 개념을 명확히 이해하고 사용하지 못했습니다.
- props-drilling을 피하기 위해 컴포넌트를 기능별로 구분했음에도 완벽하게 drilling을 피할 수 없었습니다. 이를 위해 props, 즉 상태를 전역적으로 관리할 store의 필요성을 느꼈습니다.
- 프레임워크와 라이브러리를 사용한 적 없이 Vanila로 진행한 프로젝트여서 이해하기가 더욱 난해했던 것 같습니다. Vue와 React로 프로젝트를 진행하는 지금 회고록을 돌아보며 상태관리와 라우터, SPA와 store의 필요성을 절실히 느꼈습니다.

## 🙆‍♀️ 다음 목표

- 디바운싱과 쓰로틀링의 개념을 명확히 이해하고 다음 프로젝트에 적용해보기
- 낙관적 업데이트 적용하기
- Vanila.js로 store를 구현해보기

---

## 🤸🏽‍♀️ 배포 주소
[접속하기](https://notion-cloning.vercel.app)

## 노션 클로닝 회고록

[🙀 고뇌록 | [JS] 노션 클로닝](https://velog.io/@jeongs/TIL-%EB%85%B8%EC%85%98-%ED%81%B4%EB%A1%9C%EB%8B%9D)

## 📌 데모
### 토글 구현 및 토글 상태 저장
![토글](https://user-images.githubusercontent.com/68528752/132099662-ad867183-60c2-4eba-9fdb-d6e00bf83e81.gif)

### 추가 | 삭제
![삭제](https://user-images.githubusercontent.com/68528752/132099725-caca8e48-a86f-4691-862d-2eeaf3ef7e3e.gif)

### content 변경
![내용변경](https://user-images.githubusercontent.com/68528752/132099772-b45f0b2b-0dcc-490f-a7f8-66425c60f3c5.gif)

### 뒤로가기 및 목록 늘리기
![뒤로가기](https://user-images.githubusercontent.com/68528752/132099827-36379f41-4b19-480c-93a0-6a28d10182ab.gif)




