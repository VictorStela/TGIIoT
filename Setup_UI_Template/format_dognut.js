var process_id = global.get('process_id') || 0;
if(process_id !== 150){
    return;
}

var ordem = global.get('ordematual') || [];
var timeNaoApontada = ordem.timeNaoApontada;
var timeScheduledStop = ordem.timeScheduledStop;
var timeUnscheduledStop = ordem.timeUnscheduledStop;
var timeSetup = ordem.timeSetup;
var timeManutProd = ordem.timeManutProd;
var timeRefeicao = ordem.timeRefeicao;
var timeManutPlan = ordem.timeManutPlan;

var totaltimeNaoApontada = timeNaoApontada.reduce(function(anterior, atual) {
    return anterior + atual;
});

var totaltimeScheduledStop = timeScheduledStop.reduce(function(anterior, atual) {
    return anterior + atual;
});

var totaltimeUnscheduledStop = timeUnscheduledStop.reduce(function(anterior, atual) {
    return anterior + atual;
});

var totaltimeSetup = timeSetup.reduce(function(anterior, atual) {
    return anterior + atual;
});

var totaltimeManutProd = timeManutProd.reduce(function(anterior, atual) {
    return anterior + atual;
});

var totaltimeRefeicao = timeRefeicao.reduce(function(anterior, atual) {
    return anterior + atual;
});

var totaltimeManutPlan = timeManutPlan.reduce(function(anterior, atual) {
    return anterior + atual;
});

var doughnut1 = [totaltimeNaoApontada+totaltimeUnscheduledStop,totaltimeScheduledStop,0,0,0,0];
var doughnut2 = [0,0,totaltimeSetup,totaltimeManutProd,totaltimeRefeicao,totaltimeManutPlan];

var type = 'doughnut';
var labels = ['Parada não planejada','Parada planejada','Setup','Ajuste / Regulagem','Refeição','Manutenção Planejada'];
var datasets = [{
    'type': 'doughnut',
    'label': 'Paradas',
    'data': doughnut1,
    'backgroundColor': ['rgba(255, 59, 59, 0.5)','rgba(255, 229, 59, 0.5)','rgba(107, 255, 38, 0.5)','rgba(38, 255, 204, 0.5)','rgba(38, 42, 255, 0.5)','rgba(208, 38, 255, 0.5)'],
    'borderColor': ['rgba(255, 59, 59, 1)','rgba(255, 229, 59, 1)','rgba(107, 255, 38, 1)','rgba(38, 255, 204, 1)','rgba(38, 42, 255, 1)','rgba(208, 38, 255, 1)'],
    'borderWidth': 1,
    'hoverBackgroundColor': ['rgba(255, 59, 59, 1)','rgba(255, 229, 59, 1)','rgba(107, 255, 38, 1)','rgba(38, 255, 204, 1)','rgba(38, 42, 255, 1)','rgba(208, 38, 255, 1)']
},{
    'type': 'doughnut',
    'label': 'Paradas',
    'data': doughnut2,
    'backgroundColor': ['rgba(255, 59, 59, 0.5)','rgba(255, 229, 59, 0.5)','rgba(107, 255, 38, 0.5)','rgba(38, 255, 204, 0.5)','rgba(38, 42, 255, 0.5)','rgba(208, 38, 255, 0.5)'],
    'borderColor': ['rgba(255, 59, 59, 1)','rgba(255, 229, 59, 1)','rgba(107, 255, 38, 1)','rgba(38, 255, 204, 1)','rgba(38, 42, 255, 1)','rgba(208, 38, 255, 1)'],
    'borderWidth': 1,
    'hoverBackgroundColor': ['rgba(255, 59, 59, 1)','rgba(255, 229, 59, 1)','rgba(107, 255, 38, 1)','rgba(38, 255, 204, 1)','rgba(38, 42, 255, 1)','rgba(208, 38, 255, 1)']
}
];
var options = {
    scales: {
        xAxes: [{ stacked: true }],
        yAxes: [{ stacked: true }]
    },
    title: {
        display: true,
        position: 'top',
        fontSize: 20,
        text: 'Perdas'
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