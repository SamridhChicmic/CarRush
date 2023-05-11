import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Car")
export class Car extends Component {
  CurrentWeaponInfo = null;
  start() {}
  setCurrentWeaponInfo(info) {
    if (this.CurrentWeaponInfo == null) {
      this.CurrentWeaponInfo = info;
    } else {
      console.log("Already Have Weapon", this.CurrentWeaponInfo);
    }
  }
  update(deltaTime: number) {}
}
