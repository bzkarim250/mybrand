function storeImageInLocalStorage(blogId, imageFile, callback) {
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = function () {
        const key = `blogImage_${blogId}`;
        localStorage.setItem(key, reader.result);
        callback(key);
    };
    reader.onerror = function (error) {
        console.error("Error occurred while reading the image file:", error);
    };
}

const addBlogForm = document.querySelector('.add-blog-form');

addBlogForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.querySelector(".add-blog-form__title").value;
    const description = document.querySelector(".add-blog-form__description").value;
    const imageInput = document.querySelector(".blog-image");
    const imageFile = imageInput.files[0];
    if (!imageFile) {
        alert("Please select an image");
        return;
    }

    const blogId = Date.now().toString();
    storeImageInLocalStorage(blogId, imageFile, (imageKey) => {
        const newBlog = {
            id: blogId,
            title: title,
            description: description,
            imageUrl: imageKey,
        };
        let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
        blogs.push(newBlog);
        localStorage.setItem("blogs", JSON.stringify(blogs));
        console.log(blogs);
        addBlogForm.reset();
        displayBlogs();

        addBlogContainer.style.display = "none";
        dashboard.style.opacity = "100%";
    });
});
// Fetch All Blogs
function displayBlogs() {
    const blogsContainer = document.querySelector(".blogs--container");

    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];

    blogsContainer.innerHTML = "";

    blogs.forEach(blog => {

        const blogElement = document.createElement("div");
        blogElement.classList.add("content__blogs--blog");

        const imageElement = document.createElement("figure");
        imageElement.classList.add("content__blogs--blog__img");
        const img = document.createElement("img");

        img.src = localStorage.getItem(blog.imageUrl);
        img.alt = "Blog image";
        imageElement.appendChild(img);

        const nameElement = document.createElement("p");
        nameElement.classList.add("content__blogs--blog__name", "para");
        nameElement.textContent = blog.title;

        const actionsElement = document.createElement("div");
        actionsElement.classList.add("actions");

        const updateButton = document.createElement("button");
        updateButton.classList.add("update");
        const updateImg = document.createElement("img");
        updateImg.src = "../../../images/icons/update.svg";
        updateImg.alt = "update icon";
        updateButton.appendChild(updateImg);

        const viewButton = document.createElement("button");
        viewButton.classList.add("view");
        const viewImg = document.createElement("img");
        viewImg.src = "../../../images/icons/view.svg";
        viewImg.alt = "view icon";
        viewButton.appendChild(viewImg);

        const deleteButton = document.createElement("button");
        const deleteImg = document.createElement("img");
        deleteImg.src = "../../../images/icons/delete.svg";
        deleteImg.alt = "delete icon";
        deleteButton.appendChild(deleteImg);

        // Delete Blog
        deleteButton.addEventListener("click", () => {
            let updatedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
            updatedBlogs = updatedBlogs.filter(item => item.id !== blog.id);
            localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
            blogElement.remove();
        });

        actionsElement.appendChild(updateButton);
        actionsElement.appendChild(viewButton);
        actionsElement.appendChild(deleteButton);

        // Append elements to the blog container
        blogElement.appendChild(imageElement);
        blogElement.appendChild(nameElement);
        blogElement.appendChild(actionsElement);
        blogsContainer.prepend(blogElement);
    });
}

displayBlogs();
