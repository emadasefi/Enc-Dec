function resetFields() {
    // Reset select elements
    document.getElementById("modeSelect").value = "encrypt";
    document.getElementById("actionSelect").value = "encrypt";

    // Clear file inputs
    document.getElementById("fileInput").value = "";
    document.querySelector(".file-name").textContent = "No file chosen";

    // Clear password fields
    document.getElementById("password").value = "";
    document.getElementById("inputPassword").value = "";

    // Clear text areas
    document.getElementById("inputText").value = "";
    document.getElementById("demo1").value = "";
    document.getElementById("demo2").value = "";

    // Clear error messages
    document.getElementById("errorMessage").textContent = "";
    document.getElementById("Derror").textContent = "";
    document.getElementById("Eerror").textContent = "";

    // Reset strong password value and range input
    document.getElementById("strongPasswordValue").value = "PASSWORD";
    document.getElementById("rangeInput").value = "16";
    document.getElementById("rangeValue").value = "16";

    // Uncheck all checkboxes
    const checkboxes = document.querySelectorAll('.checkBox-list input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false; // Uncheck all checkboxes
    });

    // Reset download link and hide it
    const downloadLink = document.getElementById("downloadLink");
    downloadLink.href = "#"; // Set to a default or empty value
    downloadLink.download = ""; // Clear any previous filename if set
    downloadLink.style.display = 'none'; // Hide the download link
}
