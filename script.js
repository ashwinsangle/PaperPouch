document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("Gm09jjwk5geMI3RCD"); // Verify this is the correct public key

    const form = document.getElementById("contact-form");
    const submitBtn = document.querySelector('.submit-btn');
    const statusMessage = document.getElementById("status-message");

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        // Get form values
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const message = document.getElementById("message").value.trim();

        // Show loading state
        submitBtn.innerHTML = '<span class="btn-text">Sending...</span>';
        submitBtn.disabled = true;

        // Validation
        if (!name || !email || !phone || !message) {
            showMessage('All fields are required!', 'error');
            resetButton();
            return;
        }

        const phonePattern = /^[0-9]{10}$/;
        if (!phonePattern.test(phone)) {
            showMessage('Enter a valid 10-digit phone number!', 'error');
            resetButton();
            return;
        }

        try {
            await emailjs.send("service_43qorwl", "template_4o9esub", {
                from_name: name,
                from_email: email,
                phone_number: phone,
                message: message,
                time: new Date().toLocaleString()
            });

            showMessage('Message sent successfully!', 'success');
            form.reset();

            // Reset input animations (fix floating label issue)
            document.querySelectorAll('.input-group input, .input-group textarea').forEach(input => {
                input.dispatchEvent(new Event('input'));
            });

        } catch (error) {
            console.error("Email send error:", error);
            showMessage('Failed to send message. Please try again!', 'error');
        } finally {
            resetButton();
        }
    });

    function showMessage(message, type) {
        statusMessage.textContent = message;
        statusMessage.className = `status-message ${type}`;
        statusMessage.style.display = "flex"; // Show the message

        // Hide message after 5 seconds
        setTimeout(() => {
            statusMessage.style.display = "none";
        }, 5000);
    }

    function resetButton() {
        submitBtn.innerHTML = '<span class="btn-text">Send Message</span><i class="fas fa-paper-plane"></i>';
        submitBtn.disabled = false;
    }
});

  const buttons = document.querySelectorAll('.filter-buttons button');
  const cards = document.querySelectorAll('.product-card');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const filterValue = button.getAttribute('data-filter');

      // Update active button
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');

        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

