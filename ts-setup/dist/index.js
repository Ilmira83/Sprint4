"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let randomJoke = document.getElementById('jokes');
let anotherJokeButton = document.getElementById('anotherJoke');
if (randomJoke && anotherJokeButton) {
    function randomDadJokes() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = yield fetch('https://icanhazdadjoke.com/', { headers: { 'Accept': 'application/json' } });
                if (!response.ok) {
                    throw new Error('Response was not received');
                }
                let data = yield response.json();
                randomJoke.innerHTML = data.joke;
            }
            catch (error) {
                console.error('Error fetching joke:', error);
                randomJoke.innerHTML = 'Something went wrong.';
            }
            anotherJokeButton.addEventListener("click", randomDadJokes);
        });
    }
    randomDadJokes();
}
else {
    console.error('Required elements not found');
}
const reportJokes = [];
function rateJoke(id) {
    var _a;
    let currentJoke = (_a = document.getElementById('jokes')) === null || _a === void 0 ? void 0 : _a.innerText;
    let jokeIndex = reportJokes.findIndex(index => index.joke === currentJoke);
    if (!currentJoke)
        return;
    if (jokeIndex != -1) {
        reportJokes[jokeIndex].score = id;
    }
    else {
        reportJokes.push({
            joke: currentJoke,
            score: id,
            date: new Date().toISOString()
        });
    }
    console.log(reportJokes);
}
