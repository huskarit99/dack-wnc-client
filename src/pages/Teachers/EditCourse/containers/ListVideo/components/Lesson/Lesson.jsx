import React, { useState, useRef } from "react";
import { Button } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import ReactPlayer from "react-player";

const Lesson = ({ video, index }) => {
  const videoRef = useRef(null);
  const [show, setShow] = useState(false);
  const getProgress = () => {
    // console.log(videoRef.current.getCurrentTime());
  };

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{video.title}</td>
      <td style={{ textAlign: "center" }}>
        <a
          href="#"
          data-toggle="modal"
          data-target={`#lesson` + index}
          onClick={() => {
            setShow(true);
            // videoRef.current.seekTo(5);
          }}
        >
          Xem
        </a>
      </td>
      <td style={{ textAlign: "center" }}>
        <Button
          data-toggle="modal"
          data-target={"#delVideo" + index}
          style={{
            padding: "0",
            margin: "0",
            width: "20px",
            height: "20px",
            minWidth: "0",
          }}
        >
          <Delete />
        </Button>
      </td>
      <td></td>
      <div
        id={"lesson" + index}
        className="modal modal-edu-general default-popup-PrimaryModal fade"
        role="dialog"
        onClick={() => {
          setShow(false);
        }}
      >
        <div className="modal-dialog">
          <div
            className="modal-content"
            style={{ backgroundColor: "rgb(233, 233, 233)" }}
          >
            <div className="modal-close-area modal-close-df">
              <button
                className="close"
                data-dismiss="modal"
                onClick={() => {
                  setShow(false);
                  getProgress();
                }}
              >
                <i className="fa fa-close"></i>
              </button>
            </div>
          </div>
          <div
            style={{
              position: "relative",
              paddingTop: "56.25%",
            }}
          >
            <ReactPlayer
              ref={videoRef}
              playing={show}
              style={{ position: "absolute", top: "0", left: "0" }}
              url={video.video}
              controls
              width="100%"
              height="100%"
            />
          </div>
        </div>
      </div>
    </tr>
  );
};

export default Lesson;
