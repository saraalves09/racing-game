document.addEventListener("DOMContentLoaded", function() {
    const balanceDisplay = document.getElementById("balance");
    const betAmountInput = document.getElementById("bet-amount");
    const driverSelect = document.getElementById("driver-select");
    const placeBetBtn = document.getElementById("place-bet");
    const raceTrack = document.getElementById("race-track");
    const resultDisplay = document.getElementById("result");

    let balance = 100;
    let raceInProgress = false;

    placeBetBtn.addEventListener("click", function() {
        const betAmount = parseInt(betAmountInput.value);
        const selectedDriver = parseInt(driverSelect.value);

        if (betAmount > balance) {
            alert("Insufficient balance!");
            return;
        }

        if (betAmount < 5) {
            alert("Minimum bet amount is R$5!");
            return;
        }

        balance -= betAmount;
        balanceDisplay.textContent = balance;

        // Simulate race result (for demonstration purpose)
        const randomWinner = Math.ceil(Math.random() * 5);
        if (randomWinner === selectedDriver) {
            balance += betAmount * 2;
            balanceDisplay.textContent = balance;
            resultDisplay.textContent = "Congratulations! You won!";
        } else {
            resultDisplay.textContent = "Sorry! You lost!";
        }

        if (!raceInProgress) {
            raceInProgress = true;
            resultDisplay.textContent = "";

            const cars = document.querySelectorAll(".car");
            cars.forEach(car => {
                car.style.left = "0px";
            });

            const raceInterval = setInterval(() => {
                cars.forEach(car => {
                    const distance = parseInt(car.style.left) + Math.ceil(Math.random() * 10);
                    car.style.left = `${distance}px`;

                    if (distance >= 380) {
                        clearInterval(raceInterval);
                        raceInProgress = false;
                        resultDisplay.textContent = "Race finished!";
                    }
                });
            }, 50);
        }
    });

    // Initialize race track with cars
    for (let i = 1; i <= 5; i++) {
        const car = document.createElement("div");
        car.classList.add("car");
        car.style.top = `${20 + (i * 30)}px`;
        raceTrack.appendChild(car);
    }
});
