import { _decorator, Component, Input, input, KeyCode, Node } from "cc";
import { PowerBoxManager } from "../Managers/PowerBoxManager";
const { ccclass, property } = _decorator;

@ccclass("Car")
export class Car extends Component {
  CurrentWeaponInfo = null;
  PowerBoxMng = null;
  start() {
    this.PowerBoxMng = PowerBoxManager.getInstance();
  }

  weaponCheck() {
    this.CurrentWeaponInfo = this.PowerBoxMng.CurrentCarPowerBox;
  }
  update(deltaTime: number) {
    this.weaponCheck();
  }
}
