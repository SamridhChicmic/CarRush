import {
  _decorator,
  Component,
  instantiate,
  Node,
  Prefab,
  RigidBody,
  UITransform,
  Vec3,
} from "cc";
import { PowerBoxManager } from "./PowerBoxManager";
const { ccclass, property } = _decorator;

@ccclass("WeaponItemManager")
export class WeaponItemManager extends Component {
  PowerBoxMng: PowerBoxManager = null;
  @property({ type: Prefab })
  GunBall: Prefab = null;
  @property({ type: Prefab })
  CannonBall: Prefab = null;
  @property({ type: Prefab })
  Knife: Prefab = null;
  @property({ type: Prefab })
  Bomb: Prefab = null;
  @property({ type: Node })
  car = null;
  start() {
    this.PowerBoxMng = PowerBoxManager.getInstance();
  }
  addbullets(PowerBoxWeapon) {
    let prefab;

    switch (PowerBoxWeapon.Weapon) {
      case "Gun":
        prefab = this.GunBall;
        break;
      case "Cannon":
        prefab = this.CannonBall;
        break;
      case "Knife":
        prefab = this.Knife;
        break;
      case "Bomb":
        prefab = this.Bomb;
        break;
    }

    for (let index = 1; index <= PowerBoxWeapon.Node; index++) {
      setTimeout(() => {
        let pos = this.node
          .getComponent(UITransform)
          .convertToNodeSpaceAR(this.car.getWorldPosition());
        let WeaponNode = instantiate(prefab);
        WeaponNode.setPosition(pos.x, pos.y + 1, pos.z);
        this.node.addChild(WeaponNode);
        WeaponNode.getComponent(RigidBody).setLinearVelocity(
          new Vec3(
            this.car.forward.x * PowerBoxWeapon.Velocity,
            0,
            this.car.forward.z * PowerBoxWeapon.Velocity
          )
        );
      }, index * 300);
    }
  }
  update(deltaTime: number) {
    if (this.PowerBoxMng.WeaponInUsed == true) {
      console.log("WEAPON SHOOT", this.PowerBoxMng.PowerBoxForUse);
      this.addbullets(this.PowerBoxMng.PowerBoxForUse);
      this.PowerBoxMng.WeaponInUsed = false;
    }
  }
}
