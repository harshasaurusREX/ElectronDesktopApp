const { nokiaDaily } = require('../assets/NOKDaily');
const { nokiaWeekly } = require('../assets/NOKWeekly');
const canvas = document.body;
const { ipcRenderer, BrowserWindow, remote } = require('electron');
const { Menu } = remote;
// canvas.style.position = 'absolute';
const data = nokiaDaily;
var width = 1400;
var height = 300;
var toolTipWidth = 96;
var toolTipHeight = 80;
var toolTipMargin = 15;
var priceScaleWidth = 50;

var chartId = '';
var chartClass = '';

//const openRadio = document.getElementById('open');
//const highRadio = document.getElementById('high');
//const lowRadio = document.getElementById('low');
//const closeRadio = document.getElementById('close');
//const volumeRadio = document.getElementById('volume');



const map = new Map();

const value = [];
for (let i = 0; i < data.length; ++i) {
    value[i] = { time: data[i].Date, value: data[i].Open };
}

function businessDayToString(businessDay) {
    return new Date(Date.UTC(businessDay.year, businessDay.month - 1, businessDay.day, 0, 0, 0)).toLocaleDateString();
}

for (let i = 0; i < nokiaWeekly.length; ++i) {

    map.set(nokiaWeekly[i].Date, {
        Open: nokiaWeekly[i].Open,
        High: nokiaWeekly[i].High,
        Low: nokiaWeekly[i].Low,
        Close: nokiaWeekly[i].Close,
        Volume: nokiaWeekly[i].Volume

    });

}

function CreateCanvas() {


    localArea = document.getElementById(chartId);
    if(chartClass!=null)
    {
        console.log("chartClass not null");
        localArea.className = chartClass;
    }

    const label = document.createElement('label');
    label.innerHTML = 'Chart for Apple';
    console.log("chartClass : " + chartClass );

    localArea.appendChild(label);
    localArea.width = width;
    localArea.height = height;
    canvas.appendChild(localArea);
    const chart = LightweightCharts.createChart(localArea, {
        width: width,
        height: height,
        watermark: {
            visible: true,
            fontSize: 14,
            horzAlign: 'right',
            vertAlign: 'bottom',
            color: 'rgba(171, 71, 188, 0.8)',
            text: 'Escalate Global',
        },
        priceScale: {
            position: 'right',
            mode: 0,
            autoScale: true,
            invertScale: false,
            alignLabels: true,
            borderVisible: true,
            scaleMargins: {
                top: 0.1,
                bottom: 0.1,
            },
        },
    });

    const lineSeries = chart.addLineSeries({
        title: 'Apple'
    });


    lineSeries.setData(value);

    const marker = [];
    for (let i = 0; i < nokiaWeekly.length; ++i) {
        marker[i] = {
            time: nokiaWeekly[i].Date,
            position: 'inBar',
            color: 'blue',
            shape: 'circle',
        }
    }

    lineSeries.setMarkers(marker);

    var container = document.createElement('div');
    localArea.appendChild(container);
    var toolTip = document.createElement('div');
    toolTip.className = 'floating-tooltip-2';
    container.appendChild(toolTip);

    var clickContainer = document.createElement('div');
    clickContainer.className = 'floating-tooltip-3';
    localArea.appendChild(clickContainer);


    chart.subscribeClick(function (param) {

        if (!param.time || param.point.x < 0 || param.point.x > width || param.point.y < 0 || param.point.y > height) {
            clickContainer.style.display = 'none';
            return;
        }
        clickContainer.style.display = 'block';

        var dateStr = LightweightCharts.isBusinessDay(param.time)
            ? businessDayToString(param.time)
            : new Date(param.time * 1000).toLocaleDateString();

        var price = param.seriesPrices.get(lineSeries);
        clickContainer.innerHTML = '<div style="color: rgba(0, 120, 255, 0.9)">Apple</div>' +
            '<div style="font-size: 24px; margin: 4px 0px; color: #20262E">' + (Math.round(price * 100) / 100).toFixed(2) + '</div>' +
            '<div>' + dateStr + '</div>';

        let zeroMonth = '';
        let zerodate = '';
        if (param.time.day < 10) zerodate = '0';
        if (param.time.month < 10) zeroMonth = '0'
        const key = param.time.year + '-' + zeroMonth + param.time.month + '-' + zerodate + param.time.day;
        if (map.has(key)) {
            const value = map.get(key);
             clickContainer.innerHTML += '<div>' + 'Open : ' + value.Open + '</div>';
             clickContainer.innerHTML += '<div>' + 'High : ' + value.High + '</div>';
             clickContainer.innerHTML += '<div>' + 'Low : ' + value.Low + '</div>';
             clickContainer.innerHTML += '<div>' + 'Close : ' + value.Close + '</div>';
             clickContainer.innerHTML += '<div>' + 'Volume : ' + value.Volume + '</div>';

        }

        var left = param.point.x;


        if (left > width - toolTipWidth - toolTipMargin) {
            left = width - toolTipWidth;
        } else if (left < toolTipWidth / 2) {
            left = priceScaleWidth;
        }

        clickContainer.style.left = left + 'px';
        clickContainer.style.top = 0 + 'px';
        console.log(param);
    });

    chart.subscribeCrosshairMove(function (param) {
        if (!param.time || param.point.x < 0 || param.point.x > width || param.point.y < 0 || param.point.y > height) {
            toolTip.style.display = 'none';
            return;
        }

        var dateStr = LightweightCharts.isBusinessDay(param.time)
            ? businessDayToString(param.time)
            : new Date(param.time * 1000).toLocaleDateString();

        toolTip.style.display = 'block';
        var price = param.seriesPrices.get(lineSeries);
        toolTip.innerHTML = '<div style="color: rgba(0, 120, 255, 0.9)">Apple</div>' +
            '<div style="font-size: 24px; margin: 4px 0px; color: #20262E">' + (Math.round(price * 100) / 100).toFixed(2) + '</div>' +
            '<div>' + dateStr + '</div>' +
            '<div>' + 'Custom Display Area.<br> For Example YOLO' + '</div>';


        var left = param.point.x;


        if (left > width - toolTipWidth - toolTipMargin) {
            left = width - toolTipWidth;
        } else if (left < toolTipWidth / 2) {
            left = priceScaleWidth;
        }

        toolTip.style.left = left + 'px';
        toolTip.style.top = 0 + 'px';
    });


}



const markdownContextMenu = Menu.buildFromTemplate([
    { label: 'Open Chart', click() { CreateCanvas(); } },
    { type: 'separator' },
]);


window.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    chartId = event.target.previousElementSibling.id;
    chartClass = event.target.previousElementSibling.className;
    console.log("ChartID : " + chartId );
    console.log("chartClass : " + chartClass );
    markdownContextMenu.popup();
});
