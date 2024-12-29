# Express CV Web Application

A web application for creating custom resumes using HTML, CSS, and JavaScript. This project allows users to input their information through a form and generate a personalized CV from selectable templates, with the option to export the final result as a PDF.

## Features

- **User-Friendly Form**: Capture user data through a clean and intuitive form.
- **Multiple Templates**: Choose from various pre-designed CV templates.
- **Live Preview**: See a live preview of the CV as you enter your information.
- **Customizable Themes**: Apply different CSS themes to change the look and feel of the CV.
- **PDF Export**: Export the final CV to a PDF file for easy sharing and printing.
- **Responsive Design**: Ensure the application works well on both desktop and mobile devices.

## Project Structure

```text
express-cv/
├── index.html
├── css/
│   ├── styles.css
│   ├── reset.css
│   └── themes/
│       ├── theme1.css
│       ├── theme2.css
│       └── theme3.css
├── js/
│   ├── main.js
│   ├── formHandler.js
│   ├── pdfExporter.js
│   └── templates/
│       ├── template1.js
│       ├── template2.js
│       └── template3.js
├── assets/
│   ├── images/
│   └── fonts/
├── data/
│   ├── sampleData.json
│   └── userData.json
├── templates/
│   ├── template1.html
│   ├── template2.html
│   └── template3.html
└── README.md
```

## Getting Started

### Prerequisites

Make sure you have the following installed on your local machine:

- [Git](https://git-scm.com/)
- [Node.js and npm](https://nodejs.org/)

### Installation

1. **Clone the repository**:

   ```sh
   git clone https://github.com/m415x/express-cv.git
   cd express-cv
   ```

2. **Open the project**:

   Open `index.html` in your web browser to start using the application.

## Usage

1. Fill out the form with your personal information.
2. Choose a template and theme from the available options.
3. Preview your CV in real-time.
4. Click the "Export to PDF" button to download your CV as a PDF.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature`).
6. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to all the open-source projects and libraries that made this project possible.
- Special thanks to the contributors and users for their valuable feedback.
