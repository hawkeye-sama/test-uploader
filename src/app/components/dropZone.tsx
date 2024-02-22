import React, { ReactNode, memo, useCallback, useEffect } from "react";

// Define interface for component props/api:
interface DropZoneProps {
  onDragStateChange?: (isDragActive: boolean) => void;
  onDrag?: () => void;
  onDragIn?: () => void;
  onDragOut?: () => void;
  onDrop?: () => void;
  onFilesDrop?: (files: File[]) => void;
  className?: string;
  children: ReactNode;
}

function DropZone({
  onDragStateChange = undefined,
  onFilesDrop = undefined,
  onDrag = undefined,
  onDragIn = undefined,
  onDragOut = undefined,
  onDrop = undefined,
  className = undefined,
  children,
}: DropZoneProps) {
  // Create state to keep track when dropzone is active/non-active:
  const [isDragActive, setIsDragActive] = React.useState(false);
  // Prepare ref for dropzone element:
  const dropZoneRef = React.useRef<null | HTMLDivElement>(null);

  // Create helper method to map file list to array of files:
  const mapFileListToArray = (files: FileList) => {
    const array = [];

    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file) {
        array.push(file);
      }
    }

    return array;
  };

  // Create handler for dragenter event:
  const handleDragIn = useCallback(
    (event: DragEvent) => {
      event.preventDefault();
      event.stopPropagation();
      onDragIn?.();

      if (event?.dataTransfer?.items && event.dataTransfer.items.length > 0) {
        setIsDragActive(true);
      }
    },
    [onDragIn],
  );

  // Create handler for dragleave event:
  const handleDragOut = useCallback(
    (event: DragEvent) => {
      event.preventDefault();
      event.stopPropagation();
      onDragOut?.();

      setIsDragActive(false);
    },
    [onDragOut],
  );

  // Create handler for dragover event:
  const handleDrag = useCallback(
    (event: DragEvent) => {
      event.preventDefault();
      event.stopPropagation();

      onDrag?.();
      if (!isDragActive) {
        setIsDragActive(true);
      }
    },
    [isDragActive, onDrag],
  );

  // Create handler for drop event:
  const handleDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();
      event.stopPropagation();

      setIsDragActive(false);
      onDrop?.();

      if (event?.dataTransfer?.files && event.dataTransfer.files.length > 0) {
        const files = mapFileListToArray(event.dataTransfer.files);

        onFilesDrop?.(files);
        event.dataTransfer.clearData();
      }
    },
    [onDrop, onFilesDrop],
  );

  // Obser active state and emit changes:
  useEffect(() => {
    onDragStateChange?.(isDragActive);
  }, [isDragActive, onDragStateChange]);

  // Attach listeners to dropzone on mount:
  useEffect(() => {
    const tempZoneRef = dropZoneRef?.current;
    if (tempZoneRef) {
      tempZoneRef.addEventListener("dragenter", handleDragIn);
      tempZoneRef.addEventListener("dragleave", handleDragOut);
      tempZoneRef.addEventListener("dragover", handleDrag);
      tempZoneRef.addEventListener("drop", handleDrop);
    }

    // Remove listeners from dropzone on unmount:
    return () => {
      tempZoneRef?.removeEventListener("dragenter", handleDragIn);
      tempZoneRef?.removeEventListener("dragleave", handleDragOut);
      tempZoneRef?.removeEventListener("dragover", handleDrag);
      tempZoneRef?.removeEventListener("drop", handleDrop);
    };
  }, [handleDrag, handleDragIn, handleDragOut, handleDrop]);

  // Render <div> with ref and children:
  return (
    <div className={className} ref={dropZoneRef}>
      {children}
    </div>
  );
}

export default memo(DropZone);
