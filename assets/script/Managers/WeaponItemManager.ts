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
  Missile: Prefab = null;
  @property({ type: Prefab })
  Bomb: Prefab = null;
  @property({ type: Node })
  car = null;
  start() {
    this.PowerBoxMng = PowerBoxManager.getInstance();
  }
  weaponShoot(PowerBoxWeapon) {
    let prefab;

    switch (PowerBoxWeapon.Weapon) {
      case "Gun":
        prefab = this.GunBall;
        break;
      case "Cannon":
        prefab = this.CannonBall;
        break;
      case "Missile":
        prefab = this.Missile;
        break;
      case "Bomb":
        prefab = this.Bomb;
        break;
    }
    let index = 1;
    for (index = 1; index <= PowerBoxWeapon.Node; index++) {
      setTimeout(() => {
        let pos = this.node
          .getComponent(UITransform)
          .convertToNodeSpaceAR(this.car.getWorldPosition());
        let WeaponNode = instantiate(prefab);
        WeaponNode.setPosition(pos.x, pos.y + 0.8, pos.z);
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
    // destoy the weapon after use
    setTimeout(() => {
      //Here i Know that theres only one childern in weaponholder thats why i used children[0]
      if (this.PowerBoxMng.WeaponHolder.children.length > 0)
        this.PowerBoxMng.WeaponHolder.children[0].destroy();
    }, (index - 1) * 300);
  }
  update(deltaTime: number) {
    if (this.PowerBoxMng.WeaponInUsed == true) {
      console.log("WEAPON SHOOT", this.PowerBoxMng.PowerBoxForUse);
      this.weaponShoot(this.PowerBoxMng.PowerBoxForUse);
      this.PowerBoxMng.WeaponInUsed = false;
    }
  }
}
