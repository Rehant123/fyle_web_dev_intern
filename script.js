$(document).ready(function() {
    // Initialize tooltips
    $('[data-toggle="tooltip"]').tooltip();
  
    // Form validation and submission
    $('#tax-form').submit(function(event) {
      event.preventDefault();
  
      // Reset error icons
      $('.error-icon').removeClass('show');
  
      // Get form values
      const grossIncome = $('#gross-income').val();
      const extraIncome = $('#extra-income').val();
      const ageGroup = $('#age-group').val();
      const deductions = $('#deductions').val();
  
      // Validate form values
      let isValid = true;
      if (!isNumeric(grossIncome)) {
        $('#gross-income-error').addClass('show');
        isValid = false;
      }
      if (!isNumeric(extraIncome)) {
        $('#extra-income-error').addClass('show');
        isValid = false;
      }
      if (!ageGroup) {
        $('#age-group-error').addClass('show');
        isValid = false;
      }
      if (!isNumeric(deductions)) {
        $('#deductions-error').addClass('show');
        isValid = false;
      }
  
      if (isValid) {
        // Parse float values
        const grossIncomeValue = parseFloat(grossIncome);
        const extraIncomeValue = parseFloat(extraIncome);
        const deductionsValue = parseFloat(deductions);
  
        // Calculate tax
        let taxAmount = 0;
        const overallIncome = grossIncomeValue + extraIncomeValue - deductionsValue;
        if (overallIncome > 800000) {
          switch (ageGroup) {
            case 'under-40':
              taxAmount = (overallIncome - 800000) * 0.3;
              break;
            case 'between-40-60':
              taxAmount = (overallIncome - 800000) * 0.4;
              break;
            case 'above-60':
              taxAmount = (overallIncome - 800000) * 0.1;
              break;
          }
        }
  
        // Format overall income and tax amount
        const overallIncomeFormatted = formatIndianCurrency(overallIncome);
        const taxAmountFormatted = formatIndianCurrency(taxAmount);
  
        // Display result in modal
        const resultMessage = `Your overall income will be ${overallIncomeFormatted} after tax deductions`;
        $('#result-message').html(`<p>${resultMessage}</p><p>Your tax amount is ${taxAmountFormatted}</p>`);
        $('#resultModal').modal('show');
      }
    });
  
    // Function to check if a value is numeric
    function isNumeric(value) {
      return /^\d+(\.\d+)?$/.test(value);
    }
  
    // Function to format numbers in Indian currency style
    function formatIndianCurrency(amount) {
      return amount.toLocaleString('en-IN', {
        maximumFractionDigits: 2,
        style: 'currency',
        currency: 'INR',
      });
    }
  });
  