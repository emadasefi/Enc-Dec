//Tab Selector
function showTab(tabId) {
    const tabs = document.querySelectorAll('.tab');
    const buttons = document.querySelectorAll('.tab-button');

    // Hide all tab contents and remove active class from buttons
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });

    buttons.forEach(button => {
        button.classList.remove('active');
    });

    // Show the selected tab and set the button as active
    document.getElementById(tabId).classList.add('active');
    event.target.classList.add('active');
}

// Initialize with the first tab visible
document.addEventListener("DOMContentLoaded", function() {
    showTab('tabOne');
});
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//Toggle password visibility
const togglePassword = document.getElementById('togglePassword');
const passwordField = document.getElementById('password');

togglePassword.addEventListener('click', function () {
       const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
       passwordField.setAttribute('type', type);
       
       // Toggle the eye icon
       this.classList.toggle('active');
});
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//copy password
function toggleIcon() {
    const originalIcon = document.getElementById('CopySuccess');
    const checkIcon = document.getElementById('CheckIcon');
    
    if (originalIcon.style.display !== 'none') {
        originalIcon.style.display = 'none';
        checkIcon.style.display = 'block';
        CopyStrongPassword(); // Call your function here
    } else {
        originalIcon.style.display = 'block';
        checkIcon.style.display = 'none';
    }
}

function CopyStrongPassword() {
    // Your copy password logic here
    console.log("Password copied!");
}
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//