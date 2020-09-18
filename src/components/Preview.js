import React from 'react'

export default function Preview(props) {
    const {base64Image,output} = props;
    return (
        <div className="row py-1">
              <div className="col s6">
                {base64Image ? (
                  <div className="col-sm">
                    <img
                      className="img-fluid"
                      alt="a"
                      src={base64Image}
                    />
                  </div>
                ) :
                (
                  <div className="col-sm-6">
                  </div>
                )
                }
              </div>
              <div className="col s6">
                {output ? (
                  <div className="col-sm">
                    <img
                      className="img-fluid"
                      alt="a"
                      src={output}
                    />
                  </div>
                ) : 
                (
                  <div className="col-sm-6">
                  </div>
                )}
        </div>
      </div>
    )
}
