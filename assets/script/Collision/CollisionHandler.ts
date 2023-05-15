import {
  _decorator,
  BoxCollider,
  Component,
  Node,
  Quat,
  RigidBody,
  Vec3,
} from "cc";
import { PowerBoxManager } from "../Managers/PowerBoxManager";
const { ccclass, property } = _decorator;

@ccclass("CollisionHandler")
export class CollisionHandler extends Component {
  @property({ type: Node })
  CarRoot: Node = null;
  @property({ type: Node })
  DeadZonePlan: Node = null;
  CarRigidBody: RigidBody = null;
  CarHeadCollider: BoxCollider = null;
  DeadZoneCollider: BoxCollider = null;
  CheckPointPosition: Vec3 = null;
  CheckPointAngles: Quat = null;
  collisionEnter: boolean = false;
  PowerBoxMng: PowerBoxManager = null;
  start() {
    this.PowerBoxMng = PowerBoxManager.getInstance();
    this.CheckPointPosition = this.CarRoot.getPosition();
    this.CheckPointAngles = this.CarRoot.getRotation();
    let CarCollidersArray = this.CarRoot.getComponents(BoxCollider);
    this.CarRigidBody = this.CarRoot.getComponent(RigidBody);
    this.CarHeadCollider = CarCollidersArray[0];

    this.DeadZoneCollider = this.DeadZonePlan.getComponent(BoxCollider);
    this.CarHeadCollider.on("onCollisionEnter", this.setCollisionBoolean, this);
    this.DeadZoneCollider.on(
      "onCollisionEnter",
      this.setCollisionBoolean,
      this
    );
  }
  setCollisionBoolean() {
    this.collisionEnter = true;
  }
  setPositionAfterCollision() {
    this.PowerBoxMng.CurrentCarPowerBox = null;
    this.CarRoot.setPosition(this.CheckPointPosition);
    this.CarRoot.setRotation(this.CheckPointAngles);
    this.collisionEnter = false;
  }
  update(deltaTime: number) {
    if (this.CarRigidBody.isSleeping == true && this.collisionEnter == true) {
      this.setPositionAfterCollision();
    }
  }
}
