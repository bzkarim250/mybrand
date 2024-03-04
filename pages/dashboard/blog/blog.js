// Function to store image in local storage
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

// Function to display blogs
function displayBlogs() {
    const blogsContainer = document.querySelector(".blogs--container");
    blogsContainer.innerHTML = "";

    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];

    blogs.forEach(blog => {
        const blogElement = document.createElement("div");
        blogElement.classList.add("content__blogs--blog");
        blogElement.setAttribute("data-blog-id", blog.id); // Add data-blog-id attribute

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
            if(confirm()){
                let updatedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
                updatedBlogs = updatedBlogs.filter(item => item.id !== blog.id);
                localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
                blogElement.remove();
            }
        });

        // View Blog
        viewButton.addEventListener('click', () => {
            // Encode the blog data as a JSON string and pass it as a query parameter
            const blogData = encodeURIComponent(JSON.stringify(blog));
            location.href = `/pages/blog.html?blog=${blogData}`;
        });

        actionsElement.appendChild(updateButton);
        actionsElement.appendChild(viewButton);
        actionsElement.appendChild(deleteButton);

        // Append elements to the blog container
        blogElement.appendChild(imageElement);
        blogElement.appendChild(nameElement);
        blogElement.appendChild(actionsElement);
        blogsContainer.prepend(blogElement);

        // Add event listener to the update button
        updateButton.addEventListener('click', () => {
            openUpdatePopup(blog);
        });
    });
}

function openUpdatePopup(blog) {
    const updateContainer = document.querySelector(".blog-container");
    updateContainer.innerHTML = `
        <button class="close-button popup-close">X</button>
        <div class="blog">
            <figure class="blog__img">
                <img src="${localStorage.getItem(blog.imageUrl)}" alt="Blog image" />
            </figure>
            <input type="file" class="image-update"/>
        </div>
        <div class="blog__content">
            <h3 class="mini-title">
                <input type="text" class="update-title" value="${blog.title}" />
            </h3>
            <p class="blog__content--details">
                <textarea class="update-description" name="" id="" cols="30" rows="10">${blog.description}</textarea>
            </p>
        </div>
        <button class="update-blog">Update</button>
    `;
    const popup = document.querySelector(".popup-wrapper");
    const dashboard = document.querySelector(".main-container");
    if (popup) { // Check if popup exists
        popup.style.display = "grid";
        popup.classList.remove("popup-wrapper");
    }
    if (dashboard) { // Check if dashboard exists
        dashboard.style.opacity = "0%";
    }

    const closePopupButton = document.querySelector(".popup-close");
    if (closePopupButton) { // Check if closePopupButton exists
        closePopupButton.addEventListener("click", () => {
            if (popup) { // Check if popup exists
                popup.style.display = "none";
                popup.classList.add("popup-wrapper");
            }
            if (dashboard) { // Check if dashboard exists
                dashboard.style.opacity = "100%";
            }
        });
    }

    const updateButton = document.querySelector(".update-blog");
    if (updateButton) {
        updateButton.addEventListener("click", () => {
            // Retrieve updated data from input fields
            const updatedTitle = document.querySelector(".update-title").value;
            const updatedDescription = document.querySelector(".update-description").value;
            const blogImage = document.querySelector(".image-update").files[0];

            // Update blog object
            blog.title = updatedTitle;
            blog.description = updatedDescription;
            if (blogImage) {
                const blogId = blog.id;
                storeImageInLocalStorage(blogId, blogImage, (imageKey) => {
                    blog.imageUrl = imageKey;
                });
            }

            // Update local storage
            const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
            const updatedBlogs = blogs.map(item => (item.id === blog.id ? blog : item));
            localStorage.setItem("blogs", JSON.stringify(updatedBlogs));

            // Close the popup
            if (popup) {
                popup.style.display = "none";
                popup.classList.add("popup-wrapper");
            }
            if (dashboard) {
                dashboard.style.opacity = "100%";
            }
            displayBlogs();
        });
    }
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

displayBlogs();
