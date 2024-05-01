const coinIcon = document.getElementById('coin');
const betForm = document.getElementById("bet-form") 
const tossBtn = 
	document.getElementById('bet-btn'); 
const result = 
	document.querySelector('.result'); 
coinIcon.insertAdjacentElement('afterend', result) 
tossBtn.addEventListener('click', tossCoinFunction) 
async function tossCoinFunction(event) { 
	event.preventDefault()
    // make new route to return event
    const eventObj = {
      event_name: "coinflip",
      odds: {
          heads: 0.50,
          tails: 0.50
      }
  }
    const user_id = betForm.dataset.user
    const newEvent =  await fetch('api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventObj)
    })
    .then(res=>res.json())
  const event_id = newEvent.id
  const bet_name = document.querySelector('input[name="bet_name"]:checked').value
const amount = document.getElementById("amount").value
    const betObj = {
      user_id: user_id,
      event_id: event_id,
      bet_name: bet_name,
      amount: amount,
      odds: 0.50
    }
    console.log(betObj)

    const bet =  await fetch('api/bets/bet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(betObj),
      })
      .then(res=>res.json())
    console.log(bet)

	const faceCoin = bet.result == 'heads' ? 'Heads' : 'Tails'; 
	const imageUrl = faceCoin === 'Heads' ? 
'/assets/images/coin-heads.png' : 
'/assets/images/coin-tails.png'; 
		
	coinIcon.classList.add('flip'); 
	setTimeout(() => { 
		coinIcon.innerHTML = 
			`<img src="${imageUrl}" alt="${faceCoin}">`; 
		coinIcon.classList.remove('flip'); 
		setTimeout(() => { 
			result.textContent = `Result: ${faceCoin}`; 
			result.style.opacity = 1; 
			tossBtn.disabled = false; 
		}, 500); 
	}, 1000); 
	const cardMax = document.getElementById("amount")
    const sideBalance = document.getElementById("side-balance")
    let newBalance = parseFloat(cardMax.max)-parseFloat(amount)
    let payout = +bet.payout
    if(payout){
      console.log(cardMax.max)
      console.log(sideBalance.innerText)
      newBalance = newBalance + payout

    }
    cardMax.max = newBalance
    sideBalance.innerText = newBalance
}
