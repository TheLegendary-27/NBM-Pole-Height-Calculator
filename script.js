/**
 * Psuedo-Code
 * 
 * Asks for ref number
 * Asks for pole ID
 * Prints a header with ref # & ID on page
 * Create a button to add shooter heights
 * Asks how many height references (min. = 1; max =3)
 * Create a loop depending on the no. of references
 * Loop asks for stick ht input
 * Loop asks for shooter ht input
 * Gets the difference between stick ht and shooter ht
 * Averages the differences
 * Prints the average which is the tripod ht
 * 
 * Clicking the add button asks for attachment shooter heights
 * Adds the input to the tripod height
 * Rounds the answer to the nearest 0.05m
 * Prints the answer to the page
 * 
 */

let refNum = prompt("What's the ref number?");
let poleID = prompt("What's the pole ID?");
const body = document.getElementById('body');
const htList = document.getElementById('heights');

createHeader();

const tripodHt = getTripodHt();
console.log(`%c(${tripodHt})`, 'color: red; font-size: 18px;');

//Create a list of the heights
const submitBtn = document.getElementById('submit-btn');
const form = document.getElementById('height-input');

submitBtn.addEventListener('click', printHeight);


function createHeader() {
    const h1 = document.getElementsByTagName('h1');
    let header = `${refNum} (${poleID})`;
    h1[0].textContent = header;
}

function getTripodHt() {
    let refCount = parseInt(prompt('How many references?'));
    let diffArray = [];

    if(refCount > 3 || refCount < 1) alert('Invalid number');
    else {
        for(let i = 0; i < refCount; i++) {
            let stickHt = prompt(`Stick height ${i + 1}?`);
            let shooterHt = prompt(`Shooter height ${i + 1}?`);
            diffArray[i] = stickHt - shooterHt;
        }

        let averageHt = () => {
            let sum = 0;
            for(let i = 0; i < refCount; i++) {
                sum += diffArray[i];
            }
            return (sum / refCount).toFixed(2);
        }

        let checkDiscrepancy = () => {
            for(let i = 0; i < refCount; i++) {
                if(Math.abs(diffArray[0] - averageHt()) > 0.05) {
                    console.warn('Huge discrepancy occured');
                }
            }
        };

        checkDiscrepancy();
        return averageHt();
    }
}

function printHeight() {
    let input = parseFloat(form.value);
    let li = document.createElement('li');

    htList.appendChild(li);
    li.textContent = input.toFixed(2);

    let realHt = ((parseFloat(tripodHt) + input)).toFixed(2) * 10 / 10;

    console.log(realHt);

    let roundHt = (height) => {
        if(((height * 100) % 5 < 3) && (height * 100) % 5 !== 0) {
            //Separate 1,2 & 6, 7
            if((height * 10) - Math.floor(height * 10) < 0.5) {
                return (Math.floor(height * 10) / 10).toFixed(2);
            } else {
                return ((Math.ceil(height * 10) / 10) - 0.05).toFixed(2);
            }
        } else if((height * 1000 / 10) % 5 === 0) {
            if((height * 1000 / 100) - Math.floor(height * 10) === 0){
                return (Math.floor(height * 10) / 10).toFixed(2);
            } else {
                return ((Math.ceil(height * 10) / 10) - 0.05).toFixed(2);
            }
        } else {
            if((height * 1000 / 100) - Math.floor(height * 10) < 0.5) {
                return ((Math.ceil(height * 10) / 10) - 0.05).toFixed(2);
            } else {
                return (Math.ceil(height * 10) / 10).toFixed(2);
            }
        }
    }

    let roundedHt = roundHt(realHt);
    let span = document.createElement('span');
    span.style.color = "red";
    li.appendChild(span);
    span.textContent = ` (${roundedHt})`;

    form.value = '';
    form.focus();
}


