const fileInput = document.getElementById('fileInput');
const fileNameDisplay = document.querySelector('.file-name');
const downloadLink = document.getElementById('downloadLink');

// Clear error messages
function clearErrorMessages() {
    document.getElementById('errorMessage').textContent = '';
}

// Hide error message on input change
function hideErrorMessage() {
    clearErrorMessages();
}

// Drag and drop functionality
fileInput.addEventListener('dragover', (event) => {
    event.preventDefault();
    fileInput.classList.add('hover');
});

fileInput.addEventListener('dragleave', () => {
    fileInput.classList.remove('hover');
});

fileInput.addEventListener('drop', (event) => {
    event.preventDefault();
    fileInput.classList.remove('hover');

    const files = event.dataTransfer.files;
    if (files.length > 0) {
        fileInput.files = files; // Assign dropped files to input
        fileNameDisplay.textContent = files[0].name; // Show the name of the dropped file
        clearErrorMessages(); // Clear any error messages
        hideErrorMessage(); // Hide error message on change
    }
});

// Handle file selection
fileInput.addEventListener('change', (event) => {
    const files = event.target.files;
    if (files.length > 0) {
        fileNameDisplay.textContent = files[0].name; // Show the name of the selected file
        clearErrorMessages(); // Clear any error messages
        hideErrorMessage(); // Hide error message on change
    } else {
        fileNameDisplay.textContent = 'No file chosen'; // Reset if no file is selected
    }
});

function toggleMode() {
    const mode = document.getElementById('modeSelect').value;
    const actionButton = document.getElementById('actionButton');

    // Reset state when mode changes
    downloadLink.style.display = 'none';
    downloadLink.href = '#'; // Reset link
    document.getElementById('password').value = ''; // Clear password field
    clearErrorMessages(); // Clear any error messages

    if (mode === 'encrypt') {
        actionButton.innerText = '🔒 Encrypt File 🔒';
        actionButton.style.backgroundColor = '#b93e3e';
        actionButton.onclick = encryptFile; // Set to encrypt function
    } else {
        actionButton.innerText = '🔓 Decrypt File 🔓';
        actionButton.style.backgroundColor = '#56a34a';
        actionButton.onclick = decryptFile; // Set to decrypt function
    }
}

function arrayBufferToString(buffer) {
    return String.fromCharCode.apply(null, new Uint8Array(buffer));
}

function stringToArrayBuffer(string) {
    const buf = new Uint8Array(string.length);
    for (let i = 0; i < string.length; i++) {
        buf[i] = string.charCodeAt(i);
    }
    return buf.buffer;
}

function encryptFile() {
    const password = document.getElementById('password').value;

    if (!fileInput.files[0]) {
        document.getElementById('errorMessage').textContent = 'Please select a file.';
        return;
    }
    if (!password) {
        document.getElementById('errorMessage').textContent = 'Please enter a password.';
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const fileData = arrayBufferToString(event.target.result);
        const encryptedData = CryptoJS.AES.encrypt(fileData, password).toString();
        const blob = new Blob([encryptedData], { type: 'application/octet-stream' });
        const originalFileName = fileInput.files[0].name;
        const encryptedFileName = originalFileName + '.encrypted';
        const url = URL.createObjectURL(blob);

        downloadLink.href = url;
        downloadLink.download = encryptedFileName;
        downloadLink.style.display = 'block'; // Show download link as a button
        downloadLink.textContent = "🔒 Download Encrypted File 🔒";
        downloadLink.style.backgroundColor = '#b93e3e';
        
        hideErrorMessage(); // Hide error message after successful encryption
    };

    reader.readAsArrayBuffer(fileInput.files[0]);
}

function decryptFile() {
    const password = document.getElementById('password').value;

    if (!fileInput.files[0]) {
        document.getElementById('errorMessage').textContent = 'Please select a file.';
        return;
    }
    if (!password) {
        document.getElementById('errorMessage').textContent = 'Please enter a password.';
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const encryptedData = arrayBufferToString(event.target.result);
        
        try {
            const decryptedData = CryptoJS.AES.decrypt(encryptedData, password).toString(CryptoJS.enc.Utf8);

            if (!decryptedData) {
                document.getElementById('errorMessage').textContent = 'Decryption failed. Check your password or file.';
                return;
            }
            const blob = new Blob([stringToArrayBuffer(decryptedData)], { type: 'application/octet-stream' });
            const originalFileName = fileInput.files[0].name;

            // Remove .encrypted suffix and add decrypted_ prefix
            const decryptedFileName = originalFileName.replace('.encrypted', '').replace(/^/, 'decrypted_');
            
            const url = URL.createObjectURL(blob);

            downloadLink.href = url;
            downloadLink.download = decryptedFileName;
            downloadLink.style.display = 'block'; // Show download link as a button
            downloadLink.textContent = "🔓 Download Decrypted File 🔓";
            downloadLink.style.backgroundColor = '#56a34a';
            
            hideErrorMessage(); // Hide error message after successful decryption
            
        } catch (error) {
            document.getElementById('errorMessage').textContent = 'Decryption failed due to an error.';
            console.error(error);
        }
    };

    reader.readAsArrayBuffer(fileInput.files[0]);
}

document.addEventListener('DOMContentLoaded', function() {
    toggleMode();
});