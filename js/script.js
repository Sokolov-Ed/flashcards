let addCard = document.getElementById("addCard");
let deleteCards = document.getElementById("deleteCards");
let quastion = document.getElementById("quastion");
let answer = document.getElementById("answer");
let save = document.getElementById("save");
let close = document.getElementById("close");
let cardsField = document.getElementsByClassName("cardsField")[0];
let cardCreateField = document.getElementsByClassName("cardCreateField")[0];
let allCards = [];

if(localStorage.getItem('cards')) {
	for(let i = 0; i < JSON.parse(localStorage.getItem('cards')).length; i++) {
		allCards.push(JSON.parse(localStorage.getItem('cards'))[i]);
		cardsField.innerHTML += `<div class="card">
									<div class="answerCardClosed">${allCards[i]["answer"]}</div>
									<div class="quastionCard">${allCards[i]["quastion"]}</div>
								</div>`;
	}
}

addCard.addEventListener('click', e => {
	cardCreateField.classList.toggle("cardCreateFieldOpened");
	addCard.style.pointerEvents = "none";
})

close.addEventListener('click', e => {
	cardCreateField.classList.toggle("cardCreateFieldOpened");
	addCard.style.pointerEvents = "auto";
	answer.value = "";
	quastion.value = "";
})

deleteCards.addEventListener('click', e => {
	cardsField.innerHTML = "";
	localStorage.clear();
	allCards = [];
})

save.addEventListener('click', e => {
	if(answer.value.trim() === '') {
		answer.classList.add("valueEmpty");
	}
	else {
		answer.classList.remove("valueEmpty");
	}
	if(quastion.value.trim() === '') {
		quastion.classList.add("valueEmpty");
	}
	else {
		quastion.classList.remove("valueEmpty");
	}
	if (answer.value.trim() !== '' && quastion.value.trim() !== '') {
		allCards.push({"quastion": quastion.value, "answer":  answer.value});
		localStorage.setItem('cards', JSON.stringify(allCards));
		cardsField.innerHTML += `<div class="card">
									<div class="answerCardClosed">${answer.value}</div>
									<div class="quastionCard">${quastion.value}</div>
								</div>`;
		answer.value = "";
		quastion.value = "";
	}
})

cardsField.addEventListener('click', e => {
	if(e.target.closest('div').className === "card") {
		e.target.children[0].classList.toggle("answerCard");
	}
})