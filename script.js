
// ===== Active Navigation on Scroll =====
const navLinks = document.querySelectorAll('nav a');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.toggle(
                    'active',
                    link.getAttribute('href') === '#' + entry.target.id
                );
            });
        }
    });
}, {
    rootMargin: '-45% 0px -50% 0px'
});

navLinks.forEach(link => {
    const target = document.querySelector(link.getAttribute('href'));

    if (target) {
        observer.observe(target);
    }
});


// ===== Contact Form (Formspree) =====
const form = document.getElementById('contact-form');
const statusEl = document.getElementById('form-status');
const sendBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async event => {
    event.preventDefault();

    sendBtn.disabled = true;
    sendBtn.textContent = 'Sending...';

    statusEl.className = 'form-status';
    statusEl.textContent = '';

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: {
                Accept: 'application/json'
            }
        });

        if (!response.ok) {
            console.error(
                'Formspree:',
                response.status,
                await response.json().catch(() => ({}))
            );

            throw new Error('Failed to send message');
        }

        form.reset();

        statusEl.classList.add('ok');
        statusEl.textContent =
            'Message sent successfully. Thank you! I will get back to you soon.';

    } catch (error) {
        console.error(error);

        statusEl.classList.add('err');
        statusEl.textContent =
            'Your message could not be sent. Please try again or email me directly at nurainiagusthinati@gmail.com.';

    } finally {
        sendBtn.disabled = false;
        sendBtn.textContent = 'Send Message';
    }
});
