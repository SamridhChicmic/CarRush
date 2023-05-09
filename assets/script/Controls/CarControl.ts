import {
  _decorator,
  CCFloat,
  Component,
  Input,
  input,
  KeyCode,
  Node,
  Vec3,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("CarControl")
export class CarControl extends Component {
  @property({ type: CCFloat, tooltip: "Speed of car" })
  speed = 15;
  @property({ type: Node })
  CarRoot: Node = null;
  keyUp: boolean = false;
  keyDown: boolean = false;
  keyLeft: boolean = false;
  keyRight: boolean = false;
  start() {
    this.registerEvents();
  }
  registerEvents() {
    input.on(Input.EventType.KEY_DOWN, this.keyControl, this);
    input.on(Input.EventType.KEY_PRESSING, this.keyControl, this);
    input.on(Input.EventType.KEY_UP, this.keyRelease, this);
  }
  keyRelease(EventType) {
    switch (EventType.keyCode) {
      case KeyCode.KEY_W:
      case KeyCode.ARROW_UP:
        this.keyUp = false;

        break;
      case KeyCode.KEY_S:
      case KeyCode.ARROW_DOWN:
        this.keyDown = false;

        break;
      case KeyCode.KEY_D:
      case KeyCode.ARROW_RIGHT:
        this.keyRight = false;
        break;
      case KeyCode.KEY_A:
      case KeyCode.ARROW_LEFT:
        this.keyLeft = false;
        break;
    }
  }
  keyControl(EventType) {
    //console.log("Type..", EventType.keyCode);
    switch (EventType.keyCode) {
      case KeyCode.KEY_W:
      case KeyCode.ARROW_UP:
        this.keyUp = true;
        console.log("Forword");

        break;
      case KeyCode.KEY_S:
      case KeyCode.ARROW_DOWN:
        console.log("BackWord");
        this.keyDown = true;

        break;
      case KeyCode.KEY_D:
      case KeyCode.ARROW_RIGHT:
        console.log("Right");
        this.keyRight = true;
        break;
      case KeyCode.KEY_A:
      case KeyCode.ARROW_LEFT:
        console.log("Left");
        this.keyLeft = true;
        break;
    }
  }
  moveLeft(deltaTime) {
    let NodeEularAngle = this.CarRoot.eulerAngles;
    this.CarRoot.eulerAngles = new Vec3(
      NodeEularAngle.x,
      NodeEularAngle.y + 0.5,
      NodeEularAngle.z
    );
  }
  moveRight(deltaTime) {
    let NodeEularAngle = this.CarRoot.eulerAngles;
    this.CarRoot.eulerAngles = new Vec3(
      NodeEularAngle.x,
      NodeEularAngle.y - 0.5,
      NodeEularAngle.z
    );
  }
  moveForword(deltaTime) {
    let DestinationPos = new Vec3();
    DestinationPos.x =
      this.CarRoot.getPosition().x +
      this.CarRoot.forward.x * deltaTime * this.speed;
    DestinationPos.y =
      this.CarRoot.getPosition().y +
      this.CarRoot.forward.y * deltaTime * this.speed;
    DestinationPos.z =
      this.CarRoot.getPosition().z +
      this.CarRoot.forward.z * deltaTime * this.speed;
    this.CarRoot.setPosition(DestinationPos);
  }
  moveBackword(deltaTime) {
    let DestinationPos = new Vec3();
    DestinationPos.x =
      this.CarRoot.getPosition().x -
      this.CarRoot.forward.x * deltaTime * this.speed;
    DestinationPos.y =
      this.CarRoot.getPosition().y -
      this.CarRoot.forward.y * deltaTime * this.speed;
    DestinationPos.z =
      this.CarRoot.getPosition().z -
      this.CarRoot.forward.z * deltaTime * this.speed;
    this.CarRoot.setPosition(DestinationPos);
  }
  update(deltaTime: number) {
    if (this.keyUp == true) this.moveForword(deltaTime);
    if (this.keyDown == true) this.moveBackword(deltaTime);
    if (this.keyLeft == true) this.moveLeft(deltaTime);
    if (this.keyRight == true) this.moveRight(deltaTime);
  }
}
