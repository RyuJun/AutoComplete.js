# AutoComplete.js
[Demo   : https://ryujun.github.io/demos/JavaScript/Carousel/](https://ryujun.github.io/demos/JavaScript/Carousel/)<br>
[Github : https://github.com/RyuJun/AutoComplete.js](https://github.com/RyuJun/AutoComplete.js)
> AutoComplete.js는 es6++ 문법으로 작성된 input박스 자동완성 module이다. 
> 초성검색, 중단검색, 전체검색 등을 지원하며 각종 검색 Search Bar 구현에 사용 될 수 있다.

## 지원
> chrome, firefox, while 등등의 모던브라우저 및 ie9 버전 이상에서 지원함

## 설치 및 사용방법

### 일반 웹 페이지

웹 페이지에서 사용하려면 html파일 `<head>`테그 사이에 `AutoComplete.js` 파일을 링크한다.

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>AutoComplete</title>
  <script src="./AutoComplete.min.js" type="text/javascript"></script><!--추가-->
</head>
<body>
...

```
`AutoComplete.js`는 es6++문법으로 작성되어 `ie`에서 작동하지 않는다.<br>
`AutoComplete.min.js`은 트렌스 파일링이 완료된 파일로써 이를 사용하면 `ie9`버전과 모던브라우저 둘 다 지원이 가능하다.<br>


자바스크립트 코드에서 생성자 new AutoComplete( element, Data )를 사용하여 접근할 수 있다. 첫번째 인자로 해당 `Element`를 넣어준 후, 두번째 인자로 배열 형태의 `Data`를 넣어준다.
```js
var list = ["라그나로크 제로", "니드포스피드엣지", "리니지M", "오버히트", "배틀그라운드", "테라m", "열혈강호forkakao", "AxE", "페이트 그랜드 오더", "리니지", "던전앤파이터", "바람의나라", "메이플스토리", "블레이드앤소울", "리니지2 레볼루션", "아이온", "마비노기", "마비노기영웅전", "리니지2", "거상", "피파온라인3", "다크에덴", "테일즈위버", "뮤오리진[Android]", "뮤오리진[iOS]", "아키에이지", "리그오브레전드", "테라", "서든어택", "오버워치", "모두의마블 for kakao", "세븐나이츠", "레이븐", "별이되어라!", "포켓 메이플스토리", "서머너즈워", "아이모", "몬스터길들이기", "클래시 오브 클랜", "레알팜", "히트캔", "괴리성밀리언아서", "하얀고양이 프로젝트", "갓오브하이스쿨"];
new AutoComplete(document.querySelector('#autocomplete'), list);
```

### Exmaple

```html
<div class="autocomplete-wrapper">
    <input type="text" id="autocomplete">
</div>
<script>
  var list = ["라그나로크 제로", "니드포스피드엣지", "리니지M", "오버히트", "배틀그라운드", "테라m", "열혈강호forkakao", "AxE", "페이트 그랜드 오더", "리니지", "던전앤파이터", "바람의나라", "메이플스토리", "블레이드앤소울", "리니지2 레볼루션", "아이온", "마비노기", "마비노기영웅전", "리니지2", "거상", "피파온라인3", "다크에덴", "테일즈위버", "뮤오리진[Android]", "뮤오리진[iOS]", "아키에이지", "리그오브레전드", "테라", "서든어택", "오버워치", "모두의마블 for kakao", "세븐나이츠", "레이븐", "별이되어라!", "포켓 메이플스토리", "서머너즈워", "아이모", "몬스터길들이기", "클래시 오브 클랜", "레알팜", "히트캔", "괴리성밀리언아서", "하얀고양이 프로젝트", "갓오브하이스쿨"];
  new AutoComplete(document.querySelector('#autocomplete'), list);
</script>
```
위와같이 html파일 내에 AutoComplete element를 만들어준 뒤 `JavaScript` 코드를 작성해준뒤 `Input`에 키를 입력하면 조건에 일치하는 정보가 자동완성목록으로 나오게 된다.


### 주의사항
`AutoComplete`는 `Array` 형태로 데이터를 받기 때문에 `Object`나 다양한 경우의 데이터 형식으로 `Data` 값을 넘기면 애러가 출력 된다. 그럴때는 Data부분을 손봐서 단순한 1차원 배열로 만들어 주는 작업이 필요 하다. 
```js
// data가 단순한 1차원 배열이 아니라 여러 가지 경우의 수가 들어올때
var list = [
      {
        "N": "라그나로크 제로",
        "S": "ㄹ"
      },
      {
        "N": "니드포스피드엣지",
        "S": "ㄴ"
      },
      {
        "N": "리니지M",
        "S": "ㄹ"
      },
      {
        "N": "오버히트",
        "S": "ㅇ"
      },
      {
        "N": "배틀그라운드",
        "S": "ㅂ"
      },
      {
        "N": "테라m",
        "S": "ㅌ"
      },
      // ......
    ]; 

  list = list.map(item => item.N);
  new AutoComplete(document.querySelector('#autocomplete'), list);
// list : ["라그나로크 제로", "니드포스피드엣지", "리니지M", "오버히트", "배틀그라운드", "테라m" ... ]
```