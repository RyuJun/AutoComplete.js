function getInitSound(src) {
  const init = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
  let iSound = '';
  for (var i = 0; i < src.length; i++) {
    let index = Math.floor(((src.charCodeAt(i) - 44032) / 28) / 21);
    if (index >= 0) {
      iSound += init[index];
    }
  }
  return iSound;
}


console.log(getInitSound("각이유짱"));
console.log(getInitSound("abcdefg"));
console.log(getInitSound("12345678"));


const pattern_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; // 한글체크
console.log(pattern_kor.test('ㅁㅁㅁ'));

class AutoComplete {
  constructor(element, jsonData) {
    console.log(jsonData);
    this.element = element;
    this.jsonData = jsonData
    this.filterData = [];


    this.element.addEventListener('keyup', () => this._dataFiltering());
  }
  _dataFiltering() {
    console.log(this.element.value);
    // console.log(this.filterData.filter(item => item.N === this.element.value));
    this.filterData = this.jsonData.filter(item => item.N === this.element.value);
    console.log(this.filterData);
  }
}
