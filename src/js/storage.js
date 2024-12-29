import { updatePreview } from './main.js'
import { captureFormData } from './formHandler.js'

const $ = el => document.querySelector(el)
const $$ = el => document.querySelectorAll(el)

// Función para guardar los datos del formulario en localStorage
export function saveFormData() {
    const formData = new FormData($("#cv-form"))
    const data = {}

    // Iterar sobre los datos del formulario
    formData.forEach((value, key) => {
        if (key === 'picture') return

        // Verificar si el campo debe ser tratado como array
        const isArrayField = key.includes('[]')

        // Almacenar otros datos del formulario
        if (data[key]) {
            if (!Array.isArray(data[key])) {
                // Convertimos el valor existente en un array
                data[key] = [data[key]]
            }
            // Si el valor es vacío, agregamos null al array
            if (value === '') {
                data[key].push(null)
            } else {
                data[key].push(value)
            }
        } else {
            // Si el campo no existe en 'data', lo inicializamos
            if (value === '') {
                data[key] = [null]  // Inicializamos con un array que contiene un solo null
            } else {
                data[key] = [value]  // Inicializamos con un array que contiene el valor
            }
        }
    })

    // Manejar checkboxes para asegurar que false se almacene en localStorage
    $$('input[type="checkbox"]').forEach(checkbox => {
        const key = checkbox.name

        if (!data[key]) {
            data[key] = [checkbox.checked] // Almacenar true o false dependiendo del estado del checkbox
        } else if (Array.isArray(data[key])) {
            data[key].push(checkbox.checked) // Si ya es un array, añadir el valor true o false
        }
    })

    // Guardar en localStorage
    localStorage.setItem('cvFormData', JSON.stringify(data))
}

// Función para restaurar los datos del formulario desde localStorage
export function restoreFormData() {
    const savedData = localStorage.getItem('cvFormData')

    if (savedData) {
        const data = JSON.parse(savedData)

        Object.keys(data).forEach(key => {
            const elements = $$(`[name="${key}"]`)

            elements.forEach((element, index) => {
                if (element.type === 'checkbox') {
                    // Si es un checkbox, usa la propiedad checked
                    element.checked = Array.isArray(data[key]) ? !!data[key][index] : !!data[key]
                } else {
                    // Para otros tipos de inputs, usa la propiedad value
                    element.value =
                        Array.isArray(data[key]) ?
                            (data[key][index] !== null ? data[key][index] : '') :
                            (data[key] !== null ? data[key] : '')
                }
            })
        })

        // Rellenar dinámicamente las secciones de experiencia y educación
        if (data['job-title[]']) {
            const jobTitle = Array.isArray(data['job-title[]']) ? data['job-title[]'] : [data['job-title[]']]

            jobTitle.forEach((jobTitle, index) => {
                if (index > 0) {
                    $("#add-experience").click()
                }

                $$('[name="job-title[]"]')[index].value = jobTitle || ''
                $$('[name="company[]"]')[index].value = (data['company[]'] && data['company[]'][index]) || ''

                // Verifica y asigna el formato correcto a los campos de fecha
                const jobStartDate =
                    data['job-start-date[]'] && data['job-start-date[]'][index] ?
                        data['job-start-date[]'][index] :
                        ''
                const jobEndDate =
                    data['job-end-date[]'] && data['job-end-date[]'][index] ?
                        data['job-end-date[]'][index] :
                        ''

                // Asegúrate de que el formato sea yyyy-MM para campos tipo month o date
                $$('[name="job-start-date[]"]')[index].value =
                    jobStartDate.match(/^\d{4}-\d{2}$/) ?
                        jobStartDate :
                        ''
                $$('[name="job-end-date[]"]')[index].value =
                    jobEndDate.match(/^\d{4}-\d{2}$/) ?
                        jobEndDate :
                        ''

                $$('[name="current-job[]"]')[index].checked = (data['current-job[]'] && data['current-job[]'][index]) === 'on' || false
                $$('[name="job-description[]"]')[index].value = (data['job-description[]'] && data['job-description[]'][index]) || ''

            })
        }

        if (data['degree[]']) {
            // Asegúrate de que siempre sea un array
            const degrees = Array.isArray(data['degree[]']) ? data['degree[]'] : [data['degree[]']]

            degrees.forEach((degree, index) => {
                if (index > 0) {
                    $("#add-education").click()
                }
                $$('[name="degree[]"]')[index].value = degree || ''
                $$('[name="institution[]"]')[index].value = (data['institution[]'] && data['institution[]'][index]) || ''

                // Verifica y asigna el formato correcto a los campos de fecha
                const eduStartDate =
                    data['edu-start-date[]'] && data['edu-start-date[]'][index] ?
                        data['edu-start-date[]'][index] :
                        ''
                const eduEndDate =
                    data['edu-end-date[]'] && data['edu-end-date[]'][index] ?
                        data['edu-end-date[]'][index] :
                        ''

                // Asegúrate de que el formato sea yyyy-MM para campos tipo month o date
                $$('[name="edu-start-date[]"]')[index].value = eduStartDate.match(/^\d{4}-\d{2}$/) ? eduStartDate : ''
                $$('[name="edu-end-date[]"]')[index].value = eduEndDate.match(/^\d{4}-\d{2}$/) ? eduEndDate : ''

                $$('[name="current-study[]"]')[index].checked = (data['current-study[]'] && data['current-study[]'][index]) === 'on' || false
                $$('[name="edu-description[]"]')[index].value = (data['edu-description[]'] && data['edu-description[]'][index]) || ''
            })
        }
    }
    updatePreview(captureFormData(), localStorage.getItem('profileImage'))

    // const languageSelect = $("#languageSelect")

    // Cargar el idioma seleccionado desde localStorage
    // const savedLanguage = localStorage.getItem("selectedLanguage") || navigator.language || 'en'
    // languageSelect.value = savedLanguage

    // translatePage(savedLanguage)
}
