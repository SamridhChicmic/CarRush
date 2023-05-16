import { _decorator, Component, Node, SphereCollider, tween, Vec3 } from "cc";
const { ccclass, property } = _decorator;

@ccclass("CannonBallScript")
export class CannonBallScript extends Component {
  CannonBallCollider: SphereCollider = null;
  
  start() {
   
    this.CannonBallCollider = this.node.getComponent(SphereCollider);
    this.CannonBallCollider.on(
      "onCollisionStay",
      (EventType) => {
        console.log(EventType.otherCollider.name);
        if (EventType.otherCollider.name != "CannonBall<SphereCollider>") {
          console.log("Cannon Ball Destroy");

          this.node.destroy();
        }
      },
      this
    );
  }

  update(deltaTime: number) {
    
  }
}
