let seaweeds = [];
let colors = ["#43d8a1", "#56dcab", "#67e0b3", "#78e3bc", "#88e7c4", "#99eacd", "#aaeed6", "#bbf2de", "#ccf5e6", "#ddf8ee"];
let iframe;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // 創建 iframe
  iframe = createElement('iframe');
  iframe.attribute('src', 'https://www.et.tku.edu.tw/');
  iframe.style('border', 'none');
  iframe.size(windowWidth * 0.8, windowHeight * 0.8); // 設定寬高為視窗的 80%
  iframe.position(windowWidth * 0.1, windowHeight * 0.1); // 將 iframe 置於視窗中間

  for (let i = 0; i < 80; i++) { // 產生 80 條水草（交錯效果）
    let x = i * (width / 80); // 均勻分布
    let height = random(200, 120); // 隨機高度
    let thickness = random(10, 20); // 隨機粗細
    let color = random(colors); // 隨機顏色
    seaweeds.push({
      x: x,
      height: height,
      thickness: thickness,
      color: color,
      offset: random(1000), // 用於噪聲的偏移
    });
  }
}

function draw() {
  background(220);

  // 根據 x 座標排序，讓水草交錯時有前後層次感
  seaweeds.sort((a, b) => a.x - b.x);

  for (let seaweed of seaweeds) {
    let segments = 10; // 水草分成 10 段
    let segmentHeight = seaweed.height / segments; // 每段的高度
    let x = seaweed.x; // 初始 x 座標
    let y = height; // 初始 y 座標（畫布底部）

    // 設定水草顏色，交錯時加深顏色
    let baseColor = color(seaweed.color);
    let darkerColor = lerpColor(baseColor, color(0), 0.3); // 加深顏色
    stroke(darkerColor);
    strokeWeight(seaweed.thickness); // 設定水草粗細
    noFill();

    beginShape();
    for (let i = 0; i <= segments; i++) {
      let sway = map(noise(seaweed.offset + i * 0.1), 0, 1, -15, 15); // 每段的左右擺動
      vertex(x + sway, y); // 繪製節點
      y -= segmentHeight; // 向上移動
    }
    endShape();

    seaweed.offset += 0.01; // 控制搖晃速度
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時調整畫布大小
  iframe.size(windowWidth * 0.8, windowHeight * 0.8); // 調整 iframe 的大小
  iframe.position(windowWidth * 0.1, windowHeight * 0.1); // 調整 iframe 的位置
}
