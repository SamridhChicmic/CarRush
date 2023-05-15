import { _decorator, Component, Label, Node } from "cc";
import { Car } from "./Car";
const { ccclass, property } = _decorator;

@ccclass("DisplayWeapon")
export class DisplayWeapon extends Component {
  @property({ type: Label })
  WeaponName = null;
  @property({ type: Node })
  CarNode = null;
  start() {}
  displayWeaponName() {
    if (this.CarNode.getComponent(Car).CurrentWeaponInfo != null) {
      this.WeaponName.string =
        this.CarNode.getComponent(Car).CurrentWeaponInfo.Weapon;
    } else {
      this.WeaponName.string = "";
    }
  }
  update(deltaTime: number) {
    this.displayWeaponName();
  }
}
