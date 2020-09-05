import p5 from "p5";
import { CanvasRecorder } from "./CanvasRecorder";

export const withSketchRecording = (
  s: p5,
  element: HTMLElement,
  endFrame: number,
  startFrame: number = 1
) => {
  let recorder: CanvasRecorder;

  const setup = s.setup;
  s.setup = () => {
    setup();
    recorder = new CanvasRecorder(
      element.getElementsByClassName("p5Canvas")[0] as any
    );
  };

  const draw = s.draw;
  s.draw = () => {
    draw();
    if (s.frameCount === startFrame) {
      recorder.start();
    }
    if (s.frameCount === endFrame) {
      recorder.stop();
    }
  };
};
