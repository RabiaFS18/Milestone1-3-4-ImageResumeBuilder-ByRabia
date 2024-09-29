document.getElementById('resumeForm')?.addEventListener('submit', function (event) {
    event.preventDefault();

    // Get references to form elements using their IDs
    const profilePictureInput = document.getElementById('profilePicture') as HTMLInputElement;
    const nameElement = document.getElementById('name') as HTMLInputElement;
    const emailElement = document.getElementById('email') as HTMLInputElement;
    const contactElement = document.getElementById('phone') as HTMLInputElement;
    const educationElement = document.getElementById('education') as HTMLTextAreaElement;
    const experienceElement = document.getElementById('experience') as HTMLTextAreaElement;
    const skillsElement = document.getElementById('skills') as HTMLTextAreaElement;
    const usernameElement = document.getElementById('username') as HTMLInputElement;

    // Check if all form elements are present
    if (profilePictureInput && nameElement && emailElement && contactElement && educationElement && experienceElement && skillsElement && usernameElement) {
        const name = nameElement.value;
        const email = emailElement.value;
        const contact = contactElement.value;
        const education = educationElement.value;
        const experience = experienceElement.value;
        const skills = skillsElement.value;
        
        // Sanitize username for URL
        const username = usernameElement.value.trim().replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, ''); 
        const uniquePath = `resume/${username}_cv.html`; // Generate unique path

        // Picture elements
        const profilePictureFile = profilePictureInput.files?.[0];
        const profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : "";

        const resumeOutput = `
        <h2>Resume</h2>
        ${profilePictureURL ? `<img src="${profilePictureURL}" alt="Profile Picture" class="profilePicture" />` : ""}
        <p class="editable"><strong>Name:</strong> ${name}</p>
        <p class="editable"><strong>Email:</strong> ${email}</p>
        <p class="editable"><strong>Contact Number:</strong> ${contact}</p>
        
        <h3>Education</h3>
        <p class="editable">${education}</p>
        
        <h3>Experience</h3>
        <p class="editable">${experience}</p>
        
        <h3>Skills</h3>
        <p class="editable">${skills}</p>
        
        <p><strong>Your Resume URL:</strong> <a href="${uniquePath}" target="_blank">${uniquePath}</a></p>
        `;

        // Create resume output
        const resumeOutputElement = document.getElementById('resumeOutput');
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeOutput;
            makeEditable(); // Allow editing of the resume content
            createDownloadLink(resumeOutput, uniquePath, resumeOutputElement); // Create download link
        }
    } else {
        console.error('One or more input elements are missing');
    }
});

function createDownloadLink(resumeOutput, uniquePath, container) {
    const downloadLink = document.createElement('a');
    downloadLink.href = `data:text/html;charset=utf-8,` + encodeURIComponent(resumeOutput);
    downloadLink.download = uniquePath;
    downloadLink.textContent = 'Download your 2024 Resume';
    downloadLink.style.display = 'block';
    downloadLink.style.marginTop = '20px'; // Spacing above the link

    // Append the download link to the resume output or another suitable location
    container.appendChild(downloadLink);
}

function makeEditable() {
    const editableElements = document.querySelectorAll('.editable');
    editableElements.forEach(element => {
        element.addEventListener('click', function () {
            const currentElement = element as HTMLElement;
            const currentValue = currentElement.textContent || "";

            // Replace content
            if (currentElement.tagName === "P" || currentElement.tagName === "H3") { // Allow editing for <p> and <h3>
                const input = document.createElement('input');
                input.type = 'text';
                input.value = currentValue.replace(/.*: /, ''); // Extract the value after the label
                input.classList.add('editing-input');

                input.addEventListener('blur', function () {
                    currentElement.textContent = `${currentElement.querySelector('strong')?.textContent}: ${input.value}`;
                    currentElement.style.display = 'inline';
                    input.remove();
                });

                currentElement.style.display = 'none';
                currentElement.parentNode?.insertBefore(input, currentElement);
                input.focus();
            }
        });
    });
}
