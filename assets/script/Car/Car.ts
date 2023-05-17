import { _decorator, Component, Input, input, KeyCode, Node, Prefab } from "cc";
import { PowerBoxManager } from "../Managers/PowerBoxManager";
const { ccclass, property } = _decorator;

@ccclass("Car")
export class Car extends Component {
  @property({ type: Node })
  WeaponHolder: Node = null;
  CurrentWeaponInfo = null;
  PowerBoxMng = null;
  start() {
    this.PowerBoxMng = PowerBoxManager.getInstance();
    this.PowerBoxMng.WeaponHolder = this.WeaponHolder;
  }

  weaponCheck() {
    this.CurrentWeaponInfo = this.PowerBoxMng.CurrentCarPowerBox;
  }
  update(deltaTime: number) {
    this.weaponCheck();
  }
}
