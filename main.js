/*******************************************************
 * 1. 原始数据：复制自用户提供的表格
 *    格式：hour,temperature,humidity,pm25
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
 * 2. 解析 CSV → 数组
 ******************************************************/
const lines  = csv.trim().split('\n').slice(1); // 去掉表头
const labels = [];   // X 轴文字
const temp   = [];   // 温度
const humid  = [];   // 湿度
const pm25   = [];   // PM2.5

lines.forEach(line => {
  const [h, t, hu, p] = line.split(',').map(Number);
  labels.push(`${h}:00`);
  temp.push(t);
  humid.push(hu);
  pm25.push(p);
});

/*******************************************************
 * 3. 画柱状图
 ******************************************************/
const ctx = document.getElementById('barChart');
new Chart(ctx, {
  type: 'bar',
  data: {
    labels,
    datasets: [
      {
        label: '温度 ℃',
        data: temp,
        backgroundColor: '#FF6384',
        borderRadius: 4
      },
      {
        label: '湿度 %',
        data: humid,
        backgroundColor: '#36A2EB',
        borderRadius: 4
      },
      {
        label: 'PM2.5 μg/m³',
        data: pm25,
        backgroundColor: '#FFCE56',
        borderRadius: 4
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          label(ctx) {
            return ctx.dataset.label + '：' + ctx.parsed.y;
          }
        }
      }
    },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true }
    }
  }
});
