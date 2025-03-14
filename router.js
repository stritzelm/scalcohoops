// Define routes and their corresponding HTML file paths
const routes = {
    "/home": "home.html",
    "/about": "about.html",
    "/testimonials": "testimonials.html",
    "/contact": "contact.html",
};

// Function to load HTML content dynamically
async function navigateTo(route) {
    const contentDiv = document.getElementById("content");

    // Load the HTML file for the given route
    if (routes[route]) {
        try {
            const response = await fetch(routes[route]);
            if (response.ok) {
                const html = await response.text();
                contentDiv.innerHTML = html;
            } else {
                contentDiv.innerHTML = `<div class="container"><h1>Error: Unable to load page</h1></div>`;
            }
        } catch (error) {
            contentDiv.innerHTML = `<div class="container"><h1>Error: ${error.message}</h1></div>`;
        }
    } else {
        contentDiv.innerHTML = `<div class="container"><h1>404 - Page Not Found</h1></div>`;
    }

    // Update browser history
    history.pushState({}, "", route);
    // Update active navigation link
    updateActiveLink(route);
}

function updateActiveLink(currentPath) {
    document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === currentPath);
    });
}

// Event listener for browser back/forward navigation
window.onpopstate = () => {
    navigateTo(location.pathname);
};


// Initialize router on page load
document.addEventListener("DOMContentLoaded", () => {
    if (location.pathname === "/") {
        history.replaceState({}, "", "/home");
        navigateTo("/home");
    } else {
        navigateTo(location.pathname);
    }

    // Attach click event listeners to all navigation links (including the logo)
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault();
            const route = link.getAttribute("href");

            if (location.pathname !== route) {
                navigateTo(route);
            }
        });
    });

    document.querySelectorAll(".navbar-brand").forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault();
            const route = link.getAttribute("href");

            if (location.pathname !== route) {
                navigateTo(route);
            }
        });
    });
});