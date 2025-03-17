const fontFamily = `
        Arial=arial,helvetica,sans-serif;
        Calibri=calibri,sans-serif;
        Garamond=garamond,serif;
        Georgia=georgia,serif;
        Helvetica=helvetica,sans-serif;
        Tahoma=tahoma,sans-serif;
        Times New Roman=times new roman,times,serif;
        Trebuchet=trebuchet ms,sans-serif;
        Verdana=verdana,sans-serif;
    `

const headerConfig = {
    selector: '.editableHeader',
    language: 'es_MX',
    // license_key: 'gpl',
    menubar: false,
    inline: true,
    plugins: [
        'link', 'lists', 'powerpaste',
        'autolink', 'tinymcespellchecker'
    ],
    toolbar: [
        `undo redo | bold italic | fontfamily fontsize forecolor | 
        alignleft aligncenter alignright`,
    ],
    valid_elements: 'p[style],strong,em,span[style],a[href],ul,li',
    valid_styles: {
        '*': 'font-size,font-family,color,text-decoration,text-align'
    },
    powerpaste_word_import: 'clean',
    powerpaste_html_import: 'clean',
    font_family_formats: fontFamily,
    font_size_formats: '14pt 16pt 18pt 20pt 22pt 24pt',
};

const bodyConfig = {
    selector: '.editableBody',
    language: 'es_MX',
    // license_key: 'gpl',
    menubar: false,
    inline: true,
    plugins: [
        'link', 'lists', 'powerpaste',
        'autolink', 'tinymcespellchecker',
        'wordcount',
    ],
    toolbar: [
        `undo redo | bold italic | fontfamily fontsize forecolor | 
        alignleft aligncenter alignright alignjustify | 
        bullist outdent indent | wordcount`,
    ],
    valid_elements: 'p[style],strong,em,span[style],a[href],ul,li',
    valid_styles: {
        '*': 'font-size,font-family,color,text-decoration,text-align'
    },
    powerpaste_word_import: 'clean',
    powerpaste_html_import: 'clean',
    font_family_formats: fontFamily,
    font_size_formats: '10pt 11pt 12pt 13pt 14pt',
};

setTimeout(() => {
    if (window.tinymce) {
        tinymce.init(headerConfig);
        tinymce.init(bodyConfig);
    } else {
        console.error("TinyMCE no se ha cargado correctamente.")
    }
}, 500)
