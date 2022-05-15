const elemArray = document.querySelectorAll("#cipher-type, #options, #encode-radio, #decode-radio, #submit-btn, #decoded-text, #encoded-text");

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
    typeSelectElement.addEventListener("change", function() {
        if (typeSelectElement.selectedIndex == 0) {
            document.getElementById("caesar-shift").remove();
            document.getElementById("shift-label").remove();
        } else {
            addShiftElement();
        }
    });

    submitBtnElement.addEventListener("click", function(event) {
        event.preventDefault();

        const decodedText = decodedTextElement.value
        
        if (typeSelectElement.selectedIndex == 0) {
            encodedTextElement.value = isEncode() ? btoa(decodedText) : atob(decodedText) 
        } else {
            encodedTextElement.value = isEncode() ? caesarCipher(decodedText, shift) : caesarCipher(decodedText, shift * -1);
        }
    });
}

function addShiftElement() {
    const caesarShiftLabel = document.createElement("label");
    const caesarShiftInput = document.createElement("input");

    caesarShiftLabel.innerHTML = "Shift:";
    caesarShiftLabel.setAttribute("id", "shift-label");
    caesarShiftLabel.setAttribute("for", "caesar-shift");

    caesarShiftInput.setAttribute("value", 1);
    caesarShiftInput.setAttribute("type", "number");
    caesarShiftInput.setAttribute("id", "caesar-shift");
    caesarShiftInput.classList.add("caesar-shift-input");

    optionsElement.appendChild(caesarShiftLabel);
    optionsElement.appendChild(caesarShiftInput);
}

function caesarCipher(input, shift) {
    let encodedText = "";

    if (shift < 0) {
        return caesarCipher(input, shift + 26)
    }

    // loop through users text
    for (let i = 0; i < input.length; i++) {
        //we get each letter's ascii code and store it.
        const asciiLetter = input.charCodeAt(i);

        // 
        const isAsciiLetterLowercase = asciiLetter >= 97 && asciiLetter <= 122;
        const isAsciiLetterUppercase = asciiLetter >= 65 && asciiLetter <= 90;

        if (!isAsciiLetterLowercase && !isAsciiLetterUppercase) {
            encodedText += String.fromCharCode(asciiLetter)
        }

        if (isAsciiLetterLowercase) {
            encodedText += String.fromCharCode(((asciiLetter - 97 + shift) % 26) + 97);
        }

        if (isAsciiLetterUppercase) {
            encodedText += String.fromCharCode(((asciiLetter - 65 + shift) % 26) + 65);
        }
    }
<<<<<<< HEAD

    return encodedText;
=======
    
    return encodedText.join("");
>>>>>>> e1c3dba6f95aa185159e6e923aad85423a9fc7eb
}

function isEncode() {
    return encodeRadioBtn.checked ? true : false;
}

function updateBtnName() {
<<<<<<< HEAD
    submitBtnElement.value = isEncode() ? "encode message" : "decode message"
}
=======
    if (isEncode()) {
        submitBtnElement.setAttribute("value", "encode message");
    } else {
        submitBtnElement.setAttribute("value", "decode message");
    }
}
>>>>>>> e1c3dba6f95aa185159e6e923aad85423a9fc7eb
