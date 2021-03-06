var process_id = global.get('process_id') || 0;
if(process_id !== 150){
    return;
}

var ordem = global.get('ordematual');
var index = 0;

for(index in ordem.dadosDeProducao){
    var tempoTotal = ordem.dadosDeProducao[index].timeTotal.reduce(function(anterior, atual) {
    return anterior + atual;
    });
}

for(index in ordem.dadosDeProducao){
    var tempoCarga = ordem.dadosDeProducao[index].timeCarga.reduce(function(anterior, atual) {
    return anterior + atual;
    });
}

for(index in ordem.dadosDeProducao){
    var tempoPlan = ordem.dadosDeProducao[index].timeScheduledStop.reduce(function(anterior, atual) {
    return anterior + atual;
    });
}

for(index in ordem.dadosDeProducao){
    var tempoNApt = ordem.dadosDeProducao[index].timeNaoApontada.reduce(function(anterior, atual) {
    return anterior + atual;
    });
}

for(index in ordem.dadosDeProducao){
    var tempoNPlan = ordem.dadosDeProducao[index].timeUnscheduledStop.reduce(function(anterior, atual) {
    return anterior + atual;
    });
}

var tempoUnPlan = tempoNApt + tempoNPlan;

var tempoTeorico = tempoCarga - tempoUnPlan;

for(index in ordem.dadosDeProducao){
    var prodTotal = ordem.dadosDeProducao[index].totalProduction.reduce(function(anterior, atual) {
    return anterior + atual;
    });
}

for(index in ordem.dadosDeProducao){
    var metaTotal = ordem.dadosDeProducao[index].metaProducao.reduce(function(anterior, atual) {
    return anterior + atual;
    });
}

var tempoPerformance = parseInt(((metaTotal - prodTotal)*ordem.skuInformacoes.ciclo));
if(tempoPerformance < 0){
    tempoPerformance = 0;
}

var tempoReal = tempoTeorico - tempoPerformance;

for(index in ordem.dadosDeProducao){
    var prodRuim = ordem.dadosDeProducao[index].badProduction.reduce(function(anterior, atual) {
    return anterior + atual;
    });
}

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