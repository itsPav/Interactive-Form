// STEP 1
// give focus to the first input element on the page on load
document.querySelector('input').focus();

// STEP 2
// ”Job Role” section of the form:
// Include a text field that will be revealed when the "Other" option is selected from the "Job Role" drop down menu.
// Give the field an id of “other-title,” and add the placeholder text of "Your Job Role" to the field.
const fields = document.querySelector('fieldset');
const otherInput = document.getElementById('other-title');

const option = document.querySelector('option').value;

otherInput.style.display = 'none';

// need to add an event listener to check which option has been chosen
const jobRole = fields.addEventListener('change', (e) => {
    if(e.target.value === 'other') {
        otherInput.style.display = 'block';
        // remove otherInput if it exists
    } else if (document.getElementById('other-title')) {
        otherInput.style.display = 'none';
    }
});

// STEP 3

// get list of select options
const colors = document.querySelectorAll('#color option');
const designOptions = document.getElementById('design');

designOptions.addEventListener('change', () => {
    // show the color div if design is chosen
    document.getElementById('colors-js-puns').style.display = 'block';

    // need to get the text content of the selected option
    const designTheme = designOptions.options[designOptions.selectedIndex].textContent.toLowerCase();
    if(designTheme == 'select theme') {
        document.getElementById('colors-js-puns').style.display = 'none';
    }

    const splitDesignTheme = designTheme.split('- ')[1];

    for (let i = 0; i < colors.length; i+=1) {
        const colorShirt = colors[i].textContent.toLowerCase();
        if(colorShirt.includes(splitDesignTheme)) {
            colors[i].className = '';
        } else {
            colors[i].className = 'is-hidden';
        }
    }
});

// STEP 4

// create variables for total cost
const activitiesArea = document.querySelector('.activities');
let totalCost = 0;

// get all the activities
const activities = document.querySelectorAll('.activities label');
const numActivities = activities.length;

// append total cost
const totalCostDiv = document.createElement('div');
totalCostDiv.innerHTML = '<strong>Total Cost:</strong> $' + totalCost;
activitiesArea.appendChild(totalCostDiv);

// activities selected
let activitiesSelected = 0;

// checkbox and cost updates
activitiesArea.addEventListener('change', (e) => {
    let totalCost = 0;

    eventString =  e.target.parentNode.textContent.split('— ')[1];
    // get the string time
    activityTime = eventString.split(', ')[0];

    // loop through all activities
    for (let i = 0; i < numActivities; i += 1)
    {
        var isEnabled = document.querySelectorAll('.activities input')[i].disabled;
        var isChecked = document.querySelectorAll('.activities input')[i].checked;

        let activityText = activities[i].innerText;

        // disable if activity time is same and not the same as the checked activity
        if(activityText.includes(activityTime) && e.target.parentNode.textContent != activityText)
        {
            document.querySelectorAll('.activities input')[i].setAttribute('disabled', 'true');
            document.querySelectorAll('.activities input')[i].parentNode.style.color = "gray";

            if(isEnabled) {
                document.querySelectorAll('.activities input')[i].removeAttribute('disabled', 'true');
                document.querySelectorAll('.activities input')[i].parentNode.style.color = "#000";
            }
        }

        // if checkbox is checked, add cost of activity to total cost
        if(isChecked) {
            activityCost = parseInt(activityText.split('$')[1]);
            totalCost += activityCost; 
        }
    }
    totalCostDiv.innerHTML = '<strong>Total Cost:</strong> $' + totalCost;
});

// STEP 5

const paymentSelect = document.getElementById('payment');
const creditCardDiv = document.getElementById('credit-card');
const paypalDiv = creditCardDiv.nextElementSibling;
const bitcoinDiv = paypalDiv.nextElementSibling;

// disable "select payment method" option
const choosePayment = document.querySelector('#payment option').setAttribute('disabled', 'true');;

// make credit card option chosen by default
const creditCardOption = document.querySelector('#payment option[value="credit card"]').setAttribute('selected', 'selected');;

creditCardDiv.style.display = 'block';
paypalDiv.style.display = 'none';
bitcoinDiv.style.display = 'none';

let paymentMethod = paymentSelect.options[paymentSelect.selectedIndex].textContent.toLowerCase();

paymentSelect.addEventListener('change', (e) => { 
    paymentMethod = paymentSelect.options[paymentSelect.selectedIndex].textContent.toLowerCase();

    if (paymentMethod == 'credit card') {
        creditCardDiv.style.display = 'block';
        paypalDiv.style.display = 'none';
        bitcoinDiv.style.display = 'none';
    }
    else if (paymentMethod == 'paypal') {
        paypalDiv.style.display = 'block';
        creditCardDiv.style.display = 'none';
        bitcoinDiv.style.display = 'none';
    }
    else if (paymentMethod == 'bitcoin') {
        creditCardDiv.style.display = 'none';
        bitcoinDiv.style.display = 'block';
        paypalDiv.style.display = 'none';
    }
});

// STEP 6

// make name required
// document.getElementById('name').required = true;

// check if valid email
// document.getElementById('mail').required = true;

// get the submit button
const submitForm = document.getElementsByTagName('button')[0];

// add form validate function
const mainForm = document.getElementsByTagName('form')[0].setAttribute('onSubmit', 'return validate();');

// credit card elements
const ccNum = document.getElementById('cc-num');
const zip = document.getElementById('zip');
const cvv = document.getElementById('cvv');

// user must choose atleast one activity
function validate() {
    if(document.getElementById('name').value == "") {
        nameError();
    }

    if(document.getElementById('mail').value == "") {
        emailError();
    }

    var isChecked;
    for (let i = 0; i < numActivities; i += 1)
    {
        isChecked = document.querySelectorAll('.activities input')[i].checked;

        if(!isChecked) {
            activitiesError();
        }
    }

    // if credit card, make sure user supplied credit card number, zipcode, cvv
    if (paymentMethod == 'credit card') {
        // check if cc lenght is between 13 and 16 and if its a number
        if(ccNum.value.length >= 13 && ccNum.value.length <= 16 && !isNaN(ccNum.value)) {
            console.log('credit card is fine');
            // check if zipcode is 5 digits
            if(zip.value.length == 5 && !isNaN(zip.value)) {
                console.log('zip is fine');
                // check if cvv is 3 digits
                if(cvv.value.length == 3 && !isNaN(cvv.value)) {
                    console.log('cvv is fine');
                    return true;
                } else {
                    cvvError();
                    properCVV();
                }
            } else {
                zipError();
                properZip();
            }
        } else {
            ccError();
        }
    } else {
        return true;
    }

    return false;
}

// STEP 7

const originalName = document.querySelector('[for="name"]').innerHTML;
const originalEmail = document.querySelector('[for="mail"]').innerHTML;
const originalActivity = document.querySelector('.activities legend').innerHTML;

// name error indication
function nameError() {
    document.getElementById('name').style.border = "red solid 1px";
    document.querySelector('[for="name"]').innerHTML = originalName + ' Please enter your name';
    document.querySelector('[for="name"]').style.color = 'red';
    return false;
}
// email error indication
function emailError() {
    document.getElementById('mail').style.border = "red solid 1px";
    document.querySelector('[for="mail"]').innerHTML = originalEmail + ' Please enter your email';
    document.querySelector('[for="mail"]').style.color = 'red';
    return false;
}

// register for activity indicator
function activitiesError() {
    document.querySelector('.activities legend').innerHTML = originalActivity + ' (Please register for ATLEAST one activity.)';
    document.querySelector('.activities legend').style.color = 'red';
}

// credit card indicator
function ccError() {
    ccNum.style.border = "red 1px solid";
    properCC();
}
// zip indicator
function zipError() {
    zip.style.border = "red 1px solid";
    document.querySelector('[for="zip"]').innerHTML += ' Zip Code must be 5 digits.';
    document.querySelector('[for="zip"]').style.color = 'red';
}
// cvv indicator
function cvvError() {
    cvv.style.border = "red 1px solid";
    document.querySelector('[for="cvv"]').innerHTML += ' CVV Must be 3 digits.';
    document.querySelector('[for="cvv"]').style.color = 'red';
}

// STEP 8

// No Javascript
// Added 'other' input into HTML

// STEP 9

// Hide color label and select menu of tshirt until design is selected
document.getElementById('colors-js-puns').style.display = 'none';

// STEP 10
// Conditional Error Messages
const originalCreditCardText =  document.querySelector('[for="cc-num"]').innerHTML;

function properCC() {
    console.log('Enter a proper cc');

    
    if (ccNum.value.length < 1) {
        document.querySelector('[for="cc-num"]').innerHTML = originalCreditCardText + ' Please enter a credit card number.';
        document.querySelector('[for="cc-num"]').style.color = 'red';
    }
    else if(isNaN(ccNum.value)) {
        document.querySelector('[for="cc-num"]').innerHTML = originalCreditCardText + ' Card Number contains letters.';
        document.querySelector('[for="cc-num"]').style.color = 'red';

    } else if (ccNum.value.length > 16) {
        document.querySelector('[for="cc-num"]').innerHTML = originalCreditCardText + ' Entered more than 16 digits.';
        document.querySelector('[for="cc-num"]').style.color = 'red';
    }
    else if (ccNum.value.length < 13)
    {
        document.querySelector('[for="cc-num"]').innerHTML = originalCreditCardText + ' Entered less than 13 digits.';
        document.querySelector('[for="cc-num"]').style.color = 'red';
    } 
    else if (ccNum.value.length == 0)
    {
        document.querySelector('[for="cc-num"]').innerHTML = originalCreditCardText + ' Please enter a credit card number.';
        document.querySelector('[for="cc-num"]').style.color = 'red';
    }
}

// STEP 11
// Real-time error messages
const mailInput = document.getElementById('mail');

mailInput.addEventListener('input', (e) => {
    var emailInput = e.target.value;

    // email input needs to have (text) + @ + (text) + . + (text)
    if (!emailInput.includes('@'))  {
        console.log('please enter an @ sign');
        mailInput.style.border = "red solid 1px";
        document.querySelector('[for="mail"]').innerHTML = originalEmail + ' Missing "@" sign.';
        document.querySelector('[for="mail"]').style.color = 'red';
        return false;
    }
    else if (emailInput.includes('.')-1) 
    {
        mailInput.style.border = "red solid 1px";
        document.querySelector('[for="mail"]').innerHTML = originalEmail + ' Missing a "domain".';
        document.querySelector('[for="mail"]').style.color = 'red';
        console.log('missing domain');
        return false;
    }
    else if (mailInput.value.indexOf('.')-1 == mailInput.value.indexOf('@')) 
    {
        mailInput.style.border = "red solid 1px";
        document.querySelector('[for="mail"]').innerHTML = originalEmail + ' Enter a host';
        document.querySelector('[for="mail"]').style.color = 'red';
        console.log('wrong domain');
        return false;
    }
    else if(mailInput.value.split('.')[1].length < 2) {
        mailInput.style.border = "red solid 1px";
        document.querySelector('[for="mail"]').innerHTML = originalEmail + ' Missing domain suffix.';
        document.querySelector('[for="mail"]').style.color = 'red';
        console.log('please enter an email');
        return false;
    }
    else if(emailInput.length == 0) {
        mailInput.style.border = "red solid 1px";
        document.querySelector('[for="mail"]').innerHTML = originalEmail + ' Missing email.';
        document.querySelector('[for="mail"]').style.color = 'red';
        console.log('please enter an email');
        return false;
    }
    else {
        mailInput.style.border = "2px solid #c1deeb";
        document.querySelector('[for="mail"]').innerHTML = originalEmail;
        document.querySelector('[for="mail"]').style.color = 'black';
    }
});