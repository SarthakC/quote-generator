var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var quoteContainer = document.getElementById('quote-container');
var quoteTextSpan = document.getElementById('quote');
var authorTextSpan = document.getElementById('author');
var twitterBtn = document.getElementById('twitter');
var quoteBtn = document.getElementById('new-quote');
var loader = document.getElementById('loader');
var startLoading = function () {
    loader.hidden = false;
    quoteContainer.hidden = true;
};
var completeLoading = function () {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
};
var getQuote = function () { return __awaiter(_this, void 0, void 0, function () {
    var proxyUrl, apiUrl, response, data, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                proxyUrl = 'https://cors-anywhere.herokuapp.com/';
                apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                startLoading();
                return [4 /*yield*/, fetch(proxyUrl + apiUrl)];
            case 2:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 3:
                data = _a.sent();
                completeLoading();
                return [2 /*return*/, data];
            case 4:
                error_1 = _a.sent();
                getQuote();
                console.log('whoops, no quote', error_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var populateData = function (data) {
    var quoteAuthor = data.quoteAuthor, quoteText = data.quoteText;
    quoteText.length > 120
        ? quoteTextSpan.classList.add('long-quote')
        : quoteTextSpan.classList.remove('long-quote');
    authorTextSpan.innerText = quoteAuthor || 'Unknown';
    quoteTextSpan.innerText = quoteText;
};
var tweetQuote = function () {
    var quote = quoteTextSpan.innerText;
    var author = authorTextSpan.innerText;
    var twitterUrl = "https://twitter.com/intent/tweet?text=" + quote + " - " + author;
    window.open(twitterUrl, '_blank');
};
var onLoad = function () { return __awaiter(_this, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getQuote()];
            case 1:
                data = _a.sent();
                populateData(data);
                return [2 /*return*/];
        }
    });
}); };
quoteBtn.addEventListener('click', onLoad);
twitterBtn.addEventListener('click', tweetQuote);
onLoad();
