const navBar = document.querySelector(".topnav")
const addPostElement = document.querySelector(".add-post")

addPostElement.addEventListener('click', () => {

    const post = document.createElement("div");
    post.className = "subforum";
    post.innerHTML = "<div class=\"subforum-title\">\n" +
        "                    <h1>General Information</h1>\n" +
        "                </div>\n" +
        "                <div class=\"subforum-row center\">\n" +
        "                    <div class=\"subforum-stats subforum-column center\">\n" +
        "                    <div class=\"vote-button\">\n" +
        "                        <div class=\"like\">\n" +
        "                            <span class=\"plus cursor\">+</span> <span class=\"counter\">0</span> <span class=\"minus cursor\">-</span>\n" +
        "                        </div>\n" +
        "                    </div>\n" +
        "                    </div>\n" +
        "                    <div class=\"subforum-description subforum-column center\">\n" +
        "                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium cum dolore hic\n" +
        "                            necessitatibus nostrum optio possimus sequi veniam. Accusantium amet deserunt dolorum id\n" +
        "                            illo incidunt rem rerum soluta tempore voluptas!</p>\n" +
        "                    </div>\n" +
        "                    <div class=\"subforum-stats subforum-column center\">\n" +
        "                        <span>Author | Date</span>\n" +
        "                    </div>\n" +
        "                </div>";

    navBar.after(div);
})