import { _decorator, BoxCollider, Component, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("PowerCollider")
export class PowerCollider extends Component {
  PowerBoxTrigger: BoxCollider = null;
  start() {
    this.PowerBoxTrigger = this.node.getComponent(BoxCollider);
    this.PowerBoxTrigger.on(
      "onTriggerEnter",
      () => {
        this.node.destroy();
      },
      this
    );
  }

  update(deltaTime: number) {}
}
