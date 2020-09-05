import p5 from "p5";
import { CanvasRecorder } from "./CanvasRecorder";
import { cycleByFrame, range, withRepeatRect } from "./utils";

const element = document.getElementById("app")!;

new p5((s: p5) => {
  let recorder: CanvasRecorder;

  s.setup = () => {
    s.createCanvas(400, 400);
    s.background(0);
    s.fill(255);
    s.ellipseMode(s.CENTER);
    recorder = new CanvasRecorder(
      element.getElementsByClassName("p5Canvas")[0] as any
    );
    recorder.start();
  };

  const frameCycle = 300;
  const shapeSize = s.createVector(32, 32);
  const rectSizesInSine = range(frameCycle)
    .map((i) => Math.sin((i / frameCycle) * Math.PI * 2))
    .map((wave) => wave * shapeSize.x /* latitude */);
  s.draw = () => {
    s.rect(0, 0, s.width, s.height);
    withRepeatRect(s, shapeSize, (position) => {
      const rectSize = cycleByFrame(
        s.frameCount + position.x + position.y,
        rectSizesInSine,
        frameCycle
      );
      s.rect(0, 0, rectSize, rectSize);
    });

    if (s.frameCount === 300) {
      s.noLoop();
      recorder.stop();
    }
  };
}, element);
