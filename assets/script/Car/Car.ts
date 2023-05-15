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
  useWeapon(EventType) {
    if (EventType.KeyCode == KeyCode.SPACE && this.CurrentWeaponInfo != null) {
      console.log("WeaponUsed");
      this.CurrentWeaponInfo = null;
      this.PowerBoxMng.CurrentCarPowerBox = null;
    } else if (
      EventType.KeyCode == KeyCode.SPACE &&
      this.CurrentWeaponInfo == null
    ) {
      console.log("No Weapon");
    }
  }
  weaponCheck() {
    if (this.CurrentWeaponInfo == null) {
      this.CurrentWeaponInfo = this.PowerBoxMng.CurrentCarPowerBox;
    }
  }
  update(deltaTime: number) {
    this.weaponCheck();
  }
}
