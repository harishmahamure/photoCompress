import React from 'react'

export default function Header(props) {
    return (
        <div className="row center-align">
            <div className="col s12">
              <div className="d-flex justify-content-center">
                {/* <div class="file-field input-field">
                  <div class="btn">
                    <input type="file" name="pictures" accept="image/*" onChange={e=> {
                      e.stopPropagation();
                      handleChange(e)
                      }} />
                      Add Photos
                  </div>
              </div> */}
                <span
                  className="btn hoverable tooltipped"
                  data-position="bottom"
                  data-tooltip="Please select File"
                >
                  <input
                    type="file"
                    name="pictures"
                    accept="image/*"
                    onChange={(e) => props.handleChange(e)}
                  />
                </span>
                <br></br>
              </div>
        </div>
        </div>
    )
}
