/*
REVISAO RELATÓRIO
Lapidar — Revisão Técnica

Responsável por:

– consolidar o diagnóstico técnico
– organizar o relatório institucional
– preparar saída pública e técnica
– manter leitura clara do estado da revisão
*/


const RevisaoRelatorio = {

gerar(){

if(typeof RevisaoCore === "undefined"){
return "RevisaoCore não disponível."
}

const memoria = RevisaoCore.memoria

if(!memoria.textoBase){
return "Nenhuma obra carregada no RevisaoCore."
}

return {
identificacao:this.gerarIdentificacao(memoria),
diagnostico:this.gerarDiagnostico(memoria),
saidaPublica:this.gerarSaidaPublica(memoria),
saidaTecnica:this.gerarSaidaTecnica(memoria),
status:"relatorio_revisao_pronto"
}

},



gerarIdentificacao(memoria){

return {
titulo: memoria.titulo || "sem_titulo",
autor: memoria.autor || "sem_autor",
genero: memoria.genero || "nao_identificado"
}

},



gerarDiagnostico(memoria){

if(!memoria.diagnosticoTecnico){
return "Diagnóstico técnico não disponível."
}

return memoria.diagnosticoTecnico

},



gerarSaidaPublica(memoria){

if(!memoria.diagnosticoTecnico){
return "Saída pública não disponível."
}

return {
observacaoTecnica:
memoria.diagnosticoTecnico.observacaoTecnica || "Sem observação técnica.",
clarezaSintatica:
memoria.diagnosticoTecnico.clarezaSintatica || "indefinida",
fluidezEditorial:
memoria.diagnosticoTecnico.fluidezEditorial || "indefinida",
densidadeParagrafos:
memoria.diagnosticoTecnico.densidadeParagrafos || "indefinida"
}

},



gerarSaidaTecnica(memoria){

if(!memoria.relatorioTecnico){
return "Saída técnica não disponível."
}

return memoria.relatorioTecnico

},



exportarTextoCompleto(){

const relatorio = this.gerar()

if(typeof relatorio === "string"){
return relatorio
}

let linhas = []

linhas.push("RELATÓRIO — LAPIDAR REVISÃO TÉCNICA")
linhas.push("")

linhas.push("Título: " + relatorio.identificacao.titulo)
linhas.push("Autor: " + relatorio.identificacao.autor)
linhas.push("Gênero: " + relatorio.identificacao.genero)

linhas.push("")
linhas.push("SAÍDA PÚBLICA:")
linhas.push("Clareza sintática: " + relatorio.saidaPublica.clarezaSintatica)
linhas.push("Fluidez editorial: " + relatorio.saidaPublica.fluidezEditorial)
linhas.push("Densidade de parágrafos: " + relatorio.saidaPublica.densidadeParagrafos)
linhas.push(relatorio.saidaPublica.observacaoTecnica)

linhas.push("")
linhas.push("SAÍDA TÉCNICA:")
linhas.push("Clareza sintática: " + relatorio.saidaTecnica.clarezaSintatica)
linhas.push("Densidade frasal: " + relatorio.saidaTecnica.densidadeFrasal)
linhas.push("Repetição lexical: " + relatorio.saidaTecnica.repeticaoLexical)
linhas.push("Equilíbrio diálogo/narração: " + relatorio.saidaTecnica.equilibrioDialogoNarracao)
linhas.push("Densidade de parágrafos: " + relatorio.saidaTecnica.densidadeParagrafos)
linhas.push("Consistência do narrador: " + relatorio.saidaTecnica.consistenciaNarrador)
linhas.push("Fluidez editorial: " + relatorio.saidaTecnica.fluidezEditorial)
linhas.push(relatorio.saidaTecnica.observacaoTecnica)

return linhas.join("\n")

},



status(){

if(typeof RevisaoCore === "undefined"){
return {
sucesso:false,
mensagem:"RevisaoCore não disponível."
}
}

const memoria = RevisaoCore.memoria

return {
sucesso:true,
possuiObra:!!memoria.textoBase,
possuiDiagnostico:!!memoria.diagnosticoTecnico,
possuiRelatorio:!!memoria.relatorioTecnico,
status:memoria.status || "indefinido"
}

}

}


console.log("REVISAO RELATORIO ATIVO")
