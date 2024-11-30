// script.js

document.addEventListener("DOMContentLoaded", () => {
    const blogMarkdownPath = 'blog-post.md'; // Example markdown file for the blog
    const projectMarkdownPath = 'project-description.md'; // Example markdown file for the project

    // Function to load and convert markdown
    function loadMarkdown(filePath, targetElementId) {
        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(markdown => {
                const targetElement = document.getElementById(targetElementId);
                targetElement.innerHTML = marked(markdown);
            })
            .catch(error => {
                console.error('Error fetching markdown file:', error);
            });
    }

    // Load markdown content for blog and projects sections
    loadMarkdown(blogMarkdownPath, 'markdown-content-blog');
    loadMarkdown(projectMarkdownPath, 'markdown-content-project');
});
