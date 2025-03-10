import { initializeFormHandlers, captureFormData } from './formHandler.js'
import { saveFormData, restoreFormData } from './storage.js'
import { initializeImageCropper } from './imageHandler.js'
import { formatMonthYear } from '../utils/dateFormatter.js'
import { formatText } from "../utils/formatText.js"

const $ = el => document.querySelector(el)
const $$ = el => document.querySelectorAll(el)

document.addEventListener("DOMContentLoaded", () => {
    // Inicializa los manejadores de eventos del formulario
    initializeFormHandlers()

    // Inicializa el cropper cuando se cargue la página
    initializeImageCropper()

    // Restaurar los datos cuando la página se carga
    window.addEventListener('load', restoreFormData)

    // const languageSelect = $("#languageSelect")
    // // Escuchar cambios en el select de idioma
    // languageSelect.addEventListener("change", () => {
    //     const selectedLanguage = languageSelect.value

    //     // Guardar el idioma seleccionado en localStorage
    //     localStorage.setItem("selectedLanguage", selectedLanguage)

    //     // Traducir la página
    //     translatePage(selectedLanguage)
    // })

    // Actualizar los datos del formulario cuando el usuario interactúa con el formulario
    $("#cv-form").addEventListener("input", () => {
        const data = captureFormData()
        updatePreview(data, localStorage.getItem('profileImage'))
        saveFormData()
    })

    // $$('#cv-form input, #cv-form textarea').forEach(element => {
    //     element.addEventListener('blur', saveFormData)
    //     element.addEventListener('change', saveFormData)
    // })
})

export function updatePreview(data, dataURL) {
    // Aquí se utilizarán los datos capturados para actualizar la vista previa del CV
    const preview = $("#profile-preview")
    const previewExperience = $("#preview-experience")
    const previewEducation = $("#preview-education")
    const language = localStorage.getItem('selectedLanguage') || 'en'

    // Generar la vista previa del CV incluyendo la imagen si está disponible
    preview.innerHTML = /* HTML */`
    <div class="profile-container">
        ${dataURL ? `<img src="${dataURL}" alt="Profile Photo" class="profile-photo">` : ''}

        <div class="profile-info">
            <h3>${data.name || ""}</h3>
            <p>${data.email || ""}</p>
            <p>${data.phone || ""}</p>
            <p>${data.address || ""}</p>
        </div>
    </div>

    <div class="summary-container">
        <p>${formatText(data.summary || "")}</p>
    </div>
    `

    // Limpiar el contenido previo de la experiencia y la educación
    previewExperience.innerHTML = ''
    previewEducation.innerHTML = ''

    // Verificar si hay experiencia para mostrar
    if (data.experience.length > 0 && data.experience.some(exp =>
        exp.jobTitle ||
        exp.company ||
        exp.startDate ||
        exp.endDate ||
        exp.currentJob ||
        exp.description
    )) {
        previewExperience.innerHTML = "<h3 class='experience-preview'>Experience</h3>"

        const experienceList = document.createElement("ul")
        experienceList.classList.add("experience-list")

        data.experience.forEach(exp => {
            if (
                exp.jobTitle ||
                exp.company ||
                exp.startDate ||
                exp.endDate ||
                exp.currentJob ||
                exp.description
            ) {
                const experienceItem = document.createElement("li")
                experienceItem.classList.add("experience-list-item")

                // Crear la estructura de cada experiencia en la lista
                // experienceItem.innerHTML = /* HTML */`
                //     <h4>
                //         ${exp.jobTitle || ''}
                //     </h4>

                //     <p>
                //         <span class="preview-dates">
                //             ${exp.startDate ? format(exp.startDate, "MMM YY", language) : ''} 
                //             ${exp.startDate && (exp.endDate || exp.currentJob) ? ' - ' : ''} 
                //             ${exp.currentJob ?
                //         "<span class='current-job'>Current Job</span>" :
                //         (exp.endDate ? format(exp.endDate, "MMM YY", language) : '')} 
                //         </span>

                //         ${exp.startDate || exp.endDate || exp.currentJob ? ' | ' : ''} 

                //         <strong>${exp.company || ''}</strong>
                //     </p>

                //     <p>
                //         ${exp.description || ''}
                //     </p>
                // `
                experienceItem.innerHTML = /* HTML */`
                    <h4>
                        ${exp.jobTitle || ''}
                    </h4>

                    <p>
                        <span class="preview-dates">
                            ${exp.startDate ? formatMonthYear(exp.startDate, language) : ''} 
                            ${exp.startDate && (exp.endDate || exp.currentJob) ? ' - ' : ''} 
                            ${exp.currentJob ?
                        "<span class='current-job'>Current Job</span>" :
                        (exp.endDate ? formatMonthYear(exp.endDate, language) : '')} 
                        </span>
                        
                        ${exp.startDate || exp.endDate || exp.currentJob ? ' | ' : ''} 

                        <strong>${exp.company || ''}</strong>
                    </p>
                        ${formatText(exp.description || '')}
                    </p>
                `

                experienceList.appendChild(experienceItem)
            }
        })

        // Añadir la lista de experiencias al contenedor de experiencia
        previewExperience.appendChild(experienceList)
    }

    // Verificar si hay educación para mostrar
    if (data.education.length > 0 && data.education.some(edu =>
        edu.degree ||
        edu.institution ||
        edu.startDate ||
        edu.endDate ||
        edu.currentStudy ||
        edu.description
    )) {
        previewEducation.innerHTML = "<h3 class='education-preview'>Education</h3>"

        const educationList = document.createElement("ul")
        educationList.classList.add("education-list")

        data.education.forEach(edu => {
            if (
                edu.degree ||
                edu.institution ||
                edu.startDate ||
                edu.endDate ||
                edu.currentStudy ||
                edu.description
            ) {
                const educationItem = document.createElement("li")
                educationItem.classList.add("education-list-item")

                // Crear la estructura de cada educación en la lista
                // educationItem.innerHTML = /* HTML */`
                //     <h4>
                //         ${edu.degree || ''}
                //     </h4>

                //     <p>
                //         <span class="preview-dates">
                //             ${edu.startDate ? format(edu.startDate, "MMM YY", language) : ''} 
                //             ${edu.startDate && (edu.endDate || edu.currentStudy) ? '-' : ''} 
                //             ${edu.currentStudy ?
                //         "<span class='current-study'>Currently studying</span>" :
                //         (edu.endDate ? format(edu.endDate, "MMM YY", language) : '')} 
                //         </span>

                //         ${edu.startDate || edu.endDate || edu.currentStudy ? ' | ' : ''}  

                //         <strong>${edu.institution || ''}</strong>
                //     </p>

                //     <p>
                //         ${edu.description || ''}
                //     </p>
                //     `
                educationItem.innerHTML = /* HTML */`
                    <h4>
                        ${edu.degree || ''}
                    </h4>

                    <p>
                        <span class="preview-dates">
                            ${edu.startDate ? formatMonthYear(edu.startDate, language) : ''} 
                            ${edu.startDate && (edu.endDate || edu.currentStudy) ? '-' : ''} 
                            ${edu.currentStudy ?
                        "<span class='current-study'>Currently studying</span>" :
                        (edu.endDate ? formatMonthYear(edu.endDate, language) : '')} 
                        </span>
                            
                        ${edu.startDate || edu.endDate || edu.currentStudy ? ' | ' : ''}  

                        <strong>${edu.institution || ''}</strong>
                    </p>

                    <p>
                        ${formatText(edu.description || '')}
                    </p>
                    `

                educationList.appendChild(educationItem)
            }
        })

        // Añadir la lista de educación al contenedor de educación
        previewEducation.appendChild(educationList)
    }
}

/*
document.addEventListener("DOMContentLoaded", () => {

    // Manejar eventos del formulario y la personalización
    $("#theme").addEventListener("change", applyTheme);
    $("#export-pdf").addEventListener("click", exportToPDF);
});

function applyTheme() {
    // Aplica el tema seleccionado
}

function exportToPDF() {
    // Llamar a la función de exportación a PDF
    pdfExporter.export($("#profile-preview"));
}
*/