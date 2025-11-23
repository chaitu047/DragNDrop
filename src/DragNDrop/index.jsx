import { useRef, useState } from "react";
import data from "../data";
export default function DragNDrop() {
  const [tasks, setTasks] = useState(data);
  const draggableItemRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (container) => {
    setTasks((prev) => {
      const clonePrev = JSON.parse(JSON.stringify(prev));
      if (draggableItemRef.current != null) {
        prev[container] = [...prev[container], draggableItemRef.current.value];
        prev[draggableItemRef.current.initContainer] = prev[
          draggableItemRef.current.initContainer
        ].filter((val) => val != draggableItemRef.current.value);
      }
      draggableItemRef.current = null;
      return clonePrev;
    });
  };

  const handleDragStart = (val, initContainer) => {
    draggableItemRef.current = { value: val, initContainer: initContainer };
  };

  return (
    <div className="dragndrop-container">
      <div
        className="item-container"
        onDragOver={handleDragOver}
        onDrop={() => handleDrop("todo")}
      >
        <h4>To Do</h4>
        {tasks.todo.map((val, ind) => {
          return (
            <div
              className="item"
              draggable
              onDragStart={() => handleDragStart(val, "todo")}
              key={`${val}-${ind}`}
            >
              {val}
            </div>
          );
        })}
      </div>
      <div
        className="item-container"
        onDragOver={handleDragOver}
        onDrop={() => handleDrop("inProgress")}
      >
        <h4>In Progress</h4>
        {tasks.inProgress.map((val, ind) => {
          return (
            <div
              className="item"
              onDragStart={() => handleDragStart(val, "inProgress")}
              draggable
              key={`${val}-${ind}`}
            >
              {val}
            </div>
          );
        })}
      </div>
      <div
        className="item-container"
        onDragOver={handleDragOver}
        onDrop={() => handleDrop("completed")}
      >
        <h4>Completed</h4>
        {tasks.completed.map((val, ind) => {
          return (
            <div
              className="item"
              onDragStart={() => handleDragStart(val, "completed")}
              draggable
              key={`${val}-${ind}`}
            >
              {val}
            </div>
          );
        })}
      </div>
    </div>
  );
}
