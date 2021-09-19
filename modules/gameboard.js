function startGameboard() {
    const fields = document.querySelectorAll('.fields');
    fields.forEach((field) => {
        field.addEventListener('mouseover', () => {
            console.log("hover is working");
            field.classList.add('hovered');
        });
    });
}

export { startGameboard };