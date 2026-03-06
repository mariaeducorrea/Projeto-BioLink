const EMAILJS_PUBLIC_KEY  = "Yoc6c2qAjByJRCuLp";   // Account > API Keys
const EMAILJS_SERVICE_ID  = "service_yuqj2cl";   // Email Services > Service ID
const EMAILJS_TEMPLATE_ID = "template_f98jniw";  // Email Templates > Template ID

emailjs.init(config.EMAILJS_PUBLIC_KEY);

// pegar dados do document
function getDados() {
   return {
      nome: document.getElementById("nome").value.trim(),
      celular: document.getElementById("celular").value.trim(),
      email: document.getElementById("email").value.trim(),
      descricao: document.getElementById("descricao").value.trim()
   };
}

// validar dados 
function validar() {
     const inputNome = document.getElementById("nome").value.trim()
     const inputEmail = document.getElementById("email").value.trim()
     const inputDescricao = document.getElementById("descricao")
     const mensagem = document.getElementById("alerta-msg")
     const alertaElemento = document.getElementById("alerta")
     
     if(inputNome === "" || inputEmail === "" || inputDescricao === "") {
      mensagem.textContent = "Todos os campos devem ser preeenchido.";
      alertaElemento.hidden = false; 
      return false
     } 
     //limpar aviso de erro
     alertaElemento.hidden= true; 
     return true

}

//limpar campos apos envio
function limparCampos() {
   const dados = getDados()

   Object.keys(dados).forEach( Id => {
      document.getElementById(Id).value = '';
   });
}

// é como desabilitar "transparencia" de popup - dedixar como false - aparece
function abrirPopup() {
   document.getElementById("popup").hidden = false;
};
// ativar "transparencia" de popup - não aparece
function fecharPopup() {
   document.getElementById("popup").hidden = true;
};


//enviar dados
async function enviar() {
   console.log("Cliquei no botão!")
   // validar dados
   if(!validar()) return
   console.log("Passei da validação!")

   const dados= getDados();
   const btn = document.getElementById("btn-enviar");
   const btnTxt = document.getElementById("btn-txt");

   //desabilita botao
   btn.disabled = true 
   //altera texto botao para enviando
   btnTxt.textContent = "Enviando..."

   const data = {
      service_id: EMAILJS_SERVICE_ID,
      template_id: EMAILJS_TEMPLATE_ID,
      user_id: EMAILJS_PUBLIC_KEY,
      template_params: {
         'nome': dados.nome,
         'celular': dados.celular,
         'email': dados.email,
         'proposta': dados.descricao
      }
   }

   try {
      // requisição para api
       const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
         method: 'POST',  //metodo post mandar
         body: JSON.stringify(data), //transformar os dados em json
         headers: { //cabeçalho - informa que o conteudo deve ser lido em formato json
               'Content-Type': 'application/json' //
         }
      });

      //verifica se o servidor responder, ok é uma forma de verificar se retornou 200
      if (response.ok) {
         //resposta para respons ok - limpa os campos e abre popup
         limparCampos();
         abrirPopup();
      } else {
         //resposta para erro
         const errorData = response.json();
         //travar e parar no momento que achar o erro => throw
         //stringify rtansforma o objeto em string normal
         throw new Error(JSON.stringify(errorData));
      }
      //o que o usuario v ai ver 
   } catch (err) {
      console.error("Erro na requisição:", err);  
   } finally {
      //restaura o botao
      btn.disable = false
      btnTxt.textContent = "Enviar Proposta";
   }
}
