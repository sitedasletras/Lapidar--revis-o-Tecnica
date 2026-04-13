/*
REVISAO REGISTRO
Lapidar — Revisão Técnica

Responsável por:

– registrar execuções do módulo
– registrar diagnósticos realizados
– registrar geração de relatórios
– registrar eventos internos
– manter trilha auditável do processo técnico
*/


const RevisaoRegistro = {

chaveRegistro:"lapidar_revisao_registro",



estruturaBase(){

return {
eventos:[],
ultimaExecucao:null
}

},



lerRegistro(){

let bruto = localStorage.getItem(this.chaveRegistro)

if(!bruto){
return this.estruturaBase()
}

try{
return JSON.parse(bruto)
}catch(e){
return this.estruturaBase()
}

},



registrarExecucao(tipo,descricao){

let registro = this.lerRegistro()

registro.eventos.push({

tipo:tipo,
descricao:descricao,
timestamp:new Date().toISOString()

})

registro.ultimaExecucao = tipo

localStorage.setItem(
this.chaveRegistro,
JSON.stringify(registro)
)

return "Evento registrado com sucesso"

},



listarEventos(){

return this.lerRegistro().eventos

},



ultimoEvento(){

return this.lerRegistro().ultimaExecucao

},



limparRegistro(){

localStorage.removeItem(this.chaveRegistro)

return "Registro técnico removido"

},



status(){

let registro = this.lerRegistro()

return {

totalEventos:registro.eventos.length,
ultimoEvento:registro.ultimaExecucao

}

}

}


console.log("REVISAO REGISTRO ATIVO")
