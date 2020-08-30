import React from 'react'

export default function Preview(props) {
    const {base64Image,output} = props;
    return (
        <div className="row">
        <div className="col s6">
          {base64Image ? (
            <div className="col-sm">
              <img
                className="materialboxed hoverable responsive-img"
                alt="a"
                src={base64Image}
              />
            </div>
          ) : null}
        </div>
        <div className="col s6">
          {output ? (
            <div className="col-sm">
              <img
                className="materialboxed hoverable responsive-img"
                alt="a"
                src={output}
              />
            </div>
          ) : null}
        </div>
      </div>
    )
}
