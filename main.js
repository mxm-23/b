/*******************************************************
 * 1. 原始数据
 ******************************************************/
const csv = `hour,temperature,humidity,pm25
0,18.2,65,35
2,17.8,68,38
4,17.5,70,42
6,18.1,65,45
8,20.5,60,50
10,23.8,55,55
12,26.4,48,58`;

/*******************************************************
 * 2. 解析
 ******************************************************/
const lines  = csv.trim().split('\n').slice(1);
const labels = [];
const temp   = [];
const humid  = [];
const pm25   = [];

lines.forEach(line => {
  const [h, t, hu, p] = line.split(',').map(Number);
  labels.push(`${h}:00`);
  temp.push(t);
  humid.push(hu);
  pm25.push(p);
});

/*******************************************************
 * 3. 画图
 ******************************************************/
const ctx = document.getElementById('barChart');
new Chart(ctx, {
  type: 'bar',
  data: {
    labels,
    datasets: [
      { label: '温度 ℃', data: temp, backgroundColor: '#FF6384', borderRadius: 4 },
      { label: '湿度 %',  data: humid, backgroundColor: '#36A2EB', borderRadius: 4 },
      { label: 'PM2.5 μg/m³', data: pm25, backgroundColor: '#FFCE56', borderRadius: 4 }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,   // 允许自由设置高宽比
    plugins: { title: { display: true, text: '逐小时环境监测' } },
    scales: {
      x: { grid: { display: false } },               // 横坐标简洁
      y: {
        beginAtZero: true,
        max: 80,                                    // ① 压顶
        ticks:  { stepSize: 10 },                   // ② 格子密
        grid: { drawBorder: false }                 // 可选：去掉顶部边框
      }
    },
    // ③ 关键：把画布整体压扁，纵坐标自然比横坐标短
    layout: { padding: { top: 10, bottom: 10 } },
    // ④ 手动设置高宽比（宽 > 高）
    aspectRatio: 2.5   // 数字越大图越“扁”，纵坐标越短
  }
});
