var elemArray = document.querySelectorAll("#cypher-type, #options, #encode-radio, #decode-radio, #submit-btn, #decoded-text, #encoded-text");

const decodedTextElement = elemArray[0];
const typeSelectElement = elemArray[1];
const optionsElement = elemArray[2];
const encodeRadioBtn = elemArray[3];
const decodeRadioBtn = elemArray[4];
const submitBtnElement = elemArray[5];
const encodedTextElement = elemArray[6];

console.log(elemArray);

initListeners();

function initListeners() {
    typeSelectElement.addEventListener("change", function () {
        if (typeSelectElement.selectedIndex == 0) {
            document.getElementById("caesar-shift").remove();
            document.getElementById("shift-label").remove();
        } else {
            addShiftElement();
        }
    });

    submitBtnElement.addEventListener("click", function (event) {
        event.preventDefault();

        if (typeSelectElement.selectedIndex == 0) {
            if (isEncode()) {
                encodedTextElement.value = btoa(decodedTextElement.value);
            } else {
                decodedTextElement.value = atob(encodedTextElement.value);
            }
        } else {
            if (isEncode()) {
                encodedTextElement.value = caesarCipher(
                    decodedTextElement.value,
                    parseInt(document.getElementById("caesar-shift").value)
                );

            } else {
                encodedTextElement.value = caesarCipher(
                    decodedTextElement.value,
                    parseInt(document.getElementById("caesar-shift").value) * -1
                );
            }
        }
    });
}

function addShiftElement() {
    let caesarShiftLabel = document.createElement("label");
    let caesarShiftInput = document.createElement("input");

    caesarShiftLabel.innerHTML = "Shift: ";
    caesarShiftLabel.setAttribute("id", "shift-label");
    caesarShiftLabel.setAttribute("for", "caesar-shift");

    caesarShiftInput.style.width = "50px";
    caesarShiftInput.style.margin = "5px";
    caesarShiftInput.setAttribute("value", 1);
    caesarShiftInput.setAttribute("type", "number");
    caesarShiftInput.setAttribute("id", "caesar-shift");

    optionsElement.appendChild(caesarShiftLabel);
    optionsElement.appendChild(caesarShiftInput);
}

// it encodes normal text to caesar cipher 
function caesarCipher(input, shift) {
    let encodedText = [];

    if (shift < 0) {
        return caesarCipher(input, shift + 26)
    }

    for (let i = 0; i < input.length; i++) {
        let asciiLetter = input.charCodeAt(i);

        let isAsciiLetterLowercase = asciiLetter >= 97 && asciiLetter <= 122;
        let isAsciiLetterUppercase = asciiLetter >= 65 && asciiLetter <= 90;

        if (!isAsciiLetterLowercase && !isAsciiLetterUppercase) {
            encodedText.push(String.fromCharCode(asciiLetter))
        }

        if (isAsciiLetterLowercase) {
            encodedText.push(String.fromCharCode(((asciiLetter - 97 + shift) % 26) + 97));
        }
        
        if (isAsciiLetterUppercase) {
            encodedText.push(String.fromCharCode(((asciiLetter - 65 + shift) % 26) + 65));
        }
    }

    return encodedText.join("");
}

function isEncode() {
    if (encodeRadioBtn.checked == true && decodeRadioBtn.checked == false) {
        return true;
    }

    return false;
}

function updateBtnName() {
    
    encodedTextElement.value = decodedTextElement.value


    if (isEncode()) {
        submitBtnElement.setAttribute("value", "encode message");

        
    } else {
        submitBtnElement.setAttribute("value", "decode message");
    }
}

