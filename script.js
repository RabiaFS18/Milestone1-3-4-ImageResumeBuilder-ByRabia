var _a;
(_a = document.getElementById('resumeForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    var _a;
    event.preventDefault();
    // Get references to form elements using their IDs
    var profilePictureInput = document.getElementById('profilePicture');
    var nameElement = document.getElementById('name');
    var emailElement = document.getElementById('email');
    var contactElement = document.getElementById('phone');
    var educationElement = document.getElementById('education');
    var experienceElement = document.getElementById('experience');
    var skillsElement = document.getElementById('skills');
    var usernameElement = document.getElementById('username');
    // Check if all form elements are present
    if (profilePictureInput && nameElement && emailElement && contactElement && educationElement && experienceElement && skillsElement && usernameElement) {
        var name_1 = nameElement.value;
        var email = emailElement.value;
        var contact = contactElement.value;
        var education = educationElement.value;
        var experience = experienceElement.value;
        var skills = skillsElement.value;
        // Sanitize username for URL
        var username = usernameElement.value.trim().replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
        var uniquePath = "resume/".concat(username, "_cv.html"); // Generate unique path
        // Picture elements
        var profilePictureFile = (_a = profilePictureInput.files) === null || _a === void 0 ? void 0 : _a[0];
        var profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : "";
        var resumeOutput = "\n        <h2>Resume</h2>\n        ".concat(profilePictureURL ? "<img src=\"".concat(profilePictureURL, "\" alt=\"Profile Picture\" class=\"profilePicture\" />") : "", "\n        <p class=\"editable\"><strong>Name:</strong> ").concat(name_1, "</p>\n        <p class=\"editable\"><strong>Email:</strong> ").concat(email, "</p>\n        <p class=\"editable\"><strong>Contact Number:</strong> ").concat(contact, "</p>\n        \n        <h3>Education</h3>\n        <p class=\"editable\">").concat(education, "</p>\n        \n        <h3>Experience</h3>\n        <p class=\"editable\">").concat(experience, "</p>\n        \n        <h3>Skills</h3>\n        <p class=\"editable\">").concat(skills, "</p>\n        \n        <p><strong>Your Resume URL:</strong> <a href=\"").concat(uniquePath, "\" target=\"_blank\">").concat(uniquePath, "</a></p>\n        ");
        // Create resume output
        var resumeOutputElement = document.getElementById('resumeOutput');
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeOutput;
            makeEditable(); // Allow editing of the resume content
            createDownloadLink(resumeOutput, uniquePath, resumeOutputElement); // Create download link
        }
    }
    else {
        console.error('One or more input elements are missing');
    }
});
function createDownloadLink(resumeOutput, uniquePath, container) {
    var downloadLink = document.createElement('a');
    downloadLink.href = "data:text/html;charset=utf-8," + encodeURIComponent(resumeOutput);
    downloadLink.download = uniquePath;
    downloadLink.textContent = 'Download your 2024 Resume';
    downloadLink.style.display = 'block';
    downloadLink.style.marginTop = '20px'; // Spacing above the link
    // Append the download link to the resume output or another suitable location
    container.appendChild(downloadLink);
}
function makeEditable() {
    var editableElements = document.querySelectorAll('.editable');
    editableElements.forEach(function (element) {
        element.addEventListener('click', function () {
            var _a;
            var currentElement = element;
            var currentValue = currentElement.textContent || "";
            // Replace content
            if (currentElement.tagName === "P" || currentElement.tagName === "H3") { // Allow editing for <p> and <h3>
                var input_1 = document.createElement('input');
                input_1.type = 'text';
                input_1.value = currentValue.replace(/.*: /, ''); // Extract the value after the label
                input_1.classList.add('editing-input');
                input_1.addEventListener('blur', function () {
                    var _a;
                    currentElement.textContent = "".concat((_a = currentElement.querySelector('strong')) === null || _a === void 0 ? void 0 : _a.textContent, ": ").concat(input_1.value);
                    currentElement.style.display = 'inline';
                    input_1.remove();
                });
                currentElement.style.display = 'none';
                (_a = currentElement.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(input_1, currentElement);
                input_1.focus();
            }
        });
    });
}
