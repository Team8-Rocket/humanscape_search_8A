# Humanscape 검색어 추천이 있는 검색창

## Built with
|![lumpenop](https://avatars.githubusercontent.com/u/68418005?v=4)|![Seung-wan](https://avatars.githubusercontent.com/u/51105841?v=4)|![jui9266](https://avatars.githubusercontent.com/u/103873136?v=4)|![hsw824](https://avatars.githubusercontent.com/u/79175916?v=4)|
|:---:|:---:|:---:|:---:|
|[**김승원**](https://github.com/lumpenop)|[**유승완**](https://github.com/Seung-wan)|[**이주이**](https://github.com/jui9266)|[**홍성우**](https://github.com/hsw824)


## 기술 스택
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"> <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=TypeScript&logoColor=white"> <img src="https://img.shields.io/badge/Redux-toolkit-7F42C3?style=for-the-badge&logo=Redux-toolkit&logoColor=white"> <img src="https://img.shields.io/badge/React-Query-007396?style=for-the-badge&logo=React-Query&logoColor=white"> <img src="https://img.shields.io/badge/yarn-2783B3?style=for-the-badge&logo=yarn&logoColor=white">

> * React 18.1.0
> * TypeScript 4.4.2
> * Redux-toolkit 1.8.1
> * React-Query 3.39.0
> * yarn 1.22.17

## 데모 페이지
[데모 페이지] https://humanscape-8a.netlify.app/

## 구현 방식
> 5월 20일 : 전체적인 ui 구성   
  5월 21일 : 추천 리스트 출력, 키보드 만으로 검색어 이동, 검색어와 일치하는 검색결과 부분 볼드 처리 구현   
  ※기능을 구현할 때 팀원들 모두 live share로 모여 작업하였음※


## Preview
### 1. 검색어 입력 후 키보드 이벤트
![움짤1](https://user-images.githubusercontent.com/79175916/169678465-ade34f0a-2a53-48ca-878a-8e6edd7612f0.gif)
### 2. 잘못된 검색어 입력시 화면 구성
![움짤3](https://user-images.githubusercontent.com/79175916/169678508-c2749e4a-3e8b-42b5-a48a-2e988d63cfdb.gif)
### 3. 검색어 입력 후 마우스로 검색 결과 호버했을 때,  호버한 곳에서 화살표(⬆️, ⬇️)로 이동하는 모습
![움짤4](https://user-images.githubusercontent.com/79175916/169678541-64609fb8-78d3-439b-99fd-e718d69aaadf.gif)
### 4. 검색어 입력 후 검색 결과 클릭시 검색창 value 변화
![움짤2](https://user-images.githubusercontent.com/79175916/169678553-87e0cf9e-e4c4-4599-a221-5f235e99d386.gif)

## 구현 방법
### 추천 리스트 출력
> * input 창에 searchText 입력 시 custom hook에서 setTimeout으로 디바운싱 처리 하여 redux 스토어에 저장 - api 호출이 text 입력이 변경될 때 마다 일어나지 않도록 하기 위해 디바운싱. 
redux 스토어에 새로운 debouncedSearchText가 저장되면 react-query useQuery내에서 api 호출 함수 실행, api 호출 count state와 setCount를 함께 전달
> * 캐싱을 간편히 구현하기 위해 useQuery 사용
> * api 호출 시 axios cancel 토큰을 생성하도록 설정하여, 이미 토큰을 가지고 있을 경우 이전 호출 취소 - input text를 변경하여도 이전 호출이 계속 이뤄지는 것은 자원 낭비라고 생각하여 중도에 cancel 
> * cancel 토큰이 없다면 api 호출 setCount((prev) prev + 1) 이후 console로 count 출력 후 api 호출 실행
> * .then() 에서 response 데이터 형식에 따라 데이터 처리 - array로 올 경우 바로 리턴, object 형식으로 올 경우 배열 형식으로 리턴하여 map으로 처리할 수 있게 함
> * .catch() 에서 오류 처리, cancel() 실행 시 처리
> * useQuery 캐싱을 이용하기 위해 staleTime: 5분, 검색어가 있을 때만 api를 호출하도록 enabled 설정 

### 키보드만으로 검색어 이동
> * useRef로 포커싱 될 대상 찾기 -> 인풋 / 다른 태그들은 눈에 보여지는게 없거나 ref로 사용하기 애매한것들이라서 input으 input태그에서만 이벤트가 나올 수 있도록 정함
> * useState로 index를 만들고 -1으로 해둔다. => map 함수에서 생성되는 index와 대조하기 위해서
> * 아래 화살표를 누르면 index에 1씩 더해준다 -> event.code === ‘ArrowDown’
> * 위 화살표 키를 누르면 index에 1씩 빼준다 -> event.code === ‘ArrowUp’
// keyCode는 사용이 권장되지 않는다. key 혹은 code로 사용하는것을 권장한다.

> * itemList의 map 함수에서 생성된 index와 useState로 만들어진 index를 대조해 둘이 일치할 경우 active 클래스를 부여한다 => active 클래스가 부여 된 경우 백그라운드에 컬러표시
> * 마지막 list item에서 아래 화살표를 누르면 index를 다시 0으로 만들어 제일 위 item으로 올라갈 수 있도록 한다.
> * 처음 list item에서 위 화살표를 누르면 index를 item.length -1을 뺀 만큼으로 만들어 맨 아래 아이템으로 갈 수 있도록 한다.
> * searchText = 검색어가 들어올 때마다 index를 -1로 배치해 키보드 이벤트가 일어나야만 active가 보이도록 한다. =>인풋에서 키보드를 내려야 첫번째 아이템에 active가 들어와야 하는데 -1을 해주지 않으면 처음부터 첫번째 아이템에 active가 보이기 때문
> * data가 없을 경우 함수가 실행되지 않도록 함
> * 엔터 입력 시 searchText를 active된 list의 value로 변경 -> 새로운 api호출
> * 인풋에 한글로 검색하면 처음에 두번 튀는 현상이 보였다.(keyCode === 229 이슈) Composing이 끝났을 경우만 함수가 실행되도록 event.nativeEvent.isComposinng 인 경우로 해결하였음.


### 검색어와 일치하는 검색결과 부분 볼드 처리
> * 검색어 출력 list 내부에서 debouncedSearchText로 split하여 debouncedSearchText에 볼드 처리, 볼드 처리된 텍스트 앞에 split된 list[0], 텍스트 뒤에 list[1]을 붙여 출력.
> * 강조하는 부분은 mark 태그를 이용하였음.



## 자세한 실행 방법
### 서비스 사용 방법
1. ‘질환명을 입력해 주세요’에 검색하고 싶은 질환명을 검색한다.(ex, 간염, 감기 등등)
2. 검색 결과가 나올 경우 키보드 화살표(⬆️, ⬇️)를 이용해서 이동할 수 있다.

### 설치 방법
1. 명령어 창에 git clone https://github.com/Team8-Rocket/humanscape_search_8A/tree/main 하여 클론 받는다.
2. yarn install or npm install로 package를 다운 받는다.
3. yarn start or npm run start로 실행한다.

## 개선점 
퍼지 문자열 검색
