const $ = el => document.querySelector(el)
const $$ = el => document.querySelectorAll(el)

// Inicializar un objeto para almacenar los datos del formulario
let formData = {}

// Capturar los datos de los inputs y actualizar el objeto formData
export function captureFormData() {

    const form = $("#cv-form")
    const inputs = form.querySelectorAll("input, textarea, select")

    inputs.forEach(input => {
        // Omitir los campos que pertenecen a la experiencia o educación
        if (
            input.name.includes("job-title[]") ||
            input.name.includes("company[]") ||
            input.name.includes("job-start-date[]") ||
            input.name.includes("job-end-date[]") ||
            input.name.includes("current-job[]") ||
            input.name.includes("job-description[]") ||
            input.name.includes("degree[]") ||
            input.name.includes("institution[]") ||
            input.name.includes("edu-start-date[]") ||
            input.name.includes("edu-end-date[]") ||
            input.name.includes("current-study[]") ||
            input.name.includes("edu-description[]") ||
            input.type === "file"
        ) {
            return // Saltar estos campos
        }
        // Verificar si es checkbox, si es así, usar la propiedad checked
        if (input.type === "checkbox") {
            formData[input.name] = input.checked
        } else {
            formData[input.name] = input.value
        }
    })

    // Capturar datos de experiencia
    formData.experience = []
    const experienceItems = $$("#experience-section .experience-item")

    experienceItems.forEach(item => {
        const experience = {
            jobTitle: item.querySelector('input[name="job-title[]"]').value,
            company: item.querySelector('input[name="company[]"]').value,
            startDate: item.querySelector('input[name="job-start-date[]"]').value,
            endDate: item.querySelector('input[name="job-end-date[]"]').value,
            currentJob: item.querySelector('input[name="current-job[]"]').checked,
            description: item.querySelector('textarea[name="job-description[]"]').value
        }
        formData.experience.push(experience)
    })

    // Capturar datos de educación
    formData.education = []
    const educationItems = $$("#education-section .education-item")

    educationItems.forEach(item => {
        const education = {
            degree: item.querySelector('input[name="degree[]"]').value,
            institution: item.querySelector('input[name="institution[]"]').value,
            startDate: item.querySelector('input[name="edu-start-date[]"]').value,
            endDate: item.querySelector('input[name="edu-end-date[]"]').value,
            currentStudy: item.querySelector('input[name="current-study[]"]').checked,
            description: item.querySelector('textarea[name="edu-description[]"]').value
        }
        formData.education.push(education)
    })

    console.log(formData) // Para verificar en la consola
    return formData
}

// Verificar si los campos de experiencia están completos
function areExperienceFieldsComplete() {
    const experienceItems = $$("#experience-section .experience-item")
    return Array.from(experienceItems).every(item => {
        return item.querySelector('input[name="job-title[]"]').value &&
            item.querySelector('input[name="company[]"]').value &&
            item.querySelector('input[name="job-start-date[]"]').value /*&&
            (item.querySelector('input[name="job-end-date[]"]').value ||
                item.querySelector('input[name="current-job[]"]').checked)*/
    })
}

// Función para agregar nuevos campos de experiencia
export function addExperienceField() {
    if (!areExperienceFieldsComplete()) {
        // const message = translateMessage('experienceIncomplete')
        const message = 'Please complete the experience fields before adding a new one.'
        alert(message)
        return
    }

    const experienceSection = $("#experience-section")
    const experienceCount = $$("#experience-section .experience-item").length + 1 // Contar las experiencias actuales
    const newExperience = document.createElement('div')
    newExperience.classList.add("experience-item")
    newExperience.innerHTML = /* HTML */`
        <h3>
            <span class="experience-subtitle">Experience</span> ${experienceCount}
        </h3>
        
        <label for="job-title[]">
            <span>Job title</span>:
            <input type="text" name="job-title[]">
        </label>

        <label for="company[]">
            <span>Company</span>:
            <input type="text" name="company[]">
        </label>

        <div class="inputs-date">
            <label for="job-start-date[]" class="inline-label">
                <span>Start date</span>:
                <input type="month" name="job-start-date[]" class="inline-input">
            </label>

            <label for="job-end-date[]" class="inline-label">
                <span>End date</span>:
                <input type="month" name="job-end-date[]" class="inline-input">
            </label>

            <label for="current-job[]">
                <input type="checkbox" name="current-job[]">
                <span>Current job</span>
            </label>
        </div>

        <label for="job-description[]">
            <span>Description</span>:
            <textarea name="job-description[]" rows="4" class="textarea-preview"></textarea>
        </label>
    `
    experienceSection.appendChild(newExperience)
}

// Verificar si los campos de educación están completos
function areEducationFieldsComplete() {
    const educationItems = $$("#education-section .education-item")
    return Array.from(educationItems).every(item => {
        return item.querySelector('input[name="degree[]"]').value &&
            item.querySelector('input[name="institution[]"]').value &&
            item.querySelector('input[name="edu-start-date[]"]').value /*&&
            (item.querySelector('input[name="edu-end-date[]"]').value ||
                item.querySelector('input[name="current-study[]"]').checked)*/
    })
}

// Función para agregar nuevos campos de educación
export function addEducationField() {
    if (!areEducationFieldsComplete()) {
        // const message = translateMessage('educationIncomplete')
        const message = 'Please complete the education fields before adding a new one.'
        alert(message)
        return
    }

    const educationSection = $("#education-section")
    const educationCount = $$("#education-section .education-item").length + 1 // Contar las educaciones actuales
    const newEducation = document.createElement('div')
    newEducation.classList.add("education-item")
    newEducation.innerHTML = /* HTML */`
        <h3>
            <span class="education-subtitle">Education</span> ${educationCount}
        </h3>
        
        <label for="degree[]">
            <span>Degree</span>:
            <input type="text" name="degree[]">
        </label>

        <label for="institution[]">
            <span>Institution</span>:
            <input type="text" name="institution[]">
        </label>

        <div class="inputs-date">
            <label for="edu-start-date[]" class="inline-label">
                <span>Start date</span>:
                <input type="month" name="edu-start-date[]" class="inline-input">
            </label>

            <label for="edu-end-date[]" class="inline-label">
                <span>End date</span>:
                <input type="month" name="edu-end-date[]" class="inline-input">
            </label>

            <label for="current-study[]">
                <input type="checkbox" name="current-study[]">
                <span>Currently studying</span>
            </label>
        </div>

        <label for="edu-description[]">
            <span>Description</span>:
            <textarea name="edu-description[]" rows="4" class="textarea-preview"></textarea>
        </label>
    `
    educationSection.appendChild(newEducation)
}

// Evento para capturar clic en los botones y agregar los campos dinámicos
export function initializeFormHandlers() {
    const addExperienceBtn = $("#add-experience")
    const addEducationBtn = $("#add-education")

    // Agregar nuevo campo de experiencia al hacer clic en el botón
    addExperienceBtn.addEventListener("click", addExperienceField)

    // Agregar nuevo campo de educación al hacer clic en el botón
    addEducationBtn.addEventListener("click", addEducationField)
}
