let highscoreBtn = document.querySelector(".btn-highscore ul");
let goBack = document.querySelector("#goBack");
let clearScore = document.querySelector("#clearScore");

let getLocalStorageData = JSON.parse(localStorage.getItem("initalName"))

function getItemHighScore() {

  for (var r = 0; r < getLocalStorageData.length; r++) {
    var newItem = getLocalStorageData[r]

    var newListItem = document.createElement("li")
    newListItem.innerHTML = `${r + 1}&nbsp; &nbsp; ${newItem.score}- ${newItem.inital}`
    highscoreBtn.append(newListItem)

  }
}
getItemHighScore()

//go back into main page
goBack.addEventListener("click", () => {
  window.location.href="index.html"
})

//after click clear , automatically cleat from local storage and li tags which we created during show up initial
clearScore.addEventListener("click", () => {
  localStorage.clear();
  highscoreBtn.innerHTML = " ";

})