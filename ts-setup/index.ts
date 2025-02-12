
let randomJoke = document.getElementById('jokes')
let weatherForecast = document.getElementById('weather')
let anotherJokeButton = document.getElementById('anotherJoke')  
const reportJokes: {joke: string; score: number; date: string }[] = []
let checkJokeApi : boolean = true

if (randomJoke && anotherJokeButton) {
  async function randomDadJokes() : Promise<void> {
    try {
     let response = await fetch('https://icanhazdadjoke.com/',  { headers: { 'Accept': 'application/json' } }) 
      if (!response.ok) {
        throw new Error('Response was not received')
      }
     let data = await response.json()
     randomJoke.innerHTML = data.joke 
    }
    catch (error) {
      console.error('Error fetching joke:', error)
      randomJoke.innerHTML = 'Something went wrong.'
    }
  } 

  
  async function secondJokeApi() {
    try {   
      let secondResponse = await fetch('https://v2.jokeapi.dev/joke/Programming?type=single')
        if (!secondResponse.ok) throw new Error('Response was not recieved')
          const secondData = await secondResponse.json();
         randomJoke.innerHTML = secondData.joke
    }
      catch (error) {
        console.error('Error fetching joke:', error)
        randomJoke.innerHTML = 'Something went wrong.'
      }
  }
  async function getNewJoke() : Promise<void> {
    if (checkJokeApi) {
      await randomDadJokes()
    } else {
      await secondJokeApi()
    }
    checkJokeApi = !checkJokeApi
  }
  getNewJoke()
  anotherJokeButton.addEventListener("click", getNewJoke) 
} else {
  console.error('Required elements not found')
}


function rateJoke(id: number) {
  let currentJoke = document.getElementById('jokes')?.innerText
  let jokeIndex: number = reportJokes.findIndex(index => index.joke === currentJoke)
  
  if(!currentJoke) return

  if (jokeIndex != -1) {
    reportJokes[jokeIndex].score = id 
  } else {
    reportJokes.push({
    joke: currentJoke,
   
    score: id,
   
    date: new Date().toISOString()
    } )
  } 
  console.log(reportJokes)
}

async function weatherFcst() : Promise<void> {
  try {
    let currentWeather = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Barcelona&units=metric&appid=013779a50c93746dcb0df44be7e190a3', 
     { headers: { 'Accept': 'application/json' } })
     if (!currentWeather.ok) {
      throw new Error('Response was not received')
    }
    let data = await currentWeather.json()
    weatherForecast.innerHTML = `${data.name} <br> ${data.main.temp}°C` 
  }
  catch (error) {
    console.error('Error fetching weather:', error)
    weatherForecast.innerHTML = 'Something went wrong.'
  }
}
weatherFcst()  





 

