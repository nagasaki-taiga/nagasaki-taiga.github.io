let numOne = "";
let numTwo = "";
let operator = "";

const $operator = document.querySelector("#operator");
const $result = document.querySelector("#result");

const onClickNumber = (event) => {
    if (!operator) {
        numOne += event.target.textContent;
        $result.value += event.target.textContent;
        return;
    }
    if (!numTwo) {
        $result.value = "";
    }
    numTwo += event.target.textContent;
    $result.value += event.target.textContent;
};
document.querySelector("#num-0").addEventListener("click", onClickNumber);
document.querySelector("#num-1").addEventListener("click", onClickNumber);
document.querySelector("#num-2").addEventListener("click", onClickNumber);
document.querySelector("#num-3").addEventListener("click", onClickNumber);
document.querySelector("#num-4").addEventListener("click", onClickNumber);
document.querySelector("#num-5").addEventListener("click", onClickNumber);
document.querySelector("#num-6").addEventListener("click", onClickNumber);
document.querySelector("#num-7").addEventListener("click", onClickNumber);
document.querySelector("#num-8").addEventListener("click", onClickNumber);
document.querySelector("#num-9").addEventListener("click", onClickNumber);

const onClickOperator = (op) => () => {
    if (numOne) {
        operator = op;
        $operator.value = op;
        if (numTwo) {
            switch (operator) {
                case "＋":
                    $result.value = parseInt(numOne) + parseInt(numTwo);
                    numOne = $result.value;
                    numTwo = "";
                    break;
                case "-":
                    $result.value = numOne - numTwo;
                    numOne = $result.value;
                    numTwo = "";
                    break;
                case "×":
                    $result.value = numOne * numTwo;
                    numOne = $result.value;
                    numTwo = "";
                    break;
                case "÷":
                    $result.value = numOne / numTwo;
                    numOne = $result.value;
                    numTwo = "";
                    break;
                default:
                    break;
            }
        }
    } else {
        alert("숫자를 먼저 입력하세요.");
    }
};
document.querySelector("#plus").addEventListener("click", onClickOperator("＋"));
document.querySelector("#minus").addEventListener("click", onClickOperator("-"));
document.querySelector("#multiply").addEventListener("click", onClickOperator("×"));
document.querySelector("#divide").addEventListener("click", onClickOperator("÷"));

document.querySelector("#calculate").addEventListener("click", () => {
    if (numTwo) {
        switch (operator) {
            case "＋":
                $result.value = parseInt(numOne) + parseInt(numTwo);
                numOne = $result.value;
                numTwo = "";
                $operator.value = "";
                break;
            case "-":
                $result.value = numOne - numTwo;
                numOne = $result.value;
                numTwo = "";
                $operator.value = "";
                break;
            case "×":
                $result.value = numOne * numTwo;
                numOne = $result.value;
                numTwo = "";
                $operator.value = "";
                break;
            case "÷":
                if (numTwo === "0") {
                    alert("0으로는 나눌 수 없습니다.");
                    $result.value = numOne;
                    numTwo = "";
                    $operator.value = "";
                    break;
                } else {
                    $result.value = numOne / numTwo;
                    numOne = $result.value;
                    numTwo = "";
                    $operator.value = "";
                    break;
                }
            default:
                break;
        }
    } else if (!operator) {
        alert("연산자를 입력하세요.");
    } else {
        alert("숫자를 입력하세요.");
    }
});

document.querySelector("#clear").addEventListener("click", () => {
    numOne = "";
    numTwo = "";
    operator = "";
    $operator.value = "";
    $result.value = "";
});
