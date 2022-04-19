let addCard = document.getElementById("add_card");
let deleteCards = document.getElementById("delete_cards");
let quastion = document.getElementById("quastion");
let answer = document.getElementById("answer");
let save = document.getElementById("save");
let close = document.getElementById("close");
let cardsField = document.getElementsByClassName("cards_field")[0];
let cardCreateField = document.getElementsByClassName("card_create_field")[0];
let allCards = [];

if(localStorage.getItem('cards')) {
	for(let i = 0; i < JSON.parse(localStorage.getItem('cards')).length; i++) {
		allCards.push(JSON.parse(localStorage.getItem('cards'))[i]);
		cardsField.innerHTML += `<div class="card">
									<div class="answer_card_closed">${allCards[i]["answer"]}</div>
									<div class="quastion_card">${allCards[i]["quastion"]}</div>
								</div>`;
	}
}

addCard.addEventListener('click', e => {
	cardCreateField.classList.toggle("card_create_field_opened");
	addCard.style.pointerEvents = "none";
})

close.addEventListener('click', e => {
	cardCreateField.classList.toggle("card_create_field_opened");
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
		answer.classList.add("value_empty");
	}
	else {
		answer.classList.remove("value_empty");
	}
	if(quastion.value.trim() === '') {
		quastion.classList.add("value_empty");
	}
	else {
		quastion.classList.remove("value_empty");
	}
	if (answer.value.trim() !== '' && quastion.value.trim() !== '') {
		allCards.push({"quastion": quastion.value, "answer":  answer.value});
		localStorage.setItem('cards', JSON.stringify(allCards));
		cardsField.innerHTML += `<div class="card">
									<div class="answer_card_closed">${answer.value}</div>
									<div class="quastion_card">${quastion.value}</div>
								</div>`;
		answer.value = "";
		quastion.value = "";
	}
})

cardsField.addEventListener('click', e => {
	if(e.target.closest('div').className === "card") {
		e.target.children[0].classList.toggle("answer_card");
	}
})