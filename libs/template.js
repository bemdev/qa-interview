const template = ({ js, css, body }) => `
   <!DOCTYPE html>
    <html lang="ru">
      <head>
        <meta charset="utf-8" />
        <link rel="shortcut icon" href="/public/favicon.ico" />
        <link rel="stylesheet" href="/${css}">
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="theme-color" content="#000000" />
        <title>QA интервью сервис</title>
      </head>
      <body>
          <div id="root">${body}</div>
      </body>
      <script async src="/${js}" /></script>
      <script id="data" type="application/json"></script>
      ${!production
    ? '<script src="http://localhost:35729/livereload.js"></script>'
    : ''
  }
     </html>
`;

export default template;
