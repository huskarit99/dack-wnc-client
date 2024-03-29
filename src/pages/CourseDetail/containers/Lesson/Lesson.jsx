import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";

const Lesson = ({ video, index, is_subscribed }) => {
  const videoRef = useRef(null);
  const [show, setShow] = useState(false);
  const getProgress = () => {
    console.log(videoRef.current.getCurrentTime());
  };

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{video.title}</td>
      <td>
        {is_subscribed ? (
          <a
            href="#"
            data-toggle="modal"
            data-target={`#lesson` + index}
            onClick={() => {
              setShow(true);
              videoRef.current.seekTo(5);
            }}
          >
            Xem
          </a>
        ) : video.is_previewed ? (
          <a
            href="#"
            data-toggle="modal"
            data-target={`#lesson` + index}
            onClick={() => {
              setShow(true);
              videoRef.current.seekTo(5);
            }}
          >
            Xem trước
          </a>
        ) : (
          "Mua khóa học"
        )}
      </td>
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
              url="https://res.cloudinary.com/drzosgsbu/video/upload/v1628703777/zjhqd9chta8dufdfnpcf.mp4"
              // url="https://www.youtube.com/watch?v=pSFXJ7teisw"
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
