namespace App {
  type DragEventHandler = (event: DragEvent) => void;

  export interface Draggable {
    dragStartHandler: DragEventHandler;
    dragEndHandler: DragEventHandler;
  }

  export interface DragTarget {
    dragOverHandler: DragEventHandler;
    dropHandler: DragEventHandler;
    dragLeaveHandler: DragEventHandler;
  }
}