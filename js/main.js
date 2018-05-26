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

document.querySelector('.activities').addEventListener('change', (e) => {

    const activities = document.querySelectorAll('.activities label');
    const numActivities = activities.length;

    eventString =  e.target.parentNode.textContent.split('— ')[1];
    // get the string time
    activityTime = eventString.split(', ')[0];

    // loop through all activities
    for (let i = 0; i<numActivities; i+=1)
    {
        let activityText = activities[i].innerText;
        // disable if activity time is same
        if(activityText.includes(activityTime))
        {
            document.querySelectorAll('.activities input')[i].setAttribute('disabled', 'true');
        }
    }

    // get the string cost
    activityCost = eventString.split('$')[1];
    console.log(activityCost);
});


// add total cost of all the selected activities
const totalCost = document.createElement('div');

// activitiesArea.appendChild(totalCost);