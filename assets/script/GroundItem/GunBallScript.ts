import { _decorator, Component, Node, SphereCollider } from "cc";
const { ccclass, property } = _decorator;

@ccclass("GunBallScript")
export class GunBallScript extends Component {
  BallCollider: SphereCollider = null;
  start() {
    this.BallCollider = this.node.getComponent(SphereCollider);
    this.BallCollider.on(
      "onCollisionStay",
      (EventType) => {
        console.log(EventType.otherCollider.name);
        if (EventType.otherCollider.name != "GunBall<SphereCollider>") {
          console.log("Gun Ball Destroy");

          this.node.destroy();
        }
      },
      this
    );
  }

  update(deltaTime: number) {}
}
