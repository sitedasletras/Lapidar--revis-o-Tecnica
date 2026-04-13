/*
REVISAO MEMÓRIA
Lapidar — Revisão Técnica

Responsável por:

– salvar estado atual do módulo
– guardar última obra analisada
– preservar diagnóstico técnico
– preservar relatório técnico
– restaurar continuidade interna da ferramenta
*/


const RevisaoMemoria = {

chaveMemoria:"lapidar_revisao_memoria",


estruturaBase(){
return {
titulo:null,
autor:null,
genero:null,
textoBase:null,
diagnosticoTecnico:null,
relatorioTecnico:null,
status:"nao_iniciado",
ultimaAtualizacao:null
}
},



lerMemoria(){

let bruto = localStorage.getItem(this.chaveMemoria)

if(!bruto){
return this.estruturaBase()
}

try{
return JSON.parse(bruto)
}catch(e){
return this.estruturaBase()
}

},



salvar(){

if(typeof RevisaoCore === "undefined"){
return "RevisaoCore não disponível"
}

let memoria = {
titulo:RevisaoCore.memoria.titulo,
autor:RevisaoCore.memoria.autor,
genero:RevisaoCore.memoria.genero,
textoBase:RevisaoCore.memoria.textoBase,
diagnosticoTecnico:RevisaoCore.memoria.diagnosticoTecnico,
relatorioTecnico:RevisaoCore.memoria.relatorioTecnico,
status:RevisaoCore.memoria.status,
ultimaAtualizacao:new Date().toISOString()
}

localStorage.setItem(
this.chaveMemoria,
JSON.stringify(memoria)
)

if(typeof RevisaoRegistro !== "undefined"){
RevisaoRegistro.registrarExecucao(
"memoria_salva",
"Memória da Revisão Técnica salva"
)
}

return "Memória da Revisão Técnica salva com sucesso"

},



carregar(){

if(typeof RevisaoCore === "undefined"){
return "RevisaoCore não disponível"
}

let memoria = this.lerMemoria()

RevisaoCore.memoria.titulo = memoria.titulo
RevisaoCore.memoria.autor = memoria.autor
RevisaoCore.memoria.genero = memoria.genero
RevisaoCore.memoria.textoBase = memoria.textoBase
RevisaoCore.memoria.diagnosticoTecnico = memoria.diagnosticoTecnico
RevisaoCore.memoria.relatorioTecnico = memoria.relatorioTecnico
RevisaoCore.memoria.status = memoria.status || "memoria_carregada"

RevisaoCore.estado.obraCarregada = !!memoria.textoBase
RevisaoCore.estado.analiseExecutada = !!memoria.diagnosticoTecnico
RevisaoCore.estado.relatorioGerado = !!memoria.relatorioTecnico

if(typeof RevisaoRegistro !== "undefined"){
RevisaoRegistro.registrarExecucao(
"memoria_carregada",
"Memória da Revisão Técnica carregada"
)
}

return "Memória da Revisão Técnica carregada com sucesso"

},



ver(){

return JSON.stringify(
this.lerMemoria(),
null,
2
)

},



limpar(){

localStorage.removeItem(this.chaveMemoria)

if(typeof RevisaoRegistro !== "undefined"){
RevisaoRegistro.registrarExecucao(
"memoria_limpa",
"Memória da Revisão Técnica removida"
)
}

return "Memória da Revisão Técnica removida com sucesso"

},



status(){

const memoria = this.lerMemoria()

return {
possuiTitulo:!!memoria.titulo,
possuiAutor:!!memoria.autor,
possuiGenero:!!memoria.genero,
possuiTextoBase:!!memoria.textoBase,
possuiDiagnostico:!!memoria.diagnosticoTecnico,
possuiRelatorio:!!memoria.relatorioTecnico,
ultimaAtualizacao:memoria.ultimaAtualizacao || null
}

}

}


console.log("REVISAO MEMÓRIA ATIVA")
