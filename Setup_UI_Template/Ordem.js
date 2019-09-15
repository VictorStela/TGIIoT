var sku = flow.get('SKU');
var ciclo = flow.get('ciclo');
var velocidade = flow.get('velocidade');
var tempo = flow.get('tempo');
var tempoS = flow.get('tempoS');
var ordem = flow.get('ordem');
var producao = flow.get('producao');
var data = msg.payload;
msg.payload = []
if(producao > 0 && sku !== null){
    msg = {
    "payload":{
        "skuInformacoes":{
            "sku": sku,
            "ciclo": ciclo,
            "velocidadePadrao": velocidade,
            "tempoDeProducao": tempo,
            "tempoDeProducaoSec": tempoS,
            "quantidadePrevista": producao,
        },
        "ordemInformacoes":{
            "ordem": ordem,
            "produzido": 0,
            "tempoProduzido": "00:00:00",
            "tempoProduzidoSec": 0,
            "statusDeOrdem": "Programada"
        },
        "dadosDeProducao": {

        },
    },
    "_id": ordem
    }
    return [msg,null];
}
if(producao <= 0){
    var msg1 = {"payload": "Informe a quantidade de produção prevista!"}
    return [null,msg1];
}
if(sku === null){
    var msg1 = {"payload": "Informe um SKU!"}
    return [null,msg1];
}