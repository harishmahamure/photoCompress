import React from 'react'

export default function Buttons(props) {
    const {base64Image,output,handleCancel,handleDownloadClick,compressImage}= props;
    return (
        <React.Fragment>
        {base64Image ? (
            <div className="row center-align">
              {output ? (
                <React.Fragment>
                  {/* <div className="col s3"></div> */}
                  {/* <div className="col s6"> */}
                  <div className="row">
                    <div className="col s6">
                      <button
                        className="waves-effect hoverable waves-light btn green px-1"
                        onClick={handleDownloadClick}
                      >
                        <i className="fa fa-ban"></i>
                        <span>Download</span>
                      </button>
                    </div>

                    <div className="col s6">
                      <button
                        className="waves-effect hoverable waves-light btn red"
                        onClick={handleCancel}
                      >
                        <i className="fa fa-ban"></i>
                        <span>delete</span>
                      </button>
                    </div>
                  </div>

                  {/* </div>       */}
                  {/* <div className="col s3"></div> */}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {/* <div className="col s3"> </div> */}
                  {/* <div className="col s6"> */}
                  <div className="row center-align">
                    <div className="col s6">
                      <button
                        className="waves-effect hoverable waves-light btn"
                        onClick={compressImage}
                      >
                        <i className="fa fa-download"></i>
                        <span>Compress</span>
                      </button>
                    </div>

                    <div className="col s6">
                      <button
                        className="waves-effect hoverable waves-light btn red"
                        onClick={handleCancel}
                      >
                        <i className="fa fa-ban"></i>
                        <span>cancel</span>
                      </button>
                    </div>

                    {/* </div> */}
                  </div>

                  {/* <div className="col s3"></div> */}
                </React.Fragment>
              )}
            </div>
          ) : null}
          </React.Fragment>

    )
}
