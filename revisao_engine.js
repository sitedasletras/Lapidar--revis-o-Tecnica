/*
REVISAO ENGINE
Lapidar — Revisão Técnica

Responsável por:

– executar análise estrutural linguística
– medir clareza sintática
– medir densidade de frases
– medir repetição lexical
– medir equilíbrio entre diálogo e narração
– gerar diagnóstico técnico
– gerar relatório técnico
*/


const RevisaoEngine = {

executarAnalise(){

const texto = RevisaoCore.obterTextoBase()

if(!texto || texto.trim() === ""){
return "Nenhum texto disponível para análise técnica"
}

let diagnostico = {
clarezaSintatica:this.analisarClarezaSintatica(texto),
densidadeFrasal:this.analisarDensidadeFrasal(texto),
repeticaoLexical:this.analisarRepeticaoLexical(texto),
equilibrioDialogoNarracao:this.analisarDialogoNarracao(texto),
densidadeParagrafos:this.analisarParagrafos(texto),
consistenciaNarrador:this.analisarNarrador(texto),
fluidezEditorial:this.analisarFluidezEditorial(texto),
observacaoTecnica:this.gerarObservacaoTecnica(texto)
}

RevisaoCore.registrarDiagnostico(diagnostico)

let relatorio = this.gerarRelatorioTecnico(diagnostico)

RevisaoCore.registrarRelatorio(relatorio)

return {
diagnostico:diagnostico,
relatorio:relatorio,
status:"analise_tecnica_concluida"
}

},



analisarClarezaSintatica(texto){

const frases = texto.split(/[.!?]/).filter(f => f.trim().length > 0)

if(frases.length === 0){
return "baixa"
}

let frasesLongas = 0

for(const frase of frases){
if(frase.trim().length > 180){
frasesLongas++
}
}

const proporcao = frasesLongas / frases.length

if(proporcao < 0.15){
return "alta"
}

if(proporcao < 0.35){
return "media"
}

return "baixa"

},



analisarDensidadeFrasal(texto){

const frases = texto.split(/[.!?]/).filter(f => f.trim().length > 0)

if(frases.length === 0){
return "baixa"
}

let soma = 0

for(const frase of frases){
soma += frase.trim().length
}

const media = soma / frases.length

if(media < 80){
return "leve"
}

if(media < 140){
return "equilibrada"
}

return "densa"

},



analisarRepeticaoLexical(texto){

const palavras = texto
.toLowerCase()
.replace(/[^\p{L}\p{N}\s]/gu, " ")
.split(/\s+/)
.filter(Boolean)

if(palavras.length === 0){
return "baixa"
}

const ignorar = new Set([
"de","da","do","das","dos","e","a","o","as","os","um","uma","em","no","na",
"nos","nas","por","para","com","sem","que","se","eu","ele","ela","eles","elas"
])

const contagem = {}

for(const palavra of palavras){
if(ignorar.has(palavra) || palavra.length < 4){
continue
}
contagem[palavra] = (contagem[palavra] || 0) + 1
}

const repetidas = Object.values(contagem).filter(v => v >= 5).length

if(repetidas < 5){
return "baixa"
}

if(repetidas < 15){
return "media"
}

return "alta"

},



analisarDialogoNarracao(texto){

const travessoes = (texto.match(/—/g) || []).length
const aspas = (texto.match(/["“”]/g) || []).length
const linhas = texto.split("\n").filter(l => l.trim().length > 0).length

const marcadoresDialogo = travessoes + aspas

if(linhas === 0){
return "indefinido"
}

const proporcao = marcadoresDialogo / linhas

if(proporcao < 0.08){
return "predominio_narracao"
}

if(proporcao < 0.22){
return "equilibrado"
}

return "predominio_dialogo"

},



analisarParagrafos(texto){

const paragrafos = texto
.split(/\n\s*\n/)
.map(p => p.trim())
.filter(Boolean)

if(paragrafos.length === 0){
return "baixa"
}

let longos = 0

for(const p of paragrafos){
if(p.length > 600){
longos++
}
}

const proporcao = longos / paragrafos.length

if(proporcao < 0.15){
return "equilibrada"
}

if(proporcao < 0.35){
return "moderada"
}

return "densa"

},



analisarNarrador(texto){

const primeiraPessoa = (texto.match(/\b(eu|meu|minha|me|comigo|nós|nosso|nossa)\b/gi) || []).length
const terceiraPessoa = (texto.match(/\b(ele|ela|dele|dela|eles|elas)\b/gi) || []).length

if(primeiraPessoa > 0 && terceiraPessoa > 0){
return "oscilante"
}

if(primeiraPessoa > 0){
return "primeira_pessoa_estavel"
}

if(terceiraPessoa > 0){
return "terceira_pessoa_estavel"
}

return "indefinido"

},



analisarFluidezEditorial(texto){

let marcadores = 0

if(/depois|então|mais tarde|na manhã seguinte|naquela noite|dias depois|horas depois/gi.test(texto)){
marcadores++
}

if(/cap[ií]tulo|pr[oó]logo|ep[ií]logo/gi.test(texto)){
marcadores++
}

if(/\n\s*\n/.test(texto)){
marcadores++
}

if(marcadores >= 3){
return "alta"
}

if(marcadores === 2){
return "media"
}

return "baixa"

},



gerarObservacaoTecnica(texto){

const clareza = this.analisarClarezaSintatica(texto)
const densidade = this.analisarDensidadeFrasal(texto)
const repeticao = this.analisarRepeticaoLexical(texto)
const dialogo = this.analisarDialogoNarracao(texto)
const paragrafos = this.analisarParagrafos(texto)
const narrador = this.analisarNarrador(texto)
const fluidez = this.analisarFluidezEditorial(texto)

let linhas = []

if(clareza === "alta"){
linhas.push("A clareza sintática está bem estabilizada.")
}else if(clareza === "media"){
linhas.push("A clareza sintática está razoável, com alguns trechos potencialmente densos.")
}else{
linhas.push("Há excesso de estruturas sintáticas longas ou pesadas.")
}

if(densidade === "leve"){
linhas.push("As frases tendem a ser mais leves e diretas.")
}else if(densidade === "equilibrada"){
linhas.push("A densidade frasal está equilibrada.")
}else{
linhas.push("A densidade frasal está alta e pode exigir maior atenção editorial.")
}

if(repeticao === "baixa"){
linhas.push("A repetição lexical está controlada.")
}else if(repeticao === "media"){
linhas.push("Há repetição lexical perceptível, mas ainda administrável.")
}else{
linhas.push("Há repetição lexical elevada, sugerindo necessidade de variação.")
}

if(dialogo === "predominio_narracao"){
linhas.push("Predomina a narração sobre os diálogos.")
}else if(dialogo === "equilibrado"){
linhas.push("Há equilíbrio estrutural entre narração e diálogo.")
}else{
linhas.push("Os diálogos aparecem com predominância significativa.")
}

if(paragrafos === "equilibrada"){
linhas.push("A distribuição de parágrafos está bem controlada.")
}else if(paragrafos === "moderada"){
linhas.push("Há alguns blocos narrativos mais densos.")
}else{
linhas.push("A densidade dos parágrafos é alta e pode comprometer fluidez visual.")
}

if(narrador === "oscilante"){
linhas.push("Há sinais de oscilação no foco do narrador.")
}else if(narrador === "indefinido"){
linhas.push("O foco narrativo não está claramente marcado.")
}else{
linhas.push("A consistência do narrador está razoavelmente estável.")
}

if(fluidez === "alta"){
linhas.push("A fluidez editorial geral está bem marcada.")
}else if(fluidez === "media"){
linhas.push("A fluidez editorial é moderada.")
}else{
linhas.push("A fluidez editorial ainda pode ser fortalecida.")
}

return linhas.join(" ")

},



gerarRelatorioTecnico(diagnostico){

return {
clarezaSintatica:diagnostico.clarezaSintatica,
densidadeFrasal:diagnostico.densidadeFrasal,
repeticaoLexical:diagnostico.repeticaoLexical,
equilibrioDialogoNarracao:diagnostico.equilibrioDialogoNarracao,
densidadeParagrafos:diagnostico.densidadeParagrafos,
consistenciaNarrador:diagnostico.consistenciaNarrador,
fluidezEditorial:diagnostico.fluidezEditorial,
observacaoTecnica:diagnostico.observacaoTecnica,
status:"relatorio_tecnico_pronto"
}

},



status(){

return RevisaoCore.obterResumoEstado()

}

}


console.log("REVISAO ENGINE ATIVA")
