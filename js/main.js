// main.js is the primary JavaScript file for the website. It includes the following functionality:
// 1. Navigation active link highlighting based on the current page
// 2. Interactive feature for the Contact Form submission
// 3. Highlight effect when hovering over project images
// 4. Dynamic skill bar filling based on defined skill levels
// 5. Project timeline and effort estimator with user input
// 6. Suggesting projects based on a quiz using experience level and interest
// 7. Displaying the current date and time message above the form (Project 2)
// 8. Form validation for the Contact Form (Project 2)
// Author: LaDawn Stuben
// Date:   11/09/2024


document.addEventListener('DOMContentLoaded', () => {
    // Highlight the active navigation link based on the current page URL
    const navigationLinks = document.querySelectorAll('.navigation a');
    const currentPage = window.location.pathname;

    // Add 'active' class to the current page's navigation link
    navigationLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage.substring(currentPage.lastIndexOf('/') + 1)) {
            link.classList.add('active');
        }
    });

    // Add a hover effect to project images for visual feedback
    const projectImages = document.querySelectorAll('.project img');
    projectImages.forEach(img => {
        img.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.05)';
            img.style.transition = 'transform 0.3s ease'; // Smooth hover effect
        });
        img.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)'; // Reset to original size on mouse leave
        });
    });

    // Dynamically fill skill bars based on predefined skill levels
    const skills = [
        { name: 'C#', level: '85%' },
        { name: 'C++', level: '90%' },
        { name: 'HTML & CSS', level: '90%' },
        { name: 'JavaScript', level: '35%' },
        { name: 'SQL', level: '70%' }
    ];

    skills.forEach(skill => {
        const skillElement = document.querySelector(`.skill-name[data-skill-name="${skill.name}"]`);
        if (skillElement) {
            const skillBar = skillElement.nextElementSibling.querySelector('.skill-level');
            if (skillBar) {
                skillBar.style.width = skill.level; // Set the width of the skill bar
            }
        }
    });

    //Display current date and time message above the form
    //***************Added for Project 2***************
    const dateMessage = document.getElementById('dynamic-date-message');
    if (dateMessage) {
        const today = new Date();
        const hours = today.getHours();
        const dayPart = hours < 12 ? 'morning' : hours < 18 ? 'afternoon' : hours < 21 ? 'evening' : 'night';

        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const dateString = today.toLocaleDateString('en-US', options);
        dateMessage.innerText = `Welcome! Today is ${dateString}. \nHave a great ${dayPart}!`;
    }

    //Form validation for the Contact Form
    //****************Added for Project 2***************
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            let valid = true;

            //Clear previous error messages
            document.querySelectorAll('.error').forEach(error => error.remove());

            const createError = (input, message) => {
                const error = document.createElement('div');
                error.classList.add('error');
                error.style.color = 'red';
                error.style.fontSize = '0.9em';
                error.innerText = message;
                input.insertAdjacentElement('afterend', error);
            };
            const firstName = document.getElementById('first-name');
            const lastName = document.getElementById('last-name');
            const namePattern = /^[A-Za-z]+$/;
            if (!firstName.value.trim() || !namePattern.test(firstName.value)) {
                createError(firstName, 'First name cannot be empty and must contain only letters');
                valid = false;
            }
            if (!lastName.value.trim() || !namePattern.test(lastName.value)) {
                createError(lastName, 'Last name cannot be empty and must contain only letters');
                valid = false;
            }
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');


            // Email validation using regular expression
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (!emailPattern.test(email.value)) {
                createError(email, 'Please enter a valid email address');
                valid = false;
            }

            // Phone number validation using regular expression
            const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
            if (!phonePattern.test(phone.value)) {
                createError(phone, 'Please enter a valid phone number (e.g., 123-456-7890)');
                valid = false;
            }

            const checkedOptions = document.querySelectorAll('input[name="options"]:checked');
            const optionsContainer = document.querySelector('.checkbox-group');
            const comments = document.getElementById('comments');

            // Checkbox validation (at least one option should be selected)
            if (checkedOptions.length === 0) {
                createError(optionsContainer, 'Please select at least one option');
                valid = false;
            }

            // Comments validation
            if (!comments.value.trim()) {
                createError(comments, 'Please enter your comments');
                valid = false;
            }

            // If form is invalid, prevent submission
            if (!valid) {
                e.preventDefault();
            }
        });
    }

    // Calculate the project effort timeline based on user input (days and hours per day)
    function calculateTimeline() {
        const days = parseInt(document.getElementById('days').value);
        const hours = parseInt(document.getElementById('hours').value);
        const startDateInput = document.getElementById('start-date').value;

        // Validate user input
        if (isNaN(days) || isNaN(hours) || days < 1 || hours < 1) {
            document.getElementById('total-hours').innerText = "Please enter valid positive numbers.";
            return;
        }

        // Calculate total hours based on days and hours per day
        // Satisfies the requirement for a series of mathematical operations
        const totalHours = days * hours;
        document.getElementById('total-hours').innerText = `Total Effort Required: ${totalHours} hours`;

        // Calculate estimated completion date
        let startDate = startDateInput ? new Date(startDateInput) : new Date(); // Use current date if no start date is provided
        startDate.setDate(startDate.getDate() + days); // Add the number of days to the start date

        const completionDate = startDate.toDateString(); // Format the completion date
        document.getElementById('completion-date').innerText = `Estimated Completion Date: ${completionDate}`;
    }

    // Add event listener to the calculate button for the project timeline estimator
    const calculateBtn = document.getElementById('calculate-timeline-btn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateTimeline);
    }

    // Suggest the best project based on quiz responses (experience level and interest)
    const findProjectBtn = document.getElementById('find-project-btn');
    if (findProjectBtn) {
        findProjectBtn.addEventListener('click', () => {
            const experience = document.getElementById('experience').value;
            const interest = document.getElementById('interest').value;
            let result = '';

            // Suggest projects based on user experience and interest
            // Satisfies the requirement for a series of else/if statements
            if (experience === 'beginner') {
                if (interest === 'web') {
                    result = 'You might enjoy starting with a simple web project like a household tasks app.';
                } else if (interest === 'mobile') {
                    result = 'A mobile project like a to-do list app would be a great fit for beginners.';
                } else {
                    result = 'The Secret Santa Engine is a good desktop project to learn basic concepts.';
                }
            } else if (experience === 'intermediate') {
                if (interest === 'web') {
                    result = 'Consider exploring more complex web apps like dynamic websites with JavaScript.';
                } else if (interest === 'mobile') {
                    result = 'Try developing a mobile app that integrates APIs for intermediate experience.';
                } else {
                    result = 'An advanced desktop tool like the Secret Santa Engine with added features could be a great fit.';
                }
            } else if (experience === 'advanced') {
                result = 'As an advanced user, you could tackle full-stack development or create your own frameworks.';
            }

            // Display the quiz result
            document.getElementById('quiz-result').innerText = result;
        });
    }
});
