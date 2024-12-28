// Define routes and their corresponding HTML file paths
const routes = {
    "/home": "home.html",
    "/about": "about.html",
    "/testimonials": "testimonials.html"
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
}

// Event listener for browser back/forward navigation
window.onpopstate = () => {
    navigateTo(location.pathname);
};

document.on

// Initialize router on page load
document.addEventListener("DOMContentLoaded", () => {
    if (location.pathname === "/") {
        history.replaceState({}, "", "/home"); // Update the URL without refreshing the page
        navigateTo("/home"); // Load the home page content
        return;
    }
    navigateTo(location.pathname);

    // Attach click event listeners to navigation links
    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault();
            const route = event.target.getAttribute("href");
            navigateTo(route);
        });
    });
});
