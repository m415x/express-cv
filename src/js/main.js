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
    const previewContainer = $(".cv-preview-container")
    previewContainer.innerHTML = "" // Limpiar contenido previo

    const language = localStorage.getItem("selectedLanguage") || "en"

    // Crear la primera página
    let currentPage = document.createElement("div")
    currentPage.classList.add("cv-page")
    previewContainer.appendChild(currentPage)

    function addToPage(element) {
        currentPage.appendChild(element)

        // Si el contenido desborda, crear una nueva página
        if (currentPage.scrollHeight > previewContainer.clientHeight) {
            currentPage.removeChild(element) // Remover el último elemento agregado
            currentPage = document.createElement("div")
            currentPage.classList.add("cv-page")
            previewContainer.appendChild(currentPage)
            currentPage.appendChild(element) // Agregar en la nueva página
        }
    }

    // **Perfil**
    const profileSection = document.createElement("div")
    profileSection.classList.add("profile-container")
    profileSection.innerHTML = `
        ${dataURL ? `<img src="${dataURL}" alt="Profile Photo" class="profile-photo">` : ""}
        <div class="profile-info">
            <h2>${data.name || ""}</h2>
            <p>
                <a 
                    href="mailto:${data.email}" 
                    target="_blank" 
                    style="text-decoration: none; color: inherit;"
                >${data.email || ""}</a>
            </p>
            <p>${data.phone || ""}</p>
            <p>${data.address || ""}</p>
        </div>
    `
    addToPage(profileSection)

    // **Resumen Profesional**
    if (data.summary) {
        const summaryHeader = document.createElement("h2")
        summaryHeader.classList.add("summary-preview")
        summaryHeader.classList.add("editableHeader")
        summaryHeader.textContent = "Summary"
        addToPage(summaryHeader)

        const summarySection = document.createElement("div")
        summarySection.classList.add("summary-container")
        summarySection.classList.add("editableBody")
        summarySection.innerHTML = `<p>${formatText(data.summary || "")}</p>`
        addToPage(summarySection)
    }

    // **Experiencia**
    if (data.experience.length > 0) {
        const experienceHeader = document.createElement("h2")
        experienceHeader.classList.add("experience-preview")
        experienceHeader.classList.add("editableHeader")
        experienceHeader.textContent = "Experience"
        addToPage(experienceHeader)

        const experienceList = document.createElement("ul")
        experienceList.classList.add("experience-list")

        data.experience.forEach(exp => {
            if (exp.jobTitle || exp.company || exp.startDate || exp.endDate || exp.currentJob || exp.description) {
                const experienceItem = document.createElement("li")
                experienceItem.classList.add("experience-list-item")
                experienceItem.innerHTML = `
                    <h3 class="editableHeader">${exp.jobTitle || ''}</h3>
                    <p>
                        <span class="preview-dates">
                            ${exp.startDate ? formatMonthYear(exp.startDate, language) : ''} 
                            ${exp.startDate && (exp.endDate || exp.currentJob) ? ' - ' : ''} 
                            ${exp.currentJob ? "<span class='current-job'>Current Job</span>" :
                        (exp.endDate ? formatMonthYear(exp.endDate, language) : '')} 
                        </span>
                        ${exp.startDate || exp.endDate || exp.currentJob ? ' | ' : ''} 
                        <strong>${exp.company || ''}</strong>
                    </p>
                    <p class="editableBody">${formatText(exp.description || '')}</p>
                `
                experienceList.appendChild(experienceItem)
                addToPage(experienceItem)
            }
        })
        addToPage(experienceList)
    }

    // **Educación**
    if (data.education.length > 0) {
        const educationHeader = document.createElement("h2")
        educationHeader.classList.add("education-preview")
        educationHeader.classList.add("editableHeader")
        educationHeader.textContent = "Education"
        addToPage(educationHeader)

        const educationList = document.createElement("ul")
        educationList.classList.add("education-list")

        data.education.forEach(edu => {
            if (edu.degree || edu.institution || edu.startDate || edu.endDate || edu.currentStudy || edu.description) {
                const educationItem = document.createElement("li")
                educationItem.classList.add("education-list-item")
                educationItem.innerHTML = `
                    <h3 class="editableHeader">${edu.degree || ''}</h3>
                    <p>
                        <span class="preview-dates">
                            ${edu.startDate ? formatMonthYear(edu.startDate, language) : ''} 
                            ${edu.startDate && (edu.endDate || edu.currentStudy) ? '-' : ''} 
                            ${edu.currentStudy ? "<span class='current-study'>Currently studying</span>" :
                        (edu.endDate ? formatMonthYear(edu.endDate, language) : '')} 
                        </span>
                        ${edu.startDate || edu.endDate || edu.currentStudy ? ' | ' : ''}  
                        <strong>${edu.institution || ''}</strong>
                    </p>
                    <p class="editableBody">${formatText(edu.description || '')}</p>
                `
                educationList.appendChild(educationItem)
                addToPage(educationItem)
            }
        })
        addToPage(educationList)
    }
}
