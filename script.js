// Function to calculate tax based on age and income
function calculateTax(ageGroup, grossIncome, extraIncome, deductions) {
    let totalIncome = grossIncome + extraIncome - deductions;
    let tax = 0;

    if (totalIncome > 800000) {
        let taxRate = 0;
        if (ageGroup < 40) {
            taxRate = 0.3;
        } else if (ageGroup >= 40 && ageGroup < 60) {
            taxRate = 0.4;
        } else {
            taxRate = 0.1;
        }
        tax = taxRate * (totalIncome - 800000);
    }

    return tax;
}

// Function to validate form inputs
function validateForm(ageGroup, grossIncome, extraIncome, deductions) {
    let errors = [];

    if (isNaN(ageGroup) || ageGroup === "") {
        errors.push("Age is mandatory");
    }

    if (isNaN(grossIncome) || grossIncome === "") {
        errors.push("Gross Annual Income should be a number");
    }

    if (isNaN(extraIncome) || extraIncome === "") {
        errors.push("Extra Income should be a number");
    }

    if (isNaN(deductions) || deductions === "") {
        errors.push("Deductions should be a number");
    }

    return errors;
}

// Function to display errors next to input fields
function displayErrors(errors) {
    const errorIcon = document.querySelectorAll(".error-icon");
    errorIcon.forEach(icon => {
        icon.style.display = "none";
    });

    const tooltips = document.querySelectorAll(".tooltip");
    tooltips.forEach(tooltip => {
        tooltip.style.display = "none";
    });

    errors.forEach(error => {
        const inputId = error.inputId;
        const icon = document.querySelector(`#${inputId}-error-icon`);
        const tooltip = document.querySelector(`#${inputId}-tooltip`);
        icon.style.display = "inline-block";
        tooltip.textContent = error.message;
        tooltip.style.display = "inline-block";
    });
}

// Function to display modal with final values
function displayModal(tax) {
    const modal = document.createElement("div");
    modal.innerHTML = `
        <div id="modal" class="modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <p>Tax to be paid: ${tax}</p>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Close modal when clicking on the close button
    const closeButton = modal.querySelector(".close");
    closeButton.addEventListener("click", function() {
        modal.remove();
    });

    // Close modal when clicking outside the modal
    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.remove();
        }
    });
}

// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault();

    const ageGroup = parseInt(document.getElementById("ageGroup").value);
    const grossIncome = parseFloat(document.getElementById("grossIncome").value);
    const extraIncome = parseFloat(document.getElementById("extraIncome").value);
    const deductions = parseFloat(document.getElementById("deductions").value);

    const errors = validateForm(ageGroup, grossIncome, extraIncome, deductions);

    if (errors.length > 0) {
        displayErrors(errors);
    } else {
        const tax = calculateTax(ageGroup, grossIncome, extraIncome, deductions);
        displayModal(tax);
    }
}


// Add event listener to form submit button
document.getElementById("taxForm").addEventListener("submit", handleSubmit);

// Function to display modal with final values
function displayModal(tax) {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `<p>Tax to be paid: ${tax}</p>`;
}

