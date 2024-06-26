//---축약---//
const $form = document.querySelector("#form");
const $result = document.querySelector("#result");
const $bonus = document.querySelector("#bonus");
const $log = document.querySelector("#log");

//------//
function drawBall(number, $parent) {
    const $ball = document.createElement("div");
    $ball.className = "ball";
    $ball.textContent = number;
    $parent.appendChild($ball);
    colorize(number, $ball);
}
const setTimeoutPromise = (ms) =>
    new Promise((resolve, reject) => {
        setTimeout(resolve, ms);
    });

//--- 공에 색칠 함수 ---//
function colorize(number, $tag) {
    if (number < 10) {
        $tag.style.backgroundColor = "Red";
        $tag.style.color = "White";
    } else if (number < 20) {
        $tag.style.backgroundColor = "Orange";
    } else if (number < 30) {
        $tag.style.backgroundColor = "Yellow";
    } else if (number < 40) {
        $tag.style.backgroundColor = "Blue";
        $tag.style.color = "White";
    } else if (number >= 40) {
        $tag.style.backgroundColor = "Green";
        $tag.style.color = "White";
    }
}

//--- 인풋 숫자 검증 ---//
let clickable = true;
$form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!clickable) {
        return;
    }
    clickable = false;
    $result.innerHTML = "";
    $bonus.innerHTML = "";
    //검증//
    const string = event.target.input.value;
    if (!string.trim()) {
        $log.textContent = "숫자를 입력하세요";
        return;
    }
    const myNumbers = string.split(",").map((v) => parseInt(v.trim()));
    if (myNumbers.length !== 6) {
        $log.textContent = "숫자를 6개 입력하세요.";
        clickable = true;
        return;
    }
    if (new Set(myNumbers).size !== 6) {
        $log.textContent = "중복된 숫자를 입력했습니다.";
        clickable = true;
        return;
    }
    if (myNumbers.find((v) => v > 45 || v < 1)) {
        $log.textContent = "1부터 45까지만 입력할 수 있습니다.";
        clickable = true;
        return;
    }
    $log.textContent = "";
    //피셔 셔플//
    const candiate = Array(45)
        .fill()
        .map((v, i) => i + 1);
    const shuffle = [];
    while (candiate.length > 0) {
        const random = Math.floor(Math.random() * candiate.length);
        const spliceArray = candiate.splice(random, 1);
        const value = spliceArray[0];
        shuffle.push(value);
    }

    //6+1숫자 뽑기//
    const winBalls = shuffle.slice(0, 6).sort((a, b) => a - b);
    const bonus = shuffle[6];
    for (let i = 0; i < winBalls.length; i++) {
        await setTimeoutPromise(1000);
        drawBall(winBalls[i], $result);
    }
    await setTimeoutPromise(1000);
    drawBall(bonus, $bonus);
    await setTimeoutPromise(500);
    let count = 0;
    myNumbers.forEach((my) => {
        if (winBalls.includes(my)) {
            count++;
        }
    });
    if (count === 6) {
        $log.textContent = "1등! 현실 로또 당첨될 운을 여기에 쓰시다니...";
    } else if (count === 5) {
        if (myNumbers.includes(bonus)) {
            $log.textContent = "2등! 보너스 공이지만 숫자 6개를 맞추셨네요.";
        } else {
            $log.textContent = "3등! 아쉽습니다. 그래도 축하드려요.";
        }
    } else if (count === 4) {
        $log.textContent = "4등! 5만원 축하드려요!";
    } else if (count === 3) {
        $log.textContent = "5등! 5천원 축하드려요.";
    } else {
        $log.textContent = "꽝!";
    }
    clickable = true;
});
