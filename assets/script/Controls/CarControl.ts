import {
  _decorator,
  CCFloat,
  Component,
  Input,
  input,
  KeyCode,
  Node,
  RigidBody,
  Vec3,
} from "cc";
import { Car } from "../Car/Car";
import { PowerBoxManager } from "../Managers/PowerBoxManager";
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
  turn: number = 1.5;
  PowerBoxMng: PowerBoxManager = null;
  start() {
    this.PowerBoxMng = PowerBoxManager.getInstance();
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
    switch (EventType.keyCode) {
      case KeyCode.KEY_W:
      case KeyCode.ARROW_UP:
        this.keyUp = true;

        break;
      case KeyCode.KEY_S:
      case KeyCode.ARROW_DOWN:
        this.keyDown = true;

        break;
      case KeyCode.KEY_D:
      case KeyCode.ARROW_RIGHT:
        this.keyRight = true;
        break;
      case KeyCode.KEY_A:
      case KeyCode.ARROW_LEFT:
        this.keyLeft = true;
        break;
      case KeyCode.SPACE:
        this.useWeapon();
        break;
    }
  }
  useWeapon() {
    if (this.node.getComponent(Car).CurrentWeaponInfo != null && this.PowerBoxMng.WeaponInUsed==false) {
      console.log("Weapon Used");
      // //Here i Know that theres only one childern in weaponholder that why i used children[0]
      // this.PowerBoxMng.WeaponHolder.children[0].destroy();
      this.PowerBoxMng.WeaponInUsed = true;
      this.PowerBoxMng.PowerBoxForUse = this.PowerBoxMng.CurrentCarPowerBox;
      ///----->>>>>   this.PowerBoxMng.CurrentCarPowerBox = null;
    } else {
      console.log("No weapon");
    }
  }
  moveLeft(deltaTime) {
    let NodeEularAngle = this.CarRoot.eulerAngles;
    this.CarRoot.eulerAngles = new Vec3(
      NodeEularAngle.x,
      NodeEularAngle.y + this.turn,
      NodeEularAngle.z
    );
  }
  moveRight(deltaTime) {
    let NodeEularAngle = this.CarRoot.eulerAngles;
    this.CarRoot.eulerAngles = new Vec3(
      NodeEularAngle.x,
      NodeEularAngle.y - this.turn,
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
