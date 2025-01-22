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
let weatherForecast = document.getElementById('weather');
let anotherJokeButton = document.getElementById('anotherJoke');
const reportJokes = [];
let checkJokeApi = true;
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
        });
    }
    function secondJokeApi() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let secondResponse = yield fetch('https://v2.jokeapi.dev/joke/Programming?type=single');
                if (!secondResponse.ok)
                    throw new Error('Response was not recieved');
                const secondData = yield secondResponse.json();
                randomJoke.innerHTML = secondData.joke;
            }
            catch (error) {
                console.error('Error fetching joke:', error);
                randomJoke.innerHTML = 'Something went wrong.';
            }
        });
    }
    function getNewJoke() {
        return __awaiter(this, void 0, void 0, function* () {
            if (checkJokeApi) {
                yield randomDadJokes();
            }
            else {
                yield secondJokeApi();
            }
            checkJokeApi = !checkJokeApi;
        });
    }
    getNewJoke();
    anotherJokeButton.addEventListener("click", getNewJoke);
}
else {
    console.error('Required elements not found');
}
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
function weatherFcst() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let currentWeather = yield fetch('https://api.openweathermap.org/data/2.5/weather?q=Barcelona&units=metric&appid=013779a50c93746dcb0df44be7e190a3', { headers: { 'Accept': 'application/json' } });
            if (!currentWeather.ok) {
                throw new Error('Response was not received');
            }
            let data = yield currentWeather.json();
            weatherForecast.innerHTML = `${data.name} <br> ${data.main.temp}°C`;
        }
        catch (error) {
            console.error('Error fetching weather:', error);
            weatherForecast.innerHTML = 'Something went wrong.';
        }
    });
}
weatherFcst();
