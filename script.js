const images = [
  {
    image_name: 'bananas.jpg',
    number_of_items: 6,
  },
  {
    image_name: 'birthday candles.jpg',
    number_of_items: 7,
  },
  {
    image_name: 'blocks.jpg',
    number_of_items: 6,
  },
  {
    image_name: 'brushes.jpg',
    number_of_items: 7,
  },
  {
    image_name: 'cakes.jpg',
    number_of_items: 7,
  },
  {
    image_name: 'cars.jpg',
    number_of_items: 2,
  },
  {
    image_name: 'crayons.jpg',
    number_of_items: 8,
  },
  {
    image_name: 'cupcakes.jpg',
    number_of_items: 7,
  },
  {
    image_name: 'deer.jpg',
    number_of_items: 3,
  },
  {
    image_name: 'donuts.jpg',
    number_of_items: 6,
  },
  {
    image_name: 'ducks.jpg',
    number_of_items: 6,
  },
  {
    image_name: 'eggs.jpg',
    number_of_items: 8,
  },
  {
    image_name: 'elephants.jpg',
    number_of_items: 7,
  },
  {
    image_name: 'hot air balloons.jpg',
    number_of_items: 5,
  },
  {
    image_name: 'jelly beans.jpg',
    number_of_items: 9,
  },
  {
    image_name: 'macaroons.jpg',
    number_of_items: 7,
  },
  {
    image_name: 'pencils.jpg',
    number_of_items: 12,
  },
  {
    image_name: 'people.jpg',
    number_of_items: 6,
  },
  {
    image_name: 'peppers.jpg',
    number_of_items: 2,
  },
  {
    image_name: 'pizza slices.jpg',
    number_of_items: 8,
  },
]

const timeDelay = 500
let currentImageValue = 0,
  displayNumber = 0,
  score = 0,
  chosen = false

document.getElementById('timeSetting').innerHTML = timeDelay / 1000
document.getElementById('currentScore').innerHTML = score
const totalAvailableRef = document.getElementById('totalAvailable').innerHTML = images.length
document.getElementById('game-area').style.display = "none"

generateImage = (randomNumber) => {
  // get random image file name
  const imageFileName = images[randomNumber].image_name
  const image = document.querySelector('img')
  image.src = `images/${imageFileName}`
  // display name of item (first remove .jpg extension)
  const imageName = imageFileName.slice(0, imageFileName.length - 4)
  document.getElementById('item-name').innerHTML = imageName
  // get current item number
  const numberOfItems = images[randomNumber].number_of_items
  // set false 
  const number0to1 = Math.floor(Math.random() * 2)
  const plusOrMinus = number0to1 === 0 ? -1 : +1
  // add real or false number to element
  const split = Math.floor(Math.random() * 2)
  if (split === 0) {
    document.getElementById('number').innerHTML = numberOfItems
    displayNumber = numberOfItems
  } else {
    document.getElementById('number').innerHTML = `${numberOfItems + plusOrMinus}`
    displayNumber = `${numberOfItems + plusOrMinus}`
  }
  currentImageValue = numberOfItems
  images.splice(randomNumber, 1)
}

play = () => {
  document.getElementById('welcome').style.display = "none"
  document.getElementById('play-button').style.display = "none"
  document.getElementById('game-area').style.display = "block"
  loop()
  timer()
}

loop = () => {
  document.getElementById("message").innerHTML = ""
  if (images.length === 0) {
    endOfGame()
    stopTimer()
    return
  }
  chosen = false
  const randomNumber = Math.floor((Math.random() * images.length))
  generateImage(randomNumber)
}

const timer = () => {
  setInterval(loop, timeDelay)
}

match = () => {
  if (!chosen) {
    currentImageValue === displayNumber ? score++ : score--
    chosen = true
    document.getElementById('currentScore').innerHTML = score
  }
}

noMatch = () => {
  if (!chosen) {
    currentImageValue !== displayNumber ? score++ : score--
    chosen = true
    document.getElementById('currentScore').innerHTML = score
  }
}

stopTimer = () => {
  clearInterval(timer)
}

endOfGame = () => {
  document.getElementById('game-area').style.display = "none"
  document.getElementById("message").innerHTML = `Game over, your score was ${score} / ${totalAvailableRef}`
  setTimeout(() => location.reload(), 3000)
}