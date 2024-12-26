document.addEventListener('DOMContentLoaded', () => {
    // Define the routes and their associated HTML files
    const routes = {
        '/home': 'index.html',
        '/about': 'about.html',
        '/testimonials': 'testimonials.html',
    };

    const contentDiv = document.getElementById('content');

    // Function to navigate to a route
    function navigate(path) {
        // Update the URL without reloading the page
        history.pushState({}, '', path);

        // Load the content for the new route
        loadContent(path);
    }

    // Function to load content based on the current path
    function loadContent(path) {
        const page = routes[path];
        if (page) {
            // Fetch the content of the HTML file
            fetch(page)
                .then((response) => {
                    if (response.ok) {
                        return response.text();
                    } else {
                        throw new Error('Page not found');
                    }
                })
                .then((html) => {
                    contentDiv.innerHTML = html; // Replace content
                })
                .catch((error) => {
                    contentDiv.innerHTML = '<h1>404: Page Not Found</h1>';
                });
        } else {
            contentDiv.innerHTML = '<h1>404: Page Not Found</h1>';
        }
    }

    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
        loadContent(location.pathname);
    });

    // Load the initial content
    loadContent(location.pathname);

    // Expose the navigate function globally for use in HTML
    window.navigate = navigate;
});
