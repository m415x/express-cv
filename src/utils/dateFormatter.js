import { format } from '../../node_modules/@formkit/tempo/dist/index.mjs'

/**
 * Formatea una fecha en el formato "mes-año" según el idioma,
 * ajustando el formato para evitar comas en idiomas que las utilizan.
 * @param {string | Date} date - Fecha a formatear.
 * @param {string} language - Idioma para el formato (es, en, fr, pt).
 * @returns {string} - Fecha formateada como "mes año".
 */
export function formatMonthYear(date, language) {
    if (!date) return ''

    // Asegura que el formato sea YYYY-MM y no YYYY-M
    const [year, month] = date.split('-')
    const correctedDate = new Date(year, Number(month) - 1) // Resta 1 al mes para corregir

    // Formatear la fecha con Tempo
    let formattedDate = format(correctedDate, "MMM YYYY", language)

    // Ajustar según el idioma (por ejemplo, en inglés eliminar la coma)
    if (language === 'en') {
        formattedDate = formattedDate.replace(' ', ', ')
    }

    return formattedDate
}
