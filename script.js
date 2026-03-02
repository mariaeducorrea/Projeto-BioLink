<script>

function abrirGmail(e) {
    e.preventDefault();
    
    const email = "correamariaeduarda435@gmail.com";
    const assunto = encodeURIComponent("Proposta de Projeto");
    const corpo = encodeURIComponent("Olá Maria, gostaria...");

    // Verifique se as crases ( ` ) estão envolvendo todo o link
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${assunto}&body=${corpo}`, '_blank');
}

</script>