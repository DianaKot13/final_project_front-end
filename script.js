document.addEventListener("DOMContentLoaded", function() {
    const posts = document.querySelectorAll(".post_");
    const eventTypeFilter = document.getElementById("event-type");
    const eventDistanceFilter = document.getElementById("event-distance");
    const eventCategoryFilter = document.getElementById("event-category");
    const eventDateFilter = document.getElementById("event-date"); 
    const searchInputs = document.querySelectorAll(".search_input"); 

    function filterPosts() {
        const selectedType = eventTypeFilter.value;
        const selectedDistance = parseInt(eventDistanceFilter.value);
        const selectedCategory = eventCategoryFilter.value;
        const selectedDate = eventDateFilter.value; 
        let searchQuery = "";
        searchInputs.forEach(input => {
            searchQuery += input.value.toLowerCase() + " ";
        }).trim();

        posts.forEach(post => {
            const postType = post.dataset.type;
            const postDistance = parseInt(post.dataset.distance);
            const postCategory = post.dataset.category.toLowerCase();
            const postDate = post.dataset.date; 
            const postTitle = post.querySelector("h4").innerText.toLowerCase();
            const postDescription = post.querySelector("p").innerText.toLowerCase();
            const postDistanceText = `${postDistance} km`; 
            const postCategoryText = postCategory;
            let matchesType = (selectedType === "all" || postType === selectedType);
            let matchesDistance = (isNaN(selectedDistance) || postDistance == selectedDistance);
            let matchesCategory = (selectedCategory === "all" || postCategory.toLowerCase() === selectedCategory.toLowerCase());
            let matchesDate = (selectedDate === "all" || postDate === selectedDate); 
            let matchesSearch = (postTitle.includes(searchQuery) || postDescription.includes(searchQuery) || postDistanceText.includes(searchQuery) || postCategoryText.includes(searchQuery));

            if (matchesType && matchesDistance && matchesCategory && matchesDate && matchesSearch) {
                post.style.display = "flex"; 
            } else {
                post.style.display = "none"; 
            }
        });
    }
    searchInputs.forEach(input => {
        input.addEventListener("input", filterPosts);
    });

    eventTypeFilter.addEventListener("change", filterPosts);
    eventDistanceFilter.addEventListener("change", filterPosts);
    eventCategoryFilter.addEventListener("change", filterPosts);
    eventDateFilter.addEventListener("change", filterPosts); 


    filterPosts(); 
});
