import {
  _decorator,
  BoxCollider,
  Component,
  instantiate,
  Node,
  Prefab,
} from "cc";
import { PowerBox } from "../GroundItem/PowerBox";
import { PowerBoxManager } from "../Managers/PowerBoxManager";
import { Car } from "../Car/Car";
const { ccclass, property } = _decorator;

@ccclass("PowerCollider")
export class PowerCollider extends Component {
  @property({ type: Prefab })
  WeaponBox: Prefab[] = [];
  PowerBoxTrigger: BoxCollider = null;
  PowerBoxMng: PowerBoxManager = null;
  start() {
    this.PowerBoxMng = PowerBoxManager.getInstance();
    this.PowerBoxTrigger = this.node.getComponent(BoxCollider);
    this.PowerBoxTrigger.on(
      "onTriggerEnter",
      (EventType) => {
        if (
          this.PowerBoxMng.CurrentCarPowerBox == null &&
          EventType.otherCollider.name == "RootNode<BoxCollider>"
        ) {
          this.node.destroy();
          this.PowerBoxMng.CurrentCarPowerBox =
            this.node.getComponent(PowerBox).PowerBoxInfo;
          this.PowerBoxMng.JsonPositionArray[
            this.node.getComponent(PowerBox).PositionTrack
          ].placed = false;
          let weapon = this.prefabDecider(this.PowerBoxMng.CurrentCarPowerBox);
          this.PowerBoxMng.WeaponHolder.addChild(instantiate(weapon));
        } else {
          console.log("ALreay Have Weapons");
        }
      },

      this
    );
  }
  prefabDecider(PowerBoxWeapon) {
    let prefab;

    switch (PowerBoxWeapon.Weapon) {
      case "Gun":
        prefab = this.WeaponBox[0];
        break;
      case "Cannon":
        prefab = this.WeaponBox[1];
        break;
      case "Missile":
        prefab = this.WeaponBox[2];
        break;
      case "Bomb":
        prefab = this.WeaponBox[3];
        break;
    }
    return prefab;
  }
  update(deltaTime: number) {}
}
