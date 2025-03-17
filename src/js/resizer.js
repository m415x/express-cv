const $ = el => document.querySelector(el)

const resizer = $(".resizer")
const sidebar = $(".sidebar")

let isResizing = false

resizer.addEventListener("mousedown", (event) => {
    isResizing = true
    document.addEventListener("mousemove", handleResize)
    document.addEventListener("mouseup", stopResize)
})

function handleResize(event) {
    if (isResizing) {
        let newWidth = event.clientX
        let minWidth = 250 // Mínimo ancho permitido
        let maxWidth = window.innerWidth * 0.5 // Máximo 50% de la pantalla

        if (newWidth >= minWidth && newWidth <= maxWidth) {
            sidebar.style.width = newWidth + "px"
        }
    }
}

function stopResize() {
    isResizing = false
    document.removeEventListener("mousemove", handleResize)
    document.removeEventListener("mouseup", stopResize)
}
