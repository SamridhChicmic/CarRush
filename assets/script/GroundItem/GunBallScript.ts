import { _decorator, Component, Node, SphereCollider } from "cc";
const { ccclass, property } = _decorator;

@ccclass("GunBallScript")
export class GunBallScript extends Component {
  BallCollider: SphereCollider = null;
  start() {
    this.BallCollider = this.node.getComponent(SphereCollider);
    this.BallCollider.on(
      "onCollisionEnter",
      (EventType) => {
        if (EventType.otherCollider.name != "GunBall<SphereCollider>") {
          this.node.destroy();
        }
      },
      this
    );
  }

  update(deltaTime: number) {}
}
