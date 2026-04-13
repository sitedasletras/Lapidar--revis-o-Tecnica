/*
REVISAO CORE
Lapidar — Revisão Técnica

Responsável por:

– armazenar a obra em análise
– registrar estado atual do módulo
– guardar diagnóstico técnico
– guardar relatório técnico
– manter memória central da revisão
*/


const RevisaoCore = {

estado:{
obraCarregada:false,
analiseExecutada:false,
relatorioGerado:false
},


memoria:{
titulo:null,
autor:null,
genero:null,
textoBase:null,
diagnosticoTecnico:null,
relatorioTecnico:null,
status:"nao_iniciado"
},



carregarObra(pacote){

if(!pacote || !pacote.textoBase || pacote.textoBase.trim() === ""){
return "Nenhuma obra válida para carregar"
}

this.memoria.titulo = pacote.titulo || "sem_titulo"
this.memoria.autor = pacote.autor || "sem_autor"
this.memoria.genero = pacote.genero || "nao_identificado"
this.memoria.textoBase = pacote.textoBase
this.memoria.status = "obra_carregada"

this.estado.obraCarregada = true

if(typeof RevisaoRegistro !== "undefined"){
RevisaoRegistro.registrarExecucao(
"obra_carregada",
"Obra carregada no RevisaoCore"
)
}

return "Obra carregada no RevisaoCore"

},



obterTextoBase(){
return this.memoria.textoBase || ""
},



registrarDiagnostico(diagnostico){

if(!diagnostico){
return "Diagnóstico inválido"
}

this.memoria.diagnosticoTecnico = diagnostico
this.memoria.status = "diagnostico_registrado"
this.estado.analiseExecutada = true

if(typeof RevisaoRegistro !== "undefined"){
RevisaoRegistro.registrarExecucao(
"diagnostico_registrado",
"Diagnóstico técnico registrado no núcleo"
)
}

return "Diagnóstico técnico registrado"

},



registrarRelatorio(relatorio){

if(!relatorio){
return "Relatório inválido"
}

this.memoria.relatorioTecnico = relatorio
this.memoria.status = "relatorio_registrado"
this.estado.relatorioGerado = true

if(typeof RevisaoRegistro !== "undefined"){
RevisaoRegistro.registrarExecucao(
"relatorio_registrado",
"Relatório técnico registrado no núcleo"
)
}

return "Relatório técnico registrado"

},



obterResumoEstado(){

return {
estado:this.estado,
memoria:{
titulo:this.memoria.titulo,
autor:this.memoria.autor,
genero:this.memoria.genero,
status:this.memoria.status,
possuiTextoBase:!!this.memoria.textoBase,
possuiDiagnostico:!!this.memoria.diagnosticoTecnico,
possuiRelatorio:!!this.memoria.relatorioTecnico
}
}

},



status(){

return {
estado:this.estado,
memoria:this.memoria
}

},



resetar(){

this.estado = {
obraCarregada:false,
analiseExecutada:false,
relatorioGerado:false
}

this.memoria = {
titulo:null,
autor:null,
genero:null,
textoBase:null,
diagnosticoTecnico:null,
relatorioTecnico:null,
status:"nao_iniciado"
}

if(typeof RevisaoRegistro !== "undefined"){
RevisaoRegistro.registrarExecucao(
"core_resetado",
"Núcleo da Revisão Técnica resetado"
)
}

return "RevisaoCore resetado com sucesso"

}

}


console.log("REVISAO CORE ATIVO")
