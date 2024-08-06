/* @pjs preload="0.PNG, 1.PNG, 2.PNG, 3.PNG"; */

static final boolean DebugMode = true;

//
// --- Button ---
//
public class Button {
  public int x;
  public int y;
  public int width;
  public int height;
  public String text;
  public Button(int x, int y, int width, int height, String text) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text = text;
  }
}

//
// --- CommandPanel ---
//

public class CommandPanel {
  public static final int FontSize = 24;
  public static final int buttonSize = 5;
  public int x;
  public int y;
  public int width;
  public int height;
  public Button[] buttons;
  public int selectedButton; // -1は未選択。それ以外はボタンNo.
  public CommandPanel(int x, int y, int width, int height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    buttons = new Button[buttonSize];
    for (int i = 0; i < buttonSize; i++) {
      buttons[i] = new Button(10, 10 + i * 40, 200, 30, "");
    }
    selectedButton = -1;
  }
  public void clear() {
    for (int i = 0; i < buttonSize; i++) {
      buttons[i].text = "";
    }
  }
  public void print() {
    // 背景
    colorMode(RGB, 256);
    noStroke(); // 線なし
    //stroke(0,0,255); // 線の色
    //strokeWeight(10);  // 線の太さ
    fill(0, 0, 0); // 塗りつぶしの色

    rect(x, y, width, height);
  
    // 文字表示
    textSize(FontSize);
    PFont font = createFont("Meiryo", FontSize);
    textFont(font);
  
    for (int i = 0; i < buttonSize; i++) {
      if (DebugMode == true) {
        colorMode(RGB, 256);
        stroke(0,0,255); // 線の色
        fill(0, 0, 255, 254); // 塗りつぶしの色
        rect(x + buttons[i].x, y + buttons[i].y, buttons[i].width, buttons[i].height);
      }
      fill(255, 255, 255); // 文字色
      text(buttons[i].text, x + buttons[i].x + 5, y + buttons[i].y + buttons[i].height-5);
    }
  }
  public void updateSelectedButton() {
    for (int i = 0; i < buttonSize; i++) {
      if (x + buttons[i].x < mouseX && mouseX < x + buttons[i].x + buttons[i].width &&
          y + buttons[i].y < mouseY && mouseY < y + buttons[i].y + buttons[i].height) {
        selectedButton = i;
        break;
      }
    }
  }
}

//
// --- Console ---
//

public class Console {
  public static final int Height = 5; // 行数
  public static final int FontSize = 24;
  public String[] messages;
  private int stringAddCounter;
  public Console() {
    messages = new String[Height];
    clear();
  }
  public void clear() {
    for (int i = 0; i < Height; i++) {
      messages[i] = "";
    }
    stringAddCounter = 0;
  }
  public void add(String message) {
    if (stringAddCounter < Height) {
      messages[stringAddCounter] = message;
    } else {
      for (int i = 0; i < Height - 1; i++) {
        messages[i] = messages[i + 1];
      }
      messages[Height - 1] = message;
    }
    stringAddCounter++;
  }
  
  public void print() { // コンソール表示
    // 背景
    colorMode(RGB, 256);
    noStroke(); // 線なし
    //stroke(0,0,255); // 線の色
    //strokeWeight(10);  // 線の太さ
    fill(0, 0, 0); // 塗りつぶしの色

    rect(0, 320, 639, 319);
  
    // 文字表示
    textSize(FontSize);
    PFont font = createFont("Meiryo", FontSize);
    textFont(font);
    fill(255, 255, 255); // 文字色
  
    for (int i = 0; i < Height; i++) {
      text(messages[i], 15, 320 + 15 + FontSize * (i + 1));
    }
  }
}

//
// --- Processing ---
//

int status = 0; // 状態
PImage bgPImage; // バックグラウンドイメージ

private CommandPanel commandPanel;
private Console console;

void setup() {
  size(640, 640);
  fullScreen(); // size(screenWidth, screenHeight)はダメみたい。size()引数は変数がだめ。固定値のみみたい
  
  float widthScale = displayWidth / 640.0;
  float heightScale = displayHeight / 640.0;
  println("widthScale:" + widthScale + " heightScale:" + heightScale);
  float scale = widthScale;
  if (scale > heightScale) {
    scale = heightScale;
  }
  //scale(2.0);
  scale(scale);
  frameRate(20);

  commandPanel = new CommandPanel(320, 0, 320, 320);
  console = new Console();

  start0();
}

void draw() {
  //
  // 処理
  //
  //ellipse(width / 2, height / 2, mouseX, mouseY);
  
  //console.add("ボタン" + commandPanel.selectedButton + "が押されました");
  //console.print();
  switch (status) {
    case 0: // タイトル
      switch (commandPanel.selectedButton) {
        case 0:
          start1();
          break;
      }
      break;
    case 1: // 置き手紙
      switch (commandPanel.selectedButton) {
        case 0:
          start3();
          break;
        case 1:
          start2();
          break;
      }
      break;
    case 2: // 天国
      switch (commandPanel.selectedButton) {
        case 0:
          start0();
          break;
      }
      break;
    case 3: // 地獄
      switch (commandPanel.selectedButton) {
        case 0:
          start0();
          break;
      }
      break;
  }
  
  //
  // 表示
  //
  
  // コンソール表示
  //rect(0, 320, 640, 310);
  
}

void mousePressed() {
  commandPanel.updateSelectedButton();
}

void start0() {
  bgPImage = loadImage("0.PNG");
  // image(bgPImage, 0, 0, width, bgPImage.height / (bgPImage.width / width));
  image(bgPImage, 0, 0, width / 2, width /2);

  console.clear();
  console.add("天国と地獄");
  console.add("");
  console.add("開始ボタンを押してください");
  console.print();
  
  commandPanel.clear();
  commandPanel.buttons[0].text = "開始";
  commandPanel.print();
  
  status = 0;

  commandPanel.selectedButton = -1;
}

void start1() {
  bgPImage = loadImage("1.PNG");
  image(bgPImage, 0, 0, width / 2, width /2);

  console.clear();
  console.add("家に帰ると置き手紙がありました");
  console.add("どうしますか？");
  console.print();
  
  commandPanel.clear();
  commandPanel.buttons[0].text = "弁護士に相談";
  commandPanel.buttons[1].text = "まるさんに相談";
  commandPanel.print();
  
  status = 1;
  commandPanel.selectedButton = -1;
}

void start2() {
  bgPImage = loadImage("2.PNG");
  image(bgPImage, 0, 0, width / 2, width /2);
  
  console.clear();
  console.add("天国にのぼりました");
  console.add("conguraturations!");
  console.print();
  
  commandPanel.clear();
  commandPanel.buttons[0].text = "タイトルに戻る";
  commandPanel.print();
  
  status = 2;
  commandPanel.selectedButton = -1;
}

void start3() {
  bgPImage = loadImage("3.PNG");
  image(bgPImage, 0, 0, width / 2, width /2);
  
  console.clear();
  console.add("地獄に落ちました");
  console.add("ゲームオーバー！");
  console.print();
  
  commandPanel.clear();
  commandPanel.buttons[0].text = "タイトルに戻る";
  commandPanel.print();
  
  status = 3;
  commandPanel.selectedButton = -1;
}
