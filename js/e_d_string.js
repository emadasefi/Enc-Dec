function toggleFields() {
    const action = document.getElementById('actionSelect').value;
    const encryptButton = document.getElementById('enc');
    const decryptButton = document.getElementById('dec');
    const encryptedTextField = document.getElementById('demo1');
    const decryptedTextField = document.getElementById('demo2');

    if (action === 'encrypt') {
        encryptButton.style.display = 'inline';
        encryptButton.style.backgroundColor = '#b93e3e';
        decryptButton.style.display = 'none';
        encryptedTextField.style.display = 'inline'; // Show encrypted text field
        decryptedTextField.style.display = 'none';   // Hide decrypted text field
        clearErrors();
    } else if (action === 'decrypt') {
        encryptButton.style.display = 'none';
        decryptButton.style.display = 'inline';
        decryptButton.style.backgroundColor = '#56a34a';
        encryptedTextField.style.display = 'none';   // Hide encrypted text field
        decryptedTextField.style.display = 'inline'; // Show decrypted text field
        clearErrors();
    }
}

// Call toggleFields on page load to set default state
window.onload = function() {
    document.getElementById('actionSelect').value = 'encrypt'; // Set default to encrypt
    toggleFields(); // Initialize fields based on default selection
};

function clearErrors() {
    document.getElementById('Derror').innerHTML = '';
    document.getElementById('Eerror').innerHTML = '';
}

function encrypt(message = '', key = '') {
    var x = CryptoJS.AES.encrypt(message, key);
    return x.toString();
}

function decrypt(message = '', key = '') {
    var y = CryptoJS.AES.decrypt(message, key);
    var decryptedMessage = y.toString(CryptoJS.enc.Utf8);
    
    // Check if decryption was successful
    if (!decryptedMessage) {
        return "Decryption failed. Please check your input.";
    }
    
    return decryptedMessage;
}

function AesEncrypt() {
    const text = document.getElementById('inputText').value.trim();
    const password = document.getElementById('inputPassword').value;

    if (!text) {
        document.getElementById("Derror").innerHTML = '<p style="color:red; font-size:15px; text-align:center;">Please enter a text</p>';
        return;
    }

    const encryptedText = encrypt(text, password);
    document.getElementById('demo1').value = encryptedText;
}

function AesDecrypt() {
    const text1 = document.getElementById('inputText').value.trim();
    const password2 = document.getElementById('inputPassword').value;

    if (!text1) {
        document.getElementById("Eerror").innerHTML = '<p style="color:red; font-size:15px; text-align:center;">Paste encrypted text</p>';
        return;
    }

    const decryptedText = decrypt(text1, password2);
    
    // Display the decrypted message or an error message
    document.getElementById("demo2").value = decryptedText === "Decryption failed. Please check your input." ? "" : decryptedText;
}
