const $ = el => document.querySelector(el)
const $$ = el => document.querySelectorAll(el)

export function translatePage(selectedLang) {
    const lang = selectedLang || navigator.language

    const texts = translations[lang] || translations["en"] // Fallback al inglés si el idioma no está soportado

    // Personal Information
    $('h2.personalInformation-title').textContent = texts.personalInfo
    $('label[for="name"] span').textContent = texts.name
    $('label[for="email"] span').textContent = texts.email
    $('label[for="phone"] span').textContent = texts.phone
    $('label[for="address"] span').textContent = texts.address
    $('label[for="picture"] span').textContent = texts.picture
    $("#save-image").textContent = texts.saveImage
    $("#cancel-image").textContent = texts.cancel

    // Professional Summary
    $('h2.professionalSummary-title').textContent = texts.professionalSummary
    $('label[for="summary"] span').textContent = texts.summary

    // Experience
    $('h2.experience-title').textContent = texts.experience
    $$('label[for="job-title[]"] span').forEach(el => {
        el.textContent = texts.jobTitle
    })
    $$('label[for="company[]"] span').forEach(el => {
        el.textContent = texts.company
    })
    $$('label[for="job-start-date[]"] span').forEach(el => {
        el.textContent = texts.startDate
    })
    $$('label[for="job-end-date[]"] span').forEach(el => {
        el.textContent = texts.endDate
    })
    $$('label[for="current-job[]"] span').forEach(el => {
        el.textContent = texts.currentJob
    })
    $$('label[for="job-description[]"] span').forEach(el => {
        el.textContent = texts.description
    })
    $$('span.experience-subtitle').forEach(el => {
        el.textContent = texts.experience
    })
    $("#add-experience").textContent = texts.addExperience

    // Education
    $('h2.education-title').textContent = texts.education
    $$('label[for="degree[]"] span').forEach(el => {
        el.textContent = texts.degree
    })
    $$('label[for="institution[]"] span').forEach(el => {
        el.textContent = texts.institution
    })
    $$('label[for="edu-start-date[]"] span').forEach(el => {
        el.textContent = texts.startDate
    })
    $$('label[for="edu-end-date[]"] span').forEach(el => {
        el.textContent = texts.endDate
    })
    $$('label[for="current-study[]"] span').forEach(el => {
        el.textContent = texts.currentlyStudying
    })
    $$('label[for="edu-description[]"] span').forEach(el => {
        el.textContent = texts.description
    })
    $$('span.education-subtitle').forEach(el => {
        el.textContent = texts.education
    })
    $("#add-education").textContent = texts.addEducation

    // Customization
    $("h2.customizationTitle").textContent = texts.customization
    $('label[for="theme-choice"] span').textContent = texts.chooseATheme

    // Preview
    $("h2.previewTitle").textContent = texts.previewTitle

    const experienceTitle = $('h3.experience-preview')
    if (experienceTitle) {
        experienceTitle.textContent = texts.experience
    }

    const currentJobSpan = $('span.current-job')
    if (currentJobSpan) {
        currentJobSpan.textContent = texts.currentJob
    }

    const educationTitle = $('h3.education-preview')
    if (educationTitle) {
        educationTitle.textContent = texts.education
    }

    const currentStudySpan = $('span.current-study')
    if (currentStudySpan) {
        currentStudySpan.textContent = texts.currentlyStudying
    }
}

// Función para mostrar mensaje traducido
export function translateMessage(messageKey) {
    const currentLanguage = localStorage.getItem('selectedLanguage') || 'en'

    return translations[currentLanguage][messageKey]
}