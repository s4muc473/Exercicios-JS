let btnImprimir = document.getElementById('btnImprimir');

btnImprimir.addEventListener('click', function() {

    let input = document.getElementById("title").value;
    let title = document.getElementById("conteudo").value;

    const win = window.open('','','height=800,width=1200');

    win.document.write('<html><head>');
    win.document.write(`<title>${input}</title>`);
    win.document.write('</head>');
    win.document.write('<body>');
    win.document.write(`<textarea>${title}</textarea>`);
    win.document.write('</body></html>');

    win.print();
})