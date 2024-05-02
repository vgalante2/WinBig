const coinIcon = document.getElementById('coin');
const betForm = document.getElementById("bet-form") 
const tossBtn = 
	document.getElementById('bet-btn'); 
const result = 
	document.querySelector('.result'); 
coinIcon.insertAdjacentElement('afterend', result) 
betForm.addEventListener('submit', tossCoinFunction) 
async function tossCoinFunction(event) { 
	event.preventDefault()
	tossBtn.disabled = true
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

    const bet =  await fetch('api/bets/bet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(betObj),
      })
      .then(res=>res.json())

      const user = await fetch(`api/users/${user_id}`)
      .then(res=>res.json())

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
    cardMax.max = parseFloat(user.balance).toFixed(2)
    sideBalance.innerText = parseFloat(user.balance).toFixed(2)
}
