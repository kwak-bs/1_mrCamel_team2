
<h1 align='middle'><a href='https://six-sense.github.io/1_mrCamel_team2/#/'>https://six-sense.github.io/1_mrCamel_team2/#/</a></h1>

---
🧐[노션 리팩토링 링크](https://green-chipmunk-3f6.notion.site/3-fb1b9c525b9744c0af84db7dbaff648f)에서 리팩토링 과정을 확인해보세요!

---

<br/>

## 📌 프로젝트 소개

###  프리온보딩 코스 Mr.camel 기업 과제
> ❕ **JSON 데이터를 이용한 쇼핑몰 구현**❗

<br/>

<details>
    <summary><STRONG>
       📚 과제 요구사항 보기
        <STRONG></summary>
    <div markdown="1">
<h3>사용자들이 어떤 상품을 봤는지, 보기 싫어하는지, 보고 싶어 하는지를 파악하여 관리하기 위한 상품 조회 이력 어플리케이션</h3> <br/>
- ClassComponent 사용해서 만들어 주세요.<br/>
- SessionStorage 또는 LocalStorage 사용해서 이력을 관리해 주세요.<br/>
- 외부 API를 사용하지 않고, Client의 리소스만 사용합니다.
</div>
</details>
<br/>

## 📑 페이지 별 상세 기능 

`상품상세 페이지 (/product)`

- 제목, 브랜드, 가격 상품 100개 json 사용
- 상품상세 조회 시 이력데이터 누적하고, 동일 상품 조회 시 최신 데이터로 갱신
- '랜덤상품 조회' 클릭 시 현 상품을 제외하고 랜덤 로드
- '관심 없음' 클릭 시 랜덤 로드하며, 현 상품은 앞으로 상품상세에서 노출되지 않음

`상품 조회이력 목록 페이지 (/recentList)`

- 00시 기준으로 최근 조회이력과 관심 없는 상품목록 초기화
- 별도 페이징 처리 없이 전체 로드
- (목록 상단) 필터: '브랜드'(전체 및 존재하는 브랜드 목록으로 구성), 다중선택 가능
- (목록 상단) 필터: '관심 없는 상품 숨기기' 체크박스
- (선택 팝업) 정렬: 최근 조회 순, 낮은 가격 순
- 상품 클릭 시 '상품상세 페이지'로 이동, 관심 없는 상품 클릭 시 경고메세지 노출되며 이동하지 않음

<br/>

## 👨‍💻 실행 방법

### 설치

`npm install`

### 실행

`npm start`

<br/>

### 💡구현 파트

| 팀원   | 구현기능                                                     |
| ------ | ------------------------------------------------------------ |
| 곽병선 | 상품 상세 페이지 UI, 랜덤상품조회 & 관심없음 클릭시 랜덤로드, 상품조회시 데이터 누적 및 갱신 |
| 김은태 | JSON데이터 시각화, 정렬(최근 조회순, 낮은 가격순)기능, 레이아웃 디자인 |
| 박채연 | 상품 조회이력 목록 페이지UI, 필터링(브랜드, 관심없음)기능, localStorage초기화 기능 |
| 황윤성 | 상품 목록 페이지 UI, 페이지이동, 관심 없는 상품 클릭시 경고메시지 출력 |

