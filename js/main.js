
// give focus to the first input element on the page on load
document.querySelector('input').focus();

// ”Job Role” section of the form:
// Include a text field that will be revealed when the "Other" option is selected from the "Job Role" drop down menu.
// Give the field an id of “other-title,” and add the placeholder text of "Your Job Role" to the field.

// need to add an event listener to check which option has been chosen
const fields = document.querySelector('fieldset');
const otherInput = document.createElement('input');
otherInput.type = 'text';
otherInput.id = 'other-title';
otherInput.placeholder = 'Your Job Role';

// if other has been chosen, show new input
fields.appendChild(otherInput);

fields.removeChild(otherInput);

// t-shirt info section

// For the T-Shirt color menu, only display the color options that match the design selected in the "Design" menu.
// If the user selects "Theme - JS Puns" then the color menu should only display "Cornflower Blue," "Dark Slate Grey," and "Gold."
// If the user selects "Theme - I ♥ JS" then the color menu should only display "Tomato," "Steel Blue," and "Dim Grey."

