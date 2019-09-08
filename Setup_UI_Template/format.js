var process_id = global.get('process_id') || 0;
if(process_id !== 150){
    return;
}

var ordem = global.get('ordematual') || [];
var oee = ordem.oee;
var meta = [80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80];
var type = 'bar';
var labels = ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'];
var datasets = [{
    'type': 'bar',
    'label': 'OEE',
    'data': oee,
    'backgroundColor': 'rgba(255, 186, 59, 0.5)',
    'borderColor': 'rgba(255, 186, 59, 1)',
    'borderWidth': 1,
    'hoverBackgroundColor': 'rgba(255, 186, 59, 1)'
},
{
    'fill': false,
    'type': 'line',
    'label': 'Meta',
    'data': meta,
    'backgroundColor': 'rgba(255, 65, 59, 0.5)',
    'borderColor': 'rgba(255, 65, 59, 1)',
    'borderWidth': 1,
    'hoverBackgroundColor': 'rgba(255, 65, 59, 1)'
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
        text: 'OEE'
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