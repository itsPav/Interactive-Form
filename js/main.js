// STEP 1
// give focus to the first input element on the page on load
document.querySelector('input').focus();

// STEP 2
// ”Job Role” section of the form:
// Include a text field that will be revealed when the "Other" option is selected from the "Job Role" drop down menu.
// Give the field an id of “other-title,” and add the placeholder text of "Your Job Role" to the field.
const fields = document.querySelector('fieldset');
const otherInput = document.createElement('input');
otherInput.type = 'text';
otherInput.id = 'other-title';
otherInput.placeholder = 'Your Job Role';

const option = document.querySelector('option').value;

// need to add an event listener to check which option has been chosen
const jobRole = fields.addEventListener('change', (e) => {
    if(e.target.value === 'other') {
        fields.appendChild(otherInput);
        // remove otherInput if it exists
    } else if (document.getElementById('other-title')) {
        fields.removeChild(otherInput);
    }
});

// STEP 3

// get list of select options
const colors = document.querySelectorAll('#color option');
const designOptions = document.getElementById('design');

designOptions.addEventListener('change', () => {
    // need to get the text content of the selected option
    const designTheme = designOptions.options[designOptions.selectedIndex].textContent.toLowerCase();

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

            if(isEnabled) {
                document.querySelectorAll('.activities input')[i].removeAttribute('disabled', 'true');
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

const paymentMethod = paymentSelect.options[paymentSelect.selectedIndex].textContent.toLowerCase();

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
document.getElementById('name').required = true;

// check if valid email
document.getElementById('mail').required = true;

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
    for (let i = 0; i < numActivities; i += 1)
    {
        var isChecked = document.querySelectorAll('.activities input')[i].checked;
        if(isChecked) {
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
                        }
                    }
                }
            } else {
                return true;
            }
        }
    }
    return false;
}

// STEP 7