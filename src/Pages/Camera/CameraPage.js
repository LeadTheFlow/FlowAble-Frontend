import React from "react";
import { useLocation } from "react-router-dom";
import FileUploader from "../../components/FileUploader";

const CameraPage = () => {
  const location = useLocation();
  const cameraType = location.state?.cameraType || "기본 텍스트";

  return (
    <div>
      {cameraType === "ColorDetection" && (
        <FileUploader endpoint="5001/api/color" />
      )}
    </div>
  );
};

export default CameraPage;
