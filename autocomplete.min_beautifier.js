"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AutoComplete =
  /*#__PURE__*/
  function () {
    function AutoComplete(element, data) {
      var _this = this;

      _classCallCheck(this, AutoComplete);

      this.element = element;
      this.data = data;
      this.filterData = [];
      this.checkChoSung = true;
      this.element.addEventListener('keyup', function () {
        return _this.element.value.length ? _this._dataFiltering() : _this.element.parentNode.querySelector('ul').style.display = 'none';
      });
    }

    _createClass(AutoComplete, [{
      key: "_serchResultMake",
      value: function _serchResultMake() {
        var _this2 = this;

        this.element.parentNode.querySelector("ul") && this.element.parentNode.removeChild(this.element.parentNode.querySelector("ul"));
        var searchResultUl = document.createElement('ul');
        this.filterData.map(function (item) {
          var searchResultLi = document.createElement('li');
          var liInnerHtml = '';

          for (var i = 0; i < item.length; i++) {
            liInnerHtml += item[i] === _this2.element.value[i - item.indexOf(_this2.element.value)] ? "<span>".concat(item[i], "</span>") : item[i];
          }

          searchResultLi.innerHTML = liInnerHtml;
          searchResultUl.appendChild(searchResultLi);
          for (var i = 0; i < searchResultLi.querySelectorAll("span").length; i++) searchResultLi.querySelectorAll("span")[i].style.color = "red"
        });
        this.element.parentNode.appendChild(searchResultUl);
      }
    }, {
      key: "_dataFiltering",
      value: function _dataFiltering() {
        var _this3 = this;

        this._checkChoSung();

        this.filterData = this.data.filter(function (item) {
          return _this3._checkInArray(_this3._toKorChars(item), _this3._toKorChars(_this3.element.value));
        }); // 전체 검색 및 초성검색

        if (this.filterData.length === 0) this.filterData = this.data.filter(function (item) {
          return item.indexOf(_this3.element.value) >= 0 && _this3.element.value.length >= 2 ? true : false;
        }); // 중단 검색

        !this.element.value.length ? this.element.parentNode.querySelector('ul').style.display = 'none' : this._serchResultMake();
      }
    }, {
      key: "_checkInArray",
      value: function _checkInArray(array1, array2) {
        var checkArray = [];
        var checkResult = true;
        for (var i = 0; i < array2.length; i++) {
          checkArray.push(array1[i] === array2[i] ? true : false);
        }
        for (var j = 0; j < checkArray.length; j++) {
          if (!checkArray[j]) {
            checkResult = false;
            continue;
          }
        }
        return !checkResult ? false : true;
      }
    }, {
      key: "_checkChoSung",
      value: function _checkChoSung() {
        // 초성 인지 구분 
        var cCode,
          str = this.element.value;

        for (var j = 0; j < this.element.value.length; j++) {
          cCode = str.charCodeAt(j);

          if (cCode === 32) {
            continue;
          } // 한글이 아닌 경우 


          if (cCode < 0xAC00 || cCode > 0xD7A3) {
            // 초성만 들어온 경우
            this.checkChoSung = false;
            continue;
          }

          this.checkChoSung = true;
        }
      }
    }, {
      key: "_toKorChars",
      value: function _toKorChars(string) {
        var cCho = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
        var cJung = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
        var cJong = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
        var cho,
          jung,
          jong,
          cCode,
          str = string;
        var cnt = str.length,
          chars = [],
          chos = [];

        for (var i = 0; i < cnt; i++) {
          cCode = str.charCodeAt(i);

          if (cCode === 32) {
            continue;
          } // 한글이 아닌 경우 


          if (cCode < 0xAC00 || cCode > 0xD7A3) {
            // 초성만 들어온 경우
            chars.push(str.charAt(i));
            chos.push(str.charAt(i));
            continue;
          }

          cCode = str.charCodeAt(i) - 0xAC00;
          jong = cCode % 28; // 종성 

          jung = (cCode - jong) / 28 % 21; // 중성

          cho = ((cCode - jong) / 28 - jung) / 21; // 초성 

          chars.push(cCho[cho], cJung[jung]);
          chos.push(cCho[cho]);

          if (cJong[jong] !== '') {
            chars.push(cJong[jong]);
          }
        }

        return this.checkChoSung ? chars : chos;
      }
    }]);

    return AutoComplete;
  }();