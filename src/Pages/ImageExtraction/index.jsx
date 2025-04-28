import React, { useRef, useState, useEffect } from 'react';

const DEFAULT_IMAGE = 'https://via.placeholder.com/600x400.png?text=Default+Image';

export default function ImageExtraction() {
  const canvasRef = useRef(null);
  const selectionCanvasRef = useRef(null);
  const imgRef = useRef(new Image());

  const [imageSrc, setImageSrc] = useState(DEFAULT_IMAGE);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });
  const [selection, setSelection] = useState(null); // {x, y, width, height}
  const [croppedDataUrl, setCroppedDataUrl] = useState(null);

  // Load image and draw on canvas whenever imageSrc changes
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = imgRef.current;

    img.onload = () => {
      // Resize canvas to image size
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      // Clear previous selection
      setSelection(null);
      setCroppedDataUrl(null);
    };
    img.src = imageSrc;
  }, [imageSrc]);

  // Draw selection rectangle on canvas
  useEffect(() => {
    if (!selection) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = imgRef.current;

    // Redraw image first
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);

    // Draw semi-transparent selection rectangle
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
    ctx.strokeRect(selection.x, selection.y, selection.width, selection.height);
    ctx.fillRect(selection.x, selection.y, selection.width, selection.height);
  }, [selection]);

  // Mouse event handlers
  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    setStartPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setCurrentPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const rect = canvasRef.current.getBoundingClientRect();
    setCurrentPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    // Update selection rectangle dynamically
    const x = Math.min(startPos.x, e.clientX - rect.left);
    const y = Math.min(startPos.y, e.clientY - rect.top);
    const width = Math.abs(startPos.x - (e.clientX - rect.left));
    const height = Math.abs(startPos.y - (e.clientY - rect.top));
    setSelection({ x, y, width, height });
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (!selection || selection.width === 0 || selection.height === 0) {
      setSelection(null);
      return;
    }

    // Extract selected portion
    const canvas = canvasRef.current;
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');

    tempCanvas.width = selection.width;
    tempCanvas.height = selection.height;

    // Draw the selected portion from the main canvas to temp canvas
    tempCtx.drawImage(
      canvas,
      selection.x,
      selection.y,
      selection.width,
      selection.height,
      0,
      0,
      selection.width,
      selection.height
    );

    // Get data URL of cropped image
    const dataUrl = tempCanvas.toDataURL();
    setCroppedDataUrl(dataUrl);
  };

  // Handle file input change to load new image
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImageSrc(ev.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
      <h2>Image Selection and Extraction Using Canvas</h2>

      <input type="file" accept="image/*" onChange={handleFileChange} />
      <p>Drag on the image below to select a rectangular area.</p>

      <canvas
        ref={canvasRef}
        style={{ border: '1px solid #ccc', cursor: 'crosshair', maxWidth: '100%' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />

      {croppedDataUrl && (
        <div style={{ marginTop: 20 }}>
          <h3>Cropped Image:</h3>
          <img
            src={croppedDataUrl}
            alt="Cropped selection"
            style={{ border: '1px solid #ccc', maxWidth: '100%' }}
          />
        </div>
      )}
    </div>
  );
}
