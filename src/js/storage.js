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

        const isArrayField = key.includes('[]') // Detectar campos de array

        if (!data[key]) {
            data[key] = isArrayField ? [] : null
        }

        if (isArrayField) {
            data[key].push(value || null)
        } else {
            data[key] = value || null
        }
    })

    // Manejo de checkboxes para almacenar `true` o `false`
    $$('input[type="checkbox"]').forEach(checkbox => {
        const key = checkbox.name

        if (!data[key]) {
            data[key] = []
        }

        if (checkbox.checked) {
            data[key].push(true)
        } else {
            data[key].push(false)
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
                    element.checked = Array.isArray(data[key]) ? data[key][index] === true : data[key] === true
                } else {
                    element.value = Array.isArray(data[key]) ? (data[key][index] !== null ? data[key][index] : '') : (data[key] !== null ? data[key] : '')
                }
            })
        })

        // Rellenar dinámicamente las secciones de experiencia y educación
        if (data['job-title[]']) {
            const jobTitles = Array.isArray(data['job-title[]']) ? data['job-title[]'] : [data['job-title[]']]

            jobTitles.forEach((title, index) => {
                if (index > 0) $("#add-experience").click()

                $$('[name="job-title[]"]')[index].value = title || ''
                $$('[name="company[]"]')[index].value = (data['company[]'] && data['company[]'][index]) || ''

                const jobStartDate = data['job-start-date[]']?.[index] || ''
                const jobEndDate = data['job-end-date[]']?.[index] || ''

                $$('[name="job-start-date[]"]')[index].value = /^\d{4}-\d{2}$/.test(jobStartDate) ? jobStartDate : ''
                $$('[name="job-end-date[]"]')[index].value = /^\d{4}-\d{2}$/.test(jobEndDate) ? jobEndDate : ''

                $$('[name="current-job[]"]')[index].checked = (data['current-job[]']?.[index] === true)
                $$('[name="job-description[]"]')[index].value = (data['job-description[]']?.[index]) || ''
            })
        }

        if (data['degree[]']) {
            const degrees = Array.isArray(data['degree[]']) ? data['degree[]'] : [data['degree[]']]

            degrees.forEach((degree, index) => {
                if (index > 0) $("#add-education").click()

                $$('[name="degree[]"]')[index].value = degree || ''
                $$('[name="institution[]"]')[index].value = (data['institution[]']?.[index]) || ''

                const eduStartDate = data['edu-start-date[]']?.[index] || ''
                const eduEndDate = data['edu-end-date[]']?.[index] || ''

                $$('[name="edu-start-date[]"]')[index].value = /^\d{4}-\d{2}$/.test(eduStartDate) ? eduStartDate : ''
                $$('[name="edu-end-date[]"]')[index].value = /^\d{4}-\d{2}$/.test(eduEndDate) ? eduEndDate : ''

                $$('[name="current-study[]"]')[index].checked = (data['current-study[]']?.[index] === true)
                $$('[name="edu-description[]"]')[index].value = (data['edu-description[]']?.[index]) || ''
            })
        }
    }
    updatePreview(captureFormData(), localStorage.getItem('profileImage'))
}
