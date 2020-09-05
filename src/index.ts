import p5 from "p5";
import { CanvasRecorder } from "./CanvasRecorder";

const element = document.getElementById("app")!;

new p5((s: p5) => {
  let recorder: CanvasRecorder;

  s.setup = () => {
    s.createCanvas(200, 200);
    s.background(0);
    s.fill(255);
    recorder = new CanvasRecorder(
      element.getElementsByClassName("p5Canvas")[0] as any
    );
    recorder.start();
  };

  s.draw = () => {
    s.rect(Math.random() * 100, Math.random() * 100, 50, 50);

    if (s.frameCount === 500) {
      s.noLoop();
      recorder.stop();
    }
  };
}, element);
