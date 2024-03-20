const raceTrack = document.getElementById('raceTrack');
const cars = document.querySelectorAll('.car');
const betAmountInput = document.getElementById('betAmount');
const selectedDriverInput = document.getElementById('selectedDriver');
const balanceDisplay = document.getElementById('balance');
const resultDisplay = document.getElementById('result');
const startButton = document.getElementById('startButton');

let balance = 100;
let raceInProgress = false;

function placeBet() {
    let betAmount = parseInt(betAmountInput.value);

    // Valor da aposta é válido e se o jogador tem saldo
    if (!betAmount || betAmount < 5) {
        alert("Por favor coloque o valor da aposta (valor minimo: R$5).");
        return; 
    } else if (balance === 0) {
        alert("Você não tem saldo na carteira. Reinicie!");
        return; 
    } else if (betAmount > balance) {
        alert("Você não tem saldo para realizar essa aposta");
        return;
    }

    let selectedDriver = parseInt(selectedDriverInput.value);
    let winningDriver = Math.floor(Math.random() * 5) + 1;

    // Atualiza o saldo
    if (selectedDriver === winningDriver) {
        balance += betAmount;
    } else {
        balance -= betAmount;
    }

    // Atualiza saldo 
    balanceDisplay.textContent = `R$${balance}`;
}

function startRace() {
    if (raceInProgress) return;
    raceInProgress = true;
    
    // Velocidade dos carros
    const speed = 50; 

    // Move os carros até o final
    let distance = 0;
    const raceTrackWidth = raceTrack.offsetWidth;
    const carWidth = cars[0].offsetWidth;
    const raceDistance = raceTrackWidth - carWidth;

    const moveCars = setInterval(() => {
        cars.forEach(car => {
            distance = parseInt(car.style.marginLeft) || 0;
            if (distance< raceDistance) {
                car.style.marginLeft = `${distance + Math.random() * 10}px`; 
            } else {
                clearInterval(moveCars); // Interrompe quando chega a linha de chegada
                handleRaceResult(cars.indexOf(car) + 1, parseInt(selectedDriverInput.value), parseInt(betAmountInput.value));
                raceInProgress = false;
            }
        });
    }, speed);
}

function placeBetAndStartRace() {
    placeBet(); // Chama a função para fazer a aposta
    startRace(); // Chama a função para iniciar a corrida
}       

function handleRaceResult(winner, selectedDriverIndex, betAmount) {
    resultDisplay.textContent = `O ganhador é o carro ${winner}`;
    
    if (winner === selectedDriverIndex) {
        const winnings = betAmount * 2;
        balance += winnings;
        resultDisplay.textContent += `. Você acabou de ganhar R$${winnings}!`;
    } else {
        resultDisplay.textContent += `. Você perdeu sua aposta`;
        balance -= betAmount;
    }
    
    balanceDisplay.textContent = `R$${balance}`;
}


function resetGame() {
    resultDisplay.textContent = '';
    balance = 100;
    betAmountInput.value = '';
    raceInProgress = false;
    cars.forEach(car => car.style.marginLeft = '0');
}