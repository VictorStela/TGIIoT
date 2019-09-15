if(flow.get('ordematual') === null){
    return;
}
if(flow.get('ordematual').payload === null){
    return;
}

var ordem = flow.get('ordematual').payload;

var lista = [];
var comp = 0;
var index = 0;
var indexx = index+1;
var total = 0;

for(comp in ordem.dadosDeProducao){
    lista.push(ordem.dadosDeProducao[comp].data);
}

var tam = lista.length

while(indexx <= tam){
    var ref = lista[index];
    var valor = ordem.dadosDeProducao[ref].timeTotal.reduce(function(anterior, atual) {
        return anterior + atual;
    });
    total = total + valor;
    index ++
    indexx ++
}

var tempoTotal = total;

var comp = 0;
var index = 0;
var indexx = index+1;
var total = 0;

while(indexx <= tam){
    var ref = lista[index];
    var valor = ordem.dadosDeProducao[ref].timeCarga.reduce(function(anterior, atual) {
        return anterior + atual;
    });
    total = total + valor;
    index ++
    indexx ++
}

var tempoCarga = total;

var comp = 0;
var index = 0;
var indexx = index+1;
var total = 0;

while(indexx <= tam){
    var ref = lista[index];
    var valor = ordem.dadosDeProducao[ref].timeScheduledStop.reduce(function(anterior, atual) {
        return anterior + atual;
    });
    total = total + valor;
    index ++
    indexx ++
}

var tempoPlan = total;

var comp = 0;
var index = 0;
var indexx = index+1;
var total = 0;

while(indexx <= tam){
    var ref = lista[index];
    var valor = ordem.dadosDeProducao[ref].timeNaoApontada.reduce(function(anterior, atual) {
        return anterior + atual;
    });
    total = total + valor;
    index ++
    indexx ++
}

var tempoNApt = total;

var comp = 0;
var index = 0;
var indexx = index+1;
var total = 0;

while(indexx <= tam){
    var ref = lista[index];
    var valor = ordem.dadosDeProducao[ref].timeUnscheduledStop.reduce(function(anterior, atual) {
        return anterior + atual;
    });
    total = total + valor;
    index ++
    indexx ++
}

var tempoNPlan = total;

var comp = 0;
var index = 0;
var indexx = index+1;
var total = 0;

var tempoUnPlan = tempoNApt + tempoNPlan;

var tempoTeorico = tempoCarga - tempoUnPlan;

while(indexx <= tam){
    var ref = lista[index];
    var valor = ordem.dadosDeProducao[ref].totalProduction.reduce(function(anterior, atual) {
        return anterior + atual;
    });
    total = total + valor;
    index ++
    indexx ++
}

var prodTotal = total;

var comp = 0;
var index = 0;
var indexx = index+1;
var total = 0;

while(indexx <= tam){
    var ref = lista[index];
    var valor = ordem.dadosDeProducao[ref].metaProducao.reduce(function(anterior, atual) {
        return anterior + atual;
    });
    total = total + valor;
    index ++
    indexx ++
}

var metaTotal = total;

var comp = 0;
var index = 0;
var indexx = index+1;
var total = 0;

var tempoPerformance = parseInt(((metaTotal - prodTotal)*ordem.skuInformacoes.ciclo));
if(tempoPerformance < 0){
    tempoPerformance = 0;
}

var tempoReal = tempoTeorico - tempoPerformance;

while(indexx <= tam){
    var ref = lista[index];
    var valor = ordem.dadosDeProducao[ref].badProduction.reduce(function(anterior, atual) {
        return anterior + atual;
    });
    total = total + valor;
    index ++
    indexx ++
}

var prodRuim = total;

var comp = 0;
var index = 0;
var indexx = index+1;
var total = 0;

var tempoQualidade = parseInt(prodRuim * ordem.skuInformacoes.ciclo);

var tempoFinal = tempoReal - tempoQualidade;

tempoTotal = [tempoTotal,0,0,0,0];
tempoCarga = [0,tempoCarga,0,0,0];
tempoPlan = [0,tempoPlan,0,0,0];
tempoTeorico = [0,0,tempoTeorico,0,0];
tempoUnPlan = [0,0,tempoUnPlan,0,0];
tempoReal = [0,0,0,tempoReal,0];
tempoPerformance = [0,0,0,tempoPerformance,0];
tempoFinal = [0,0,0,0,tempoFinal];
tempoQualidade = [0,0,0,0,tempoQualidade]

var type = 'horizontalBar';
var labels = ['Tempo total','Tempo de carga','Disponibilidade','Perfomance','Qualidade'];
var datasets = [{
    'type': 'horizontalBar',
    'label': 'Tempo total',
    'data': tempoTotal,
    'backgroundColor': 'rgba(7, 89, 0, 0.5)',
    'borderColor': 'rgba(7, 89, 0, 1)',
    'borderWidth': 1,
    'hoverBackgroundColor': 'rgba(7, 89, 0, 1)'
},
{
    'type': 'horizontalBar',
    'label': 'Tempo programado para produzir',
    'data': tempoCarga,
    'backgroundColor': 'rgba(11, 130, 1, 0.5)',
    'borderColor': 'rgba(11, 130, 1, 1)',
    'borderWidth': 1,
    'hoverBackgroundColor': 'rgba(11, 130, 1, 1)'
},
{
    'type': 'horizontalBar',
    'label': 'Perda planejada',
    'data': tempoPlan,
    'backgroundColor': 'rgba(0, 48, 179, 0.5)',
    'borderColor': 'rgba(0, 48, 179, 1)',
    'borderWidth': 1,
    'hoverBackgroundColor': 'rgba(0, 48, 179, 1)'
},
{
    'type': 'horizontalBar',
    'label': 'Tempo produzindo',
    'data': tempoTeorico,
    'backgroundColor': 'rgba(14, 163, 2, 0.5)',
    'borderColor': 'rgba(14, 163, 2, 1)',
    'borderWidth': 1,
    'hoverBackgroundColor': 'rgba(14, 163, 2, 1)'
},
{
    'type': 'horizontalBar',
    'label': 'Perda não planejada',
    'data': tempoUnPlan,
    'backgroundColor': 'rgba(222, 0, 0, 0.5)',
    'borderColor': 'rgba(222, 0, 0, 1)',
    'borderWidth': 1,
    'hoverBackgroundColor': 'rgba(222, 0, 0, 1)'
},
{
    'type': 'horizontalBar',
    'label': 'Tempo real',
    'data': tempoReal,
    'backgroundColor': 'rgba(14, 186, 0, 0.5)',
    'borderColor': 'rgba(14, 186, 0, 1)',
    'borderWidth': 1,
    'hoverBackgroundColor': 'rgba(14, 186, 0, 1)'
},
{
    'type': 'horizontalBar',
    'label': 'Perda de performance',
    'data': tempoPerformance,
    'backgroundColor': 'rgba(242, 0, 0, 0.5)',
    'borderColor': 'rgba(242, 0, 0, 1)',
    'borderWidth': 1,
    'hoverBackgroundColor': 'rgba(242, 0, 0, 1)'
},
{
    'type': 'horizontalBar',
    'label': 'Tempo final',
    'data': tempoFinal,
    'backgroundColor': 'rgba(17, 227, 0, 0.5)',
    'borderColor': 'rgba(17, 227, 0, 1)',
    'borderWidth': 1,
    'hoverBackgroundColor': 'rgba(17, 227, 0, 1)'
},
{
    'type': 'horizontalBar',
    'label': 'Perda de qualidade',
    'data': tempoQualidade,
    'backgroundColor': 'rgba(255, 0, 0, 0.5)',
    'borderColor': 'rgba(255, 0, 0, 1)',
    'borderWidth': 1,
    'hoverBackgroundColor': 'rgba(255, 0, 0, 1)'
}];
var options = {
        scales: {
            xAxes: [{ stacked: true }],
            yAxes: [{ stacked: true }]
        },
        title: {
            display: true,
            position: 'top',
            fontSize: 20,
            text: 'Diagrama de tempos'
        }
}
var duration = 0;

msg = {
    'type': type,
    'labels': labels,
    'datasets': datasets,
    'options': options,
    'duration': duration        
    };

return msg;