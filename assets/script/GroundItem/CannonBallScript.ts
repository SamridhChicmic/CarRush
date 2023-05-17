import { _decorator, Component, Node, SphereCollider, tween, Vec3 } from "cc";
const { ccclass, property } = _decorator;

@ccclass("CannonBallScript")
export class CannonBallScript extends Component {
  CannonBallCollider: SphereCollider = null;

  start() {
    this.CannonBallCollider = this.node.getComponent(SphereCollider);
    this.CannonBallCollider.on(
      "onCollisionEnter",
      (EventType) => {
        if (EventType.otherCollider.name != "CannonBall<SphereCollider>") {
          this.node.destroy();
        }
      },
      this
    );
  }

  update(deltaTime: number) {}
}
