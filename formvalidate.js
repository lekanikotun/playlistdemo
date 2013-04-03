//validates form at http://www.mediaintellects.com/demo/playlist/index.html
var focusElementStyle = "2px solid #FF0000";
var unFocusElementStyle = "2px solid #FFCCCC";
var focusBackColor = "#ccc";
var reEmail = /^[\w\.=-]+\@[\w\.-]+\.[a-z]{2,4}$/;
var invalidFields = 0;

function getLabelByID(idStr) {
	var formLabels = document.getElementsByTagName('label');
	var attrName = document.all ? "htmlFor" : "for";
	for (var i = 0; i < formLabels.length; i++) {
		if (formLabels[i].getAttribute(attrName) == idStr)
			return formLabels[i];
	}
	return null;
}

function validateFullname() {
	var formField = document.getElementById('fname');
	var ok = (formField.value != null && formField.value.length != 0);
	var theLabel = getLabelByID('fname');
	if (theLabel != null) {
		if (ok) {
			theLabel.className = "validated";
		} else
			theLabel.className = "invalid";
	}
	return ok;
}

function validateSubject() {
	var formField = document.getElementById('subject');
	var ok = (formField.value != null && formField.value.length != 0);
	var theLabel = getLabelByID('subject');
	if (theLabel != null) {
		if (ok) {
			theLabel.className = "validated";
		} else
			theLabel.className = "invalid";
	}
	return ok;
}

function emailFocus(emailfield) {
	if (emailfield == "enter your email")
		document.getElementById('email').value = "";
}

function emailBlur(emailfield) {
	if (emailfield == "")
		document.getElementById('email').value = "enter your email";
}

function validateMsg() {
	var formField = document.getElementById('message');
	var ok = (formField.value != null && formField.value.length != 0);
	var theLabel = getLabelByID('message');
	if (theLabel != null) {
		if (ok) {
			theLabel.className = "validated";

		} else
			theLabel.className = "invalid";
	}
	return ok;
}

function validateAddress() {
	var formField = document.getElementById('email');
	var formValue = formField.value
	formField.onfocus = emailFocus(formValue);
	formField.onblur = emailBlur(formValue);
	var ok = (formField.value.length != 0 && reEmail.test(formField.value));
	var theLabel = getLabelByID('email');
	if (theLabel != null) {
		if (ok) {
			theLabel.className = "validated";
		} else
			theLabel.className = "invalid";
	}
	return ok;
}

function validateAllFields(e) {
	// need to do it this way to make sure all the functions execute
	var bWorks = validateFullname()
	bWorks &= validateSubject();
	bWorks &= validateAddress();
	bWorks &= validateMsg();
	if (!bWorks) {
		alert("The fields that are marked bold and red are required. Please supply valid\nvalues for these fields before sending.");
		com_mediaintellects.EVENTS.preventDefault(e);
	}
}

function highLightField(evt) {
	var elem = com_mediaintellects.EVENTS.getEventTarget(evt);
	if (elem != null) {
		elem.style.border = focusElementStyle;
		elem.style.backgroundColor = focusBackColor;
	}
}

function unhighLightField(evt) {
	var elem = com_mediaintellects.EVENTS.getEventTarget(evt);
	if (elem != null) {
		elem.style.border = unFocusElementStyle;
		elem.style.backgroundColor = "";
	}
}

function showForm() {
	document.getElementById('formblock').style.display = 'block';
	document.getElementById("formlabel").innerHTML = "Uncheck to hide form ";
}

function hideForm() {
	document.getElementById('formblock').style.display = 'none';
	document.getElementById("formlabel").innerHTML = "Check to fill form";
}

function initFormElements(sValidElems) {
	var inputElems = document.getElementsByTagName('textarea');
	for (var i = 0; i < inputElems.length; i++) {
		com_mediaintellects.EVENTS.addEventHandler(inputElems[i], 'focus', highLightField, false);
		com_mediaintellects.EVENTS.addEventHandler(inputElems[i], 'blur', unhighLightField, false);
	}
	/* add the code for the input elements */
	inputElems = document.getElementsByTagName('input');
	for (var i = 0; i < inputElems.length; i++) {
		if (sValidElems.indexOf(inputElems[i].getAttribute('type')) != -1) {
			com_mediaintellects.EVENTS.addEventHandler(inputElems[i], 'focus', highLightField, false);
			com_mediaintellects.EVENTS.addEventHandler(inputElems[i], 'blur', unhighLightField, false);
		}
	}

	/* add the reset and submit handlers */
	com_mediaintellects.EVENTS.addEventHandler(document.getElementById('form1'), 'reset', function() {
		document.getElementsByTagName('input')[0].focus();
		for (var i = 0; i < document.getElementsByTagName('label').length; i++)
			document.getElementsByTagName('label')[i].className = "required";
	}, false);
	com_mediaintellects.EVENTS.addEventHandler(document.getElementById('form1'), 'submit', validateAllFields, false);
	/* add the default focus handler */
	/** document.getElementsByTagName('input')[0].focus(); */
	/* add the event handlers for validation */
	com_mediaintellects.EVENTS.addEventHandler(document.forms[0].fname, 'blur', validateFullname, false);
	com_mediaintellects.EVENTS.addEventHandler(document.forms[0].email, 'blur', validateAddress, false);
	com_mediaintellects.EVENTS.addEventHandler(document.forms[0].subject, 'blur', validateSubject, false);
	com_mediaintellects.EVENTS.addEventHandler(document.forms[0].message, 'blur', validateMsg, false);
}

com_mediaintellects.EVENTS.addEventHandler(window, "load", function() {	initFormElements("text"); }, false); 
