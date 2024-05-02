let container = document.querySelector(".container");
let btn = document.getElementById("spin");
let number 

btn.onclick = async function () {
    const outcome = await fetch('/wheel')
    .then(res => res.json())
    number = parseInt(outcome.outcome) * 45 + 720 
	container.style.transform = "rotate(" + number + "deg)";
	
    console.log(outcome)
}



// let container = document.querySelector(".container");
// let btn = document.getElementById("spin");
// let number = Math.ceil(Math.random() * 1000);

// btn.onclick = function () {
// 	container.style.transform = "rotate(" + number + "deg)";
// 	number += Math.ceil(Math.random() * 1000);
// }
