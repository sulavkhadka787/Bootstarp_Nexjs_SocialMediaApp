import { useState, useEffect } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import Cropper from "react-cropper";

const CropImageModal = ({
  mediaPreview,
  setMedia,
  showModal,
  setShowModal,
}) => {
  const [cropper, setCropper] = useState();

  const getCropData = () => {
    if (cropper) {
      setMedia(cropper.getCroppedCanvas().toDataURL());
      cropper.destroy();
    }

    setShowModal(false);
  };

  useEffect(() => {
    window.addEventListener("keydown", ({ key }) => {
      if (cropper) {
        if (key === "m") cropper.setDragMode("move");
        if (key === "c") cropper.setDragMode("crop");
        if (key === "r") cropper.reset();
      }
    });
  }, [cropper]);

  return (
    <div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton />
        <Modal.Body>
          <Row>
            <Col>
              <Cropper
                style={{ height: "400px", width: "100%" }}
                cropBoxResizable
                zoomable
                highlight
                responsive
                guides
                dragMode="move"
                initialAspectRatio={1}
                preview=".img-preview"
                src={mediaPreview}
                viewMode={1}
                minCropBoxHeight={10}
                minContainerWidth={10}
                background={false}
                autoCropArea={1}
                checkOrientation={false}
                onInitialized={(cropper) => setCropper(cropper)}
              />
            </Col>

            <Col>
              <div
                style={{
                  width: "100%",
                  height: "300px",
                  display: "inline-block",
                  padding: "10px",
                  overflow: "hidden",
                  boxSizing: "border-box",
                }}
                className="img-preview"
              />
            </Col>
          </Row>
        </Modal.Body>
        <Button onClick={getCropData}>Crop Image</Button>
      </Modal>
    </div>
  );
};

export default CropImageModal;
