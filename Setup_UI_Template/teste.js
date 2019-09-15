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
msg.payload = tempoTotal;

for(index in ordem.dadosDeProducao){
    var tempoCarga = ordem.dadosDeProducao[index].timeCarga.reduce(function(anterior, atual) {
    return anterior + atual;
    });
}
msg.payload = tempoCarga;

for(index in ordem.dadosDeProducao){
    var tempoPlan = ordem.dadosDeProducao[index].timeScheduledStop.reduce(function(anterior, atual) {
    return anterior + atual;
    });
}
msg.payload = tempoPlan;

for(index in ordem.dadosDeProducao){
    var tempoNApt = ordem.dadosDeProducao[index].timeNaoApontada.reduce(function(anterior, atual) {
    return anterior + atual;
    });
}
msg.payload = tempoNApt;

for(index in ordem.dadosDeProducao){
    var tempoNPlan = ordem.dadosDeProducao[index].timeUnscheduledStop.reduce(function(anterior, atual) {
    return anterior + atual;
    });
}
msg.payload = tempoNPlan;

var tempoUnPlan = tempoNApt + tempoNPlan;

var tempoTeorico = tempoCarga - tempoUnPlan;

tempoTotal = [tempoTotal,0,0];
tempoCarga = [0,tempoCarga,0];
tempoPlan = [0,tempoPlan,0];
tempoTeorico = [0,0,tempoTeorico];
tempoUnPlan = [0,0,tempoUnPlan];

var type = 'horizontalBar';
var labels = ['A','B','C'];
var datasets = [{
    'type': 'horizontalBar',
    'label': 'Tempo total',
    'data': tempoTotal,
    'backgroundColor': 'rgba(0, 117, 31, 0.5)',
    'borderColor': 'rgba(0, 117, 31, 1)',
    'borderWidth': 1,
    'hoverBackgroundColor': 'rgba(0, 117, 31, 1)'
},
{
    'type': 'horizontalBar',
    'label': 'Tempo programado para produzir',
    'data': tempoCarga,
    'backgroundColor': 'rgba(0, 214, 54, 0.5)',
    'borderColor': 'rgba(0, 214, 54, 1)',
    'borderWidth': 1,
    'hoverBackgroundColor': 'rgba(0, 214, 54, 1)'
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
    'backgroundColor': 'rgba(13, 255, 0, 0.5)',
    'borderColor': 'rgba(13, 255, 0, 1)',
    'borderWidth': 1,
    'hoverBackgroundColor': 'rgba(13, 255, 0, 1)'
},
{
    'type': 'horizontalBar',
    'label': 'Perda não planejada',
    'data': tempoUnPlan,
    'backgroundColor': 'rgba(255, 30, 0, 0.5)',
    'borderColor': 'rgba(255, 30, 0, 1)',
    'borderWidth': 1,
    'hoverBackgroundColor': 'rgba(255, 30, 0, 1)'
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
            text: 'Teste'
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