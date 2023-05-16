import {
  _decorator,
  Component,
  instantiate,
  Node,
  Prefab,
  RigidBody,
  tween,
  Vec3,
} from "cc";
import { PowerBoxManager } from "../Managers/PowerBoxManager";
import { UITransform } from "cc";
const { ccclass, property } = _decorator;

@ccclass("ball")
export class ball extends Component {
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

    let pos = this.node
      .getComponent(UITransform)
      .convertToNodeSpaceAR(this.car.getWorldPosition());
    for (let index = 1; index <= PowerBoxWeapon.Node; index++) {
      let WeaponNode = instantiate(prefab);
      WeaponNode.setPosition(pos.x, pos.y + 1, pos.z);
      this.node.addChild(WeaponNode);
      tween(WeaponNode)
        .to(0.3, {
          position: new Vec3(
            pos.x + this.car.forward.x * index,
            pos.y + 2,
            pos.z + this.car.forward.z * index
          ),
        })
        .call(() => {
          // WeaponNode.getComponent(RigidBody).applyForce(
          //   new Vec3(5, 1, 5),
          //   new Vec3(0, 0, 0)
          // );
          WeaponNode.getComponent(RigidBody).setLinearVelocity(
            new Vec3(this.car.forward.x * 8, 0, this.car.forward.z * 8)
          );
        })
        .start();
      // WeaponNode.getComponent(RigidBody).setLinearVelocity(new Vec3(0, 3, 0));
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
