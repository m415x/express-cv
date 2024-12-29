const $ = el => document.querySelector(el)

let cropper

export function initializeImageCropper() {
    $('#upload-image').addEventListener('change', function (e) {
        // Mostrar el contenedor de la imagen cuando se selecciona una imagen
        $('#image-modal').style.display = 'flex'

        const file = e.target.files[0]
        const reader = new FileReader()

        reader.onload = function (event) {
            const imageElement = $('#image-preview')
            imageElement.src = event.target.result

            // Iniciar Cropper.js
            if (cropper) cropper.destroy()  // Destruir cropper anterior si existe
            cropper = new Cropper(imageElement, {
                aspectRatio: 1,  // Relación de aspecto 1:1 (cuadrada)
                viewMode: 1
            })
        }
        reader.readAsDataURL(file)
    })

    $('#save-image').addEventListener('click', function () {
        if (cropper) {
            // Obtener la imagen recortada
            const croppedCanvas = cropper.getCroppedCanvas({
                width: 150,  // Redimensionar a 150px si es más grande
                height: 150
            })

            // Convertir a base64
            const croppedImageBase64 = croppedCanvas.toDataURL('image/png')

            // Guardar en localStorage o realizar otra acción
            localStorage.setItem('profileImage', croppedImageBase64)

            updatePicturePreview(croppedImageBase64)
        } else {
            alert('No image has been selected for cropping.')
        }
    })

    $('#cancel-image').addEventListener('click', function () {
        $('#image-modal').style.display = 'none'

        if (cropper) {
            // Destruir el cropper
            cropper.destroy()
            cropper = null
        }

        // Limpiar la vista previa de la imagen
        $('#image-preview').src = ''

        // Opcional: Limpiar el input de archivo
        $('#upload-image').value = ''
    })
}

export function updatePicturePreview(dataUrl) {
    const picturePreview = $('img.profile-photo')

    if (picturePreview) {
        picturePreview.src = dataUrl
    }
}
