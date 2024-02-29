document.addEventListener("DOMContentLoaded", function () {
    // Retrieve the blog data from the query parameter
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const blogData = urlParams.get('blog');

    if (blogData) {
        // Parse the blog data and populate the blog content
        const blog = JSON.parse(decodeURIComponent(blogData));

        const blogContainer = document.querySelector(".blog-container");
        blogContainer.innerHTML = `
            <div class="blog">
                <figure class="blog__img">
                    <img src="${localStorage.getItem(blog.imageUrl)}" alt="Blog image" />
                </figure>
                <form action="#" class="blog__add-comment">
                    <input type="text" required />
                    <input type="submit" value="Post" />
                </form>
            </div>
            <div class="blog__content">
                <h3 class="mini-title">${blog.title}</h3>
                <p class="blog__content--details para">${blog.description}</p>
                <!-- Add more content as needed -->
            </div>
        `;
    }
});
