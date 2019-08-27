class AutoComplete {
  constructor(element, data) {
    this.element = element;
    this.data = data;
    this.filterData = [];
    this.checkChoSung = true;
    this.element.addEventListener('keyup', () => this.element.value.length ? this._dataFiltering() : this.element.parentNode.querySelector('ul').style.display = 'none');
  }
  _serchResultMake() {
    if (this.element.parentNode.querySelector('ul')) this.element.parentNode.querySelector('ul').remove();
    let searchResultUl = document.createElement('ul');
    this.filterData.map((item) => {
      let searchResultLi = document.createElement('li');
      let liInnerHtml = '';
      for (let i = 0; i < item.length; i++) {
        liInnerHtml += item[i] === this.element.value[i - item.indexOf(this.element.value)] ? `<span>${item[i]}</span>` : item[i];
      }
      searchResultLi.innerHTML = liInnerHtml;
      searchResultUl.appendChild(searchResultLi)
      searchResultLi.querySelectorAll('span').forEach(items => items.style.color = 'red');
    })
    this.element.parentNode.appendChild(searchResultUl);
  }
  _dataFiltering() {
    this._checkChoSung();
    this.filterData = this.data.filter(item => this._checkInArray(this._toKorChars(item), this._toKorChars(this.element.value))); // 전체 검색 및 초성검색
    if (this.filterData.length === 0) this.filterData = this.data.filter(item => item.indexOf(this.element.value) >= 0 && this.element.value.length >= 2 ? true : false); // 중단 검색
    !this.element.value.length ? this.element.parentNode.querySelector('ul').style.display = 'none' : this._serchResultMake();
  }
  _checkInArray(array1, array2) {
    let checkArray = [];
    array2.forEach((item, i) => checkArray.push(array1[i] === item ? true : false));
    return checkArray.includes(false) ? false : true;
  }
  _checkChoSung() { // 초성 인지 구분 
    let cCode, str = this.element.value;
    for (let j = 0; j < this.element.value.length; j++) {
      cCode = str.charCodeAt(j);
      if (cCode === 32) { continue; } // 한글이 아닌 경우 
      if (cCode < 0xAC00 || cCode > 0xD7A3) { // 초성만 들어온 경우
        this.checkChoSung = false;
        continue;
      }
      this.checkChoSung = true;
    }
  }
  _toKorChars(string) {
    const cCho = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
    const cJung = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
    const cJong = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
    let cho, jung, jong, cCode, str = string;
    let cnt = str.length, chars = [], chos = [];
    for (let i = 0; i < cnt; i++) {
      cCode = str.charCodeAt(i);
      if (cCode === 32) { continue; } // 한글이 아닌 경우 
      if (cCode < 0xAC00 || cCode > 0xD7A3) { // 초성만 들어온 경우
        chars.push(str.charAt(i));
        chos.push(str.charAt(i));
        continue;
      }
      cCode = str.charCodeAt(i) - 0xAC00;
      jong = cCode % 28; // 종성 
      jung = ((cCode - jong) / 28) % 21; // 중성
      cho = (((cCode - jong) / 28) - jung) / 21; // 초성 
      chars.push(cCho[cho], cJung[jung]);
      chos.push(cCho[cho]);
      if (cJong[jong] !== '') {
        chars.push(cJong[jong]);
      }
    }
    return this.checkChoSung ? chars : chos;
  }
}
