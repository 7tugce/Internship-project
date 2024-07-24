import React, { useState } from 'react';
import { Stage, Layer, Line, Rect, Circle, Ellipse, Arrow } from 'react-konva';
import "./Sketch.css"
const Sketch = () => {
  const [tool, setTool] = useState('pencil');
  const [lines, setLines] = useState([]);
  const [shapes, setShapes] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('black');
  const [shapeSize, setShapeSize] = useState(5);
  const [eraserSize, setEraserSize] = useState(10);
  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const handleMouseDown = (e) => {
    const pos = e.target.getStage().getPointerPosition();
    setIsDrawing(true);

    const currentColor = tool === 'eraser' ? 'white' : color;
    const currentSize = tool === 'eraser' ? eraserSize : shapeSize;

    if (tool === 'pencil' || tool === 'eraser') {
      setLines((prevLines) => [...prevLines, { tool, color: currentColor, size: currentSize, points: [pos.x, pos.y] }]);
    } else {
      setShapes((prevShapes) => [...prevShapes, { tool, color: currentColor, size: currentSize, x: pos.x, y: pos.y, width: 0, height: 0, radius: 0, points: [pos.x, pos.y], sides: 3 }]);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    let lastShape = shapes[shapes.length - 1];

    if (tool === 'pencil' || tool === 'eraser') {
      lastLine.points = lastLine.points.concat([point.x, point.y]);
      lines.splice(lines.length - 1, 1, lastLine);
      setLines(lines.concat());

      if (tool === 'eraser') {
        // Silgi çizgisinin herhangi bir şekille kesişip kesişmediğini kontrol et
        const newShapes = shapes.filter(shape => !isErased(shape, lastLine, eraserSize));
        setShapes(newShapes);
      }
    } else if (tool === 'rectangle') {
      lastShape.width = point.x - lastShape.x;
      lastShape.height = point.y - lastShape.y;
      shapes.splice(shapes.length - 1, 1, lastShape);
      setShapes(shapes.concat());
    } else if (tool === 'square') {
      const size = Math.max(Math.abs(point.x - lastShape.x), Math.abs(point.y - lastShape.y));
      lastShape.width = size;
      lastShape.height = size;
      shapes.splice(shapes.length - 1, 1, lastShape);
      setShapes(shapes.concat());
    } else if (tool === 'circle') {
      lastShape.radius = Math.sqrt((point.x - lastShape.x) ** 2 + (point.y - lastShape.y) ** 2);
      shapes.splice(shapes.length - 1, 1, lastShape);
      setShapes(shapes.concat());
    } else if (tool === 'ellipse') {
      lastShape.width = Math.abs(point.x - lastShape.x);
      lastShape.height = Math.abs(point.y - lastShape.y);
      shapes.splice(shapes.length - 1, 1, lastShape);
      setShapes(shapes.concat());
    } else if (tool === 'triangle') {
      lastShape.width = point.x - lastShape.x;
      lastShape.height = point.y - lastShape.y;
      shapes.splice(shapes.length - 1, 1, lastShape);
      setShapes(shapes.concat());
    } else if (tool === 'arrow') {
      lastShape.points = [lastShape.x, lastShape.y, point.x, point.y];
      shapes.splice(shapes.length - 1, 1, lastShape);
      setShapes(shapes.concat());
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    setHistory((prevHistory) => [...prevHistory, { lines: [...lines], shapes: [...shapes] }]);
    setRedoStack([]); // Clear the redo stack when a new action is taken
  };

  const isErased = (shape, line, eraserSize) => {
    const [x1, y1, x2, y2] = line.points;

    if (shape.tool === 'rectangle' || shape.tool === 'square') {
      return (
        intersectRect(x1, y1, x2, y2, shape.x, shape.y, shape.width, shape.height)
      );
    } else if (shape.tool === 'circle' || shape.tool === 'ellipse') {
      return (
        intersectCircle(shape.x, shape.y, shape.radius || shape.width / 2, x1, y1, eraserSize) ||
        intersectCircle(shape.x, shape.y, shape.radius || shape.width / 2, x2, y2, eraserSize)
      );
    } else if (shape.tool === 'triangle') {
      const points = [
        [shape.x, shape.y],
        [shape.x + shape.width, shape.y],
        [shape.x + shape.width / 2, shape.y - shape.height]
      ];
      return points.some(([px, py]) => (
        intersectPoint(px, py, x1, y1, x2, y2, eraserSize)
      ));
    } else if (shape.tool === 'arrow') {
      return (
        intersectPoint(shape.points[0], shape.points[1], x1, y1, x2, y2, eraserSize) ||
        intersectPoint(shape.points[2], shape.points[3], x1, y1, x2, y2, eraserSize)
      );
    }
    return false;
  };

  const intersectRect = (x1, y1, x2, y2, rx, ry, rw, rh) => {
    return !(x2 < rx || x1 > rx + rw || y2 < ry || y1 > ry + rh);
  };

  const intersectCircle = (cx, cy, r, x, y, eraserSize) => {
    const dist = Math.sqrt((cx - x) ** 2 + (cy - y) ** 2);
    return dist <= r + eraserSize / 2;
  };

  const intersectPoint = (px, py, x1, y1, x2, y2, eraserSize) => {
    const dist1 = Math.sqrt((px - x1) ** 2 + (py - y1) ** 2);
    const dist2 = Math.sqrt((px - x2) ** 2 + (py - y2) ** 2);
    return dist1 <= eraserSize / 2 || dist2 <= eraserSize / 2;
  };

  const handleUndo = () => {
    if (history.length === 0) return;

    const lastState = history[history.length - 1];
    setRedoStack((prevRedoStack) => [lastState, ...prevRedoStack]);
    setHistory((prevHistory) => prevHistory.slice(0, -1));

    setLines(lastState.lines);
    setShapes(lastState.shapes);
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;

    const nextState = redoStack[0];
    setHistory((prevHistory) => [...prevHistory, nextState]);
    setRedoStack((prevRedoStack) => prevRedoStack.slice(1));

    setLines(nextState.lines);
    setShapes(nextState.shapes);
  };

  return (
    <div>
      <div className='toolbar-section'>
        <button onClick={() => setTool('pencil')}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 64 64"><path fill="#ee4237" d="M1.979 13.832L16.698 2.885l32.316 43.45l-14.719 10.947z"/><path fill="#da4241" d="m1.976 13.841l5.112-3.803L39.41 53.483l-5.112 3.803zm10.611-7.898l4.117-3.06l32.3 43.461l-4.117 3.06z"/><path fill="#e58732" d="m41.655 51.81l7.355-5.47l.788 8.75l.798 8.738l-8.146-3.278l-8.15-3.27z"/><path fill="#ea97bd" d="M15.784 1.668c1.32 1.768.81 4.376-1.137 5.824l-7.673 5.706c-1.945 1.452-4.588 1.185-5.906-.583c-1.32-1.772-.809-4.38 1.137-5.824l7.673-5.71c1.945-1.447 4.59-1.185 5.906.587"/><path fill="#bcbdbf" d="M2.893 15.07L17.61 4.127l1.116 1.501L4.009 16.571z"/><path fill="#e7e6e6" d="M19.843 7.122L5.128 18.07L4.01 16.569L18.726 5.626zM1.777 13.569L16.496 2.622l1.116 1.5L2.893 15.07z"/><path fill="#f79420" d="m47.4 57.61l-.842.63l-7.148-4.76l5.49-4.08z"/><path fill="#424143" d="m42.05 60.39l.4.16l8.15 3.273l-.794-8.743l-.042-.427z"/></svg></button>
        <button onClick={() => setTool('rectangle')}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><path fill="#000000" d="M36 416h440a20.023 20.023 0 0 0 20-20V116a20.023 20.023 0 0 0-20-20H36a20.023 20.023 0 0 0-20 20v280a20.023 20.023 0 0 0 20 20m12-288h416v256H48Z"/></svg></button>
        <button onClick={() => setTool('square')}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256"><path fill="#000000" d="M208 34H48a14 14 0 0 0-14 14v160a14 14 0 0 0 14 14h160a14 14 0 0 0 14-14V48a14 14 0 0 0-14-14m2 174a2 2 0 0 1-2 2H48a2 2 0 0 1-2-2V48a2 2 0 0 1 2-2h160a2 2 0 0 1 2 2Z"/></svg></button>
        <button onClick={() => setTool('circle')}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" color="#000000"/></svg></button>
        <button onClick={() => setTool('ellipse')}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 2048 2048"><path fill="#000000" d="M1024 256q131 0 268 27t264 85t233 144t175 206q41 71 62 147t22 159q0 82-21 158t-63 148q-68 119-174 206t-233 144t-264 84t-269 28q-131 0-268-27t-264-85t-233-144t-175-206q-41-71-62-147T0 1024q0-82 21-158t63-148q68-119 174-206t233-144t264-84t269-28m0 1408q84 0 169-11t167-36t159-60t146-87q54-40 101-88t81-105t53-120t20-133q0-70-19-133t-54-119t-81-105t-101-89q-68-50-145-86t-160-61t-167-35t-169-12q-84 0-169 11t-167 36t-159 60t-146 87q-54 40-101 88t-81 105t-53 120t-20 133q0 70 19 133t54 119t81 105t101 89q68 50 145 86t160 61t167 35t169 12"/></svg></button>
        <button onClick={() => setTool('triangle')}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256"><path fill="#000000" d="M235.07 189.09L147.61 37.22a22.75 22.75 0 0 0-39.22 0L20.93 189.09a21.53 21.53 0 0 0 0 21.72A22.35 22.35 0 0 0 40.55 222h174.9a22.35 22.35 0 0 0 19.6-11.19a21.53 21.53 0 0 0 .02-21.72m-10.41 15.71a10.46 10.46 0 0 1-9.21 5.2H40.55a10.46 10.46 0 0 1-9.21-5.2a9.49 9.49 0 0 1 0-9.72l87.45-151.87a10.75 10.75 0 0 1 18.42 0l87.46 151.87a9.49 9.49 0 0 1-.01 9.72"/></svg></button>
        <button onClick={() => setTool('arrow')}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 15 15"><path fill="#000000" d="m7.5 1.5l.354-.354L7.5.793l-.354.353zm-.354.354l4 4l.708-.708l-4-4zm0-.708l-4 4l.708.708l4-4zM7 1.5V14h1V1.5z"/></svg></button>
        <button onClick={() => setTool('eraser')}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 21l-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21m9 0H7M5 11l9 9"/></svg></button>
        <input type="color" onChange={(e) => setColor(e.target.value)} value={color} />
        {tool !== 'eraser' && (
          <input
            type="number"
            onChange={(e) => setShapeSize(parseInt(e.target.value, 10))}
            value={shapeSize}
            min="1"
            max="100"
            style={{ width: '50px' }}
          />
        )}
        {tool === 'eraser' && (
          <input
            type="number"
            onChange={(e) => setEraserSize(parseInt(e.target.value, 10))}
            value={eraserSize}
            min="1"
            max="100"
            style={{ width: '50px' }}
          />
        )}
        <button onClick={handleUndo}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="#000000" d="M8.06.56A8.05 8.05 0 0 0 1.24 4.2V1.55H0V5a1.16 1.16 0 0 0 1.15 1.14h3.44V4.9H2.27a6.79 6.79 0 0 1 5.79-3.1a6.48 6.48 0 0 1 6.7 6.2a6.48 6.48 0 0 1-6.7 6.2A6.48 6.48 0 0 1 1.36 8H.12a7.71 7.71 0 0 0 7.94 7.44A7.71 7.71 0 0 0 16 8A7.71 7.71 0 0 0 8.06.56"/></svg></button>
        <button onClick={handleRedo}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="#000000" d="M7.94.56a8.05 8.05 0 0 1 6.82 3.64V1.55H16V5a1.16 1.16 0 0 1-1.15 1.15h-3.44V4.9h2.32a6.79 6.79 0 0 0-5.79-3.1A6.48 6.48 0 0 0 1.24 8a6.48 6.48 0 0 0 6.7 6.2a6.48 6.48 0 0 0 6.7-6.2h1.24a7.71 7.71 0 0 1-7.94 7.44A7.71 7.71 0 0 1 0 8A7.71 7.71 0 0 1 7.94.56"/></svg></button>
      </div>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <Layer>
          {lines.map((line, i) => (
            <Line key={i} points={line.points} stroke={line.color} strokeWidth={line.size} tension={0.5} lineCap="round" />
          ))}
          {shapes.map((shape, i) => {
            const currentColor = shape.tool === 'eraser' ? 'white' : shape.color;
            const currentSize = shape.tool === 'eraser' ? eraserSize : shape.size;

            if (shape.tool === 'rectangle' || shape.tool === 'square') {
              return <Rect key={i} x={shape.x} y={shape.y} width={shape.width} height={shape.height} stroke={currentColor} strokeWidth={currentSize} />;
            } else if (shape.tool === 'circle') {
              return <Circle key={i} x={shape.x} y={shape.y} radius={shape.radius} stroke={currentColor} strokeWidth={currentSize} />;
            } else if (shape.tool === 'ellipse') {
              return <Ellipse key={i} x={shape.x} y={shape.y} width={shape.width} height={shape.height} stroke={currentColor} strokeWidth={currentSize} />;
            } else if (shape.tool === 'triangle') {
              const points = [
                shape.x, shape.y,
                shape.x + shape.width, shape.y,
                shape.x + shape.width / 2, shape.y - shape.height,
              ];
              return <Line key={i} points={points} closed stroke={currentColor} strokeWidth={currentSize} />;
            } else if (shape.tool === 'arrow') {
              return <Arrow key={i} points={shape.points} stroke={currentColor} strokeWidth={currentSize} />;
            }
            return null;
          })}
        </Layer>
      </Stage>
      <button className='save-btn'>Kaydet</button>
    </div>
  );
};

export default Sketch;
