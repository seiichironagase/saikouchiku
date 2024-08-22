/**
 * デバッグモードフラグ
 * 
 * デバッグモード時は以下の様になる。
 * 1. イメージにタッチエリア表示
 */ 
let DebugMode = true;
let LocalMode = true;

//
// --- Command ---
//
class Command {
  tick() {}
}

class ImagePanelSetAndShowImage extends Command {
  constructor(imageParam, buttonValues) {
    super();
    //this.image = imageParam;
    ImagePanel.instance.image = imageParam;
    ImagePanel.instance.buttonValues = buttonValues;
    ImagePanel.instance.selectedButton = -1;
  }

  tick() {
    ImagePanel.instance.print();
    /*
    if (LocalMode == false) {
      image(this.image, 1, 1, 766, 541);
    }

    if (DebugMode == true) {
      let touchSize = 766 / 10;
      for (let i = 0; i < 541; i += touchSize) {
        for (let j = 0; j < 766; j += touchSize) {

          // 背景
          colorMode(RGB, 256);

          //noStroke(); // 線なし
          stroke(100, 100, 100); // 線の色
          strokeWeight(3);  // 線の太さ

          fill(0, 0, 0); // 塗りつぶしの色
          rect(1 + j, 1 + i, touchSize, touchSize);
        }
      }
    }
    */
  }
}
  
class ConsolePanelCearCommand extends Command {
  constructor() {
    super();
  }

  tick() {
    ConsolePanel.instance.clear();
  }
}

class ConsolePanelAddCharCommand extends Command {
  constructor(c) {
    super();
    this.c = c;
  }

  tick() {
    ConsolePanel.instance.add(this.c);
    ConsolePanel.instance.print();
  }
}

class ConsolePanelAddTextCommand extends Command {
  constructor(message) {
    super();
    this.message = message;
  }

  tick() {
    for (let i = 0; i < this.message.length; i++) {
      ConsolePanel.instance.add(this.message.charAt(i));
    }
    ConsolePanel.instance.add("\n");
    ConsolePanel.instance.print();
    //ConsolePanel.instance.add(this.message);
  }
}

class ConsolePanelPrintCommand extends Command {
  constructor() {
    super();
  }

  tick() {
    ConsolePanel.instance.print();
  }
}

class CommandPanelClearCommand extends Command {
  constructor() {
    super();
  }

  tick() {
    CommandPanel.instance.clear();
    CommandPanel.instance.print();
  }
}

class CommandPanelAddButtonCommand extends Command {
  constructor(text) {
    super();
    this.text = text;
  }

  tick() {
    CommandPanel.instance.addButton(this.text);
  }
}

class CommandPanelPrintCommand extends Command {
  constructor() {
    super();
  }

  tick() {
    CommandPanel.instance.print();
  }
}

class CommandController {
  static instance = new CommandController();

  constructor() {
    this.commands = new Array();
  }

  add(cmd) {
    if (Array.isArray(cmd) == true) {
      while (cmd.length > 0) {
        this.commands.push(cmd.shift());
      }
    } else {
      this.commands.push(cmd);
    }
  }

  tick() {
    if (this.commands.length > 0) {
      let cmd = this.commands.shift();
      cmd.tick();
    }
  }
}

class CommandUtility {
  static getConsoleAddCharsFromTextCommand(message) {
    let chars = new Array();
    for (let i = 0; i < message.length; i++) {
      chars.push(new ConsolePanelAddCharCommand(message.charAt(i)));
    }
    chars.push(new ConsolePanelAddCharCommand("\n"));
    return chars;
  }
}

//
// --- Button ---
//
class Button {
  constructor(x, y, widthParam, heightParam, message) {
    this.x = x;
    this.y = y;
    this.width = widthParam;
    this.height = heightParam;
    this.message = message;
  }
}

//
// --- ImagePanel ---
//

class ImagePanel {

  static instance = new ImagePanel();
  image = null;
  buttonValues = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ];

  selectedButton = -1;

  constructor() {
    this.image = null;
    this.selectedButton = -1;
    this.buttonValues = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ];
  }

  print() {
    if (LocalMode == false) {
      image(this.image, 1, 1, 766, 541);
    }

    if (DebugMode == true) {
      let touchSize = 766 / 10;
      for (let i = 0; i < 541; i += touchSize) {
        for (let j = 0; j < 766; j += touchSize) {

          // 背景
          colorMode(RGB, 256);

          //noStroke(); // 線なし
          stroke(100, 100, 100); // 線の色
          strokeWeight(3);  // 線の太さ

          fill(0, 0, 0); // 塗りつぶしの色
          rect(1 + j, 1 + i, touchSize, touchSize);
          //fillStyle = 'rgb(0, 0, 255)'; テキストどーやって表示すんだろ
          //fillText("a", 1+j, 1+i);
          //fillText("a", 100, 100);
        }
      }
    }
  }
}

//
// --- ConsolePanel ---
//

class ConsolePanel {
  //createCanvas(768, 1024)
  static margin = 15;
  static fontSize = 32;

  static instance = new ConsolePanel(
    0,
    543,
    768,
    223
//    ConsolePanel.margin + ConsolePanel.margin + ConsolePanel.fontSize * 8
  );

  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;

    this.lineCount = Math.floor(
      h - (ConsolePanel.margin * 2) / ConsolePanel.fontSize
    );
    this.messages = new Array(this.lineCount);
    this.clear();
  }

  clear() {
    for (let i = 0; i < this.lineCount; i++) {
      this.messages[i] = "";
    }
    this.stringAddCounter = 0;
  }

  add(message) {
    if (message != "\n") {
      this.messages[this.stringAddCounter] =
        this.messages[this.stringAddCounter] + message;
    } else {
      if (this.stringAddCounter >= this.lineCount) {
        for (let i = 0; i < this.lineCount - 1; i++) {
          this.messages[i] = this.messages[i + 1];
        }
      }
      this.stringAddCounter++;
    }
  }

  print() {
    // コンソール表示
    // 背景
    colorMode(RGB, 256);
    noStroke(); // 線なし
    //stroke(0,0,255); // 線の色
    //strokeWeight(10);  // 線の太さ
    fill(0, 0, 0); // 塗りつぶしの色

    rect(this.x, this.y, this.width, this.height);


    // 文字表示
    textSize(ConsolePanel.fontSize);
    //PFont font = createFont("Meiryo", FontSize);
    //textFont(font);
    fill(255, 255, 255); // 文字色

    for (let i = 0; i < this.lineCount; i++) {
      text(
        this.messages[i],
        this.x + ConsolePanel.margin,
        this.y + ConsolePanel.margin + ConsolePanel.fontSize * (i + 1)
      );
    }
  }
}

//
// --- CommandPanel ---
//

class CommandPanel {
  //createCanvas(768, 1024)
  static instance = new CommandPanel(0, 1024 - 258, 768, 258);

  constructor(x, y, widthParam, heightParam) {
    this.fontSize = 32;
    this.x = x;
    this.y = y;
    this.width = widthParam;
    this.height = heightParam;
    this.clear();

    let selectedButton = -1;
  }

  clear() {
    this.buttons = new Array();
    this.buttonPositionX = 0;
    this.buttonPositionY = 0;
  }

  addButton(text) {
    this.buttons.push(
      new Button(
        55 + this.buttonPositionX,
        55 + this.buttonPositionY,
        250,
        40,
        text
      )
    );
    this.buttonPositionX = this.buttonPositionX + 300;
  }

  print() {
    // 背景
    colorMode(RGB, 256);
    noStroke(); // 線なし
    //stroke(0,0,0); // 線の色
    //strokeWeight(10);  // 線の太さ
    fill(0, 0, 0); // 塗りつぶしの色
    rect(this.x, this.y, this.width, this.height);

    // ウインドウ
    
    stroke(150,150,150); // 線の色
    strokeWeight(50);  // 線の太さ
    strokeJoin(ROUND); // 角を丸く
    fill(150, 150, 150); // 塗りつぶしの色
    rect(this.x + 50, this.y + 50, this.width - 100, this.height - 100);

    // 文字表示
    textSize(this.fontSize);
    //PFont font = createFont("Meiryo", FontSize);
    //textFont(font);

    let xPosition = 0;
    let yPosition = 0;

    for (let i = 0; i < this.buttons.length; i++) {
      stroke(255, 255, 255); // 線の色
      fill(255, 255, 255); // 塗りつぶしの色
      strokeJoin(ROUND); // 角を丸く
      strokeWeight(30); // せんの大きさ（これが小さいと角が丸くならない）
      rect(
        this.x + this.buttons[i].x,
        this.y + this.buttons[i].y,
        this.buttons[i].width,
        this.buttons[i].height
      );
      fill(0, 0, 0); // 文字色
      text(
        this.buttons[i].message,
        this.x + this.buttons[i].x + 5,
        this.y + this.buttons[i].y + this.buttons[i].height - 10
      );
    }
  }

  updateSelectedButton() {

    // ボタンが押された事の判定
    for (let i = 0; i < this.buttons.length; i++) {
      if (
        this.x * myScale + this.buttons[i].x * myScale < mouseX &&
        mouseX <
          this.x * myScale +
            this.buttons[i].x * myScale +
            this.buttons[i].width * myScale &&
        this.y * myScale + this.buttons[i].y * myScale < mouseY &&
        mouseY <
          this.y * myScale +
            this.buttons[i].y * myScale +
            this.buttons[i].height * myScale
      ) {
        this.selectedButton = i;
        break;
      }
    }

    // 画面が押された事の判定
    if (DebugMode == true) {
      let touchSize = 766 / 10;
      for (let i = 0; i < 541; i += touchSize) {
        for (let j = 0; j < 766; j += touchSize) {

          // 背景
          colorMode(RGB, 256);

          //noStroke(); // 線なし
          stroke(100, 100, 100); // 線の色
          strokeWeight(3);  // 線の太さ

          fill(0, 0, 0); // 塗りつぶしの色
          rect(1 + j, 1 + i, touchSize, touchSize);
        }
      }
    }
  }
}

//
// --- Processing ---
//

let originalWidth = 0;
let originalHeight = 0;

let status = 0; // 状態

let p0Image = null;
let p1Image = null;
let p2Image = null;
let p3Image = null;

let myScale = 1.0; // scaleという名前だと怒られた・・

function preload() {
  if (LocalMode == false) {
    p0Image = loadImage("0.PNG");
    p1Image = loadImage("1.PNG");
    p2Image = loadImage("2.PNG");
    p3Image = loadImage("3.PNG");  
  }
}

function setup() {
  // キャンバス作成
  originalWidth = 768.0;
  originalHeight = 1024.0;
  //let cvs = createCanvas(768, 1024);
  
  let cvs = createCanvas(windowWidth, windowHeight);
  cvs.mousePressed(myMousePressed);

  // スケールを設定（アルゴリズム変かも）
  let widthScale = (windowWidth - 20) / originalWidth;
  let heightScale = windowHeight / originalHeight;
  myScale = widthScale;
  if (myScale > heightScale) {
    myScale = heightScale;
  }
  frameRate(10);
  start0();
}

function draw() {
  scale(myScale);

  CommandController.instance.tick();

  switch (status) {
    case 0: // 背景描画とか
      // 初期画面表示
      colorMode(RGB, 256);
      background(255, 255, 255);
      stroke(0,0,0); // 線の色
      strokeWeight(1);
      fill(255, 255, 255); // 塗りつぶし色
      rect(0, 0, originalWidth, originalHeight);
  
      // 開始

      ConsolePanel.instance.print();
      CommandPanel.instance.print();
      
      start1();
      break;
    case 1: // タイトル
      switch (CommandPanel.instance.selectedButton) {
        case 0:
          start2();
          break;
      }
      break;
    case 2: // 置き手紙
      switch (CommandPanel.instance.selectedButton) {
        case 0:
          start4();
          break;
        case 1:
          start3();
          break;
      }
      break;
    case 3: // 天国
      switch (CommandPanel.instance.selectedButton) {
        case 0:
          start1();
          break;
      }
      break;
    case 4: // 地獄
      switch (CommandPanel.instance.selectedButton) {
        case 0:
          start1();
          break;
      }
      break;
  }
}

function myMousePressed() {
  // mousePressed()だとなせかiphoneで動かないときがあるのでこうした
  CommandPanel.instance.updateSelectedButton();
}

function start0() { // setup()から呼ばれるので描画系のメソッドが使えない
  status = 0;  
}

function start1() {
  CommandController.instance.add(new CommandPanelClearCommand());
  CommandController.instance.add(new ImagePanelSetAndShowImage(p0Image, [  0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
                                                                  0, 0, 0, 1, 0, 2, 0, 0, 0, 0,
                                                                  0, 0, 1, 0, 0, 0, 2, 0, 0, 0,
                                                                  0, 1, 0, 0, 0, 0, 0, 2, 0, 0,
                                                                  1, 0, 0, 0, 0, 0, 0, 0, 2, 0,
                                                                  0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
                                                                  0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]));
  CommandController.instance.add(new ConsolePanelCearCommand());
  CommandController.instance.add(
    CommandUtility.getConsoleAddCharsFromTextCommand("天国と地獄")
  );
  CommandController.instance.add(new ConsolePanelAddCharCommand("\n"));
  CommandController.instance.add(
    CommandUtility.getConsoleAddCharsFromTextCommand(
      "開始ボタンを押してください"
    )
  );
  CommandController.instance.add(new CommandPanelAddButtonCommand("開始"));
  CommandController.instance.add(new CommandPanelPrintCommand());

  status = 1;
  CommandPanel.instance.selectedButton = -1;
}

function start2() {
  CommandController.instance.add(new CommandPanelClearCommand());
  CommandController.instance.add(new ImagePanelSetAndShowImage(p1Image, 0));
  CommandController.instance.add(new ConsolePanelCearCommand());
  CommandController.instance.add(
    CommandUtility.getConsoleAddCharsFromTextCommand(
      "家に帰ると置き手紙がありました..."
    )
  );
  CommandController.instance.add(
    CommandUtility.getConsoleAddCharsFromTextCommand("\nどうしますか？")
  );
  CommandController.instance.add(
    new CommandPanelAddButtonCommand("弁護士に相談")
  );
  CommandController.instance.add(
    new CommandPanelAddButtonCommand("まるさんに相談")
  );
  CommandController.instance.add(new CommandPanelPrintCommand());

  status = 2;
  CommandPanel.instance.selectedButton = -1;
}

function start3() {
  CommandController.instance.add(new CommandPanelClearCommand());
  CommandController.instance.add(new ImagePanelSetAndShowImage(p2Image, 0));
  CommandController.instance.add(new ConsolePanelCearCommand());
  CommandController.instance.add(
    CommandUtility.getConsoleAddCharsFromTextCommand("スペースで癒されました!")
  );
  CommandController.instance.add(
    CommandUtility.getConsoleAddCharsFromTextCommand("\nConguraturations!")
  );
  CommandController.instance.add(
    new CommandPanelAddButtonCommand("タイトルに戻る")
  );
  CommandController.instance.add(new CommandPanelPrintCommand());

  status = 3;
  CommandPanel.instance.selectedButton = -1;
}

function start4() {
  CommandController.instance.add(new CommandPanelClearCommand());
  CommandController.instance.add(new ImagePanelSetAndShowImage(p3Image, 0));
  CommandController.instance.add(new ConsolePanelCearCommand());
  CommandController.instance.add(
    CommandUtility.getConsoleAddCharsFromTextCommand("地獄に落ちました")
  );
  CommandController.instance.add(new ConsolePanelAddCharCommand("\n"));
  CommandController.instance.add(
    CommandUtility.getConsoleAddCharsFromTextCommand("ゲームオーバー！")
  );
  CommandController.instance.add(
    new CommandPanelAddButtonCommand("タイトルに戻る")
  );
  CommandController.instance.add(new CommandPanelPrintCommand());

  status = 4;
  CommandPanel.instance.selectedButton = -1;
}
