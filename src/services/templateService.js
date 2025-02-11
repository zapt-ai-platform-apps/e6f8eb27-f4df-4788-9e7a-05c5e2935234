export function generateTemplate({ description, templateType, language }) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const templateHtml = `
<html>
<head>
  <meta charset="UTF-8">
  <title>${templateType} Template</title>
</head>
<body>
  <h1>${templateType} Template</h1>
  <p>${description}</p>
  <p>Language: ${language}</p>
</body>
</html>
      `;
      resolve({ templateHtml });
    }, 1000);
  });
}