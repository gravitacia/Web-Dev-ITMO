document.addEventListener("DOMContentLoaded", function() {
    let openModalBtn = document.getElementById("comment-button");
    let modal = document.getElementById("comments-modal");
    let closeModalBtns = document.getElementsByClassName("close-comm-btn");

    function openModal() {
        modal.style.display = "block";
    }

    function closeModal() {
        modal.style.display = "none";
    }

    openModalBtn.onclick = function() {
        openModal();
    }

    for (let i = 0; i < closeModalBtns.length; i++) {
        closeModalBtns[i].onclick = function() {
            closeModal();
        }
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            closeModal();
        }
    }
});
