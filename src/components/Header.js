import React from 'react'

export default function Header(props) {
    return (
        <div className="row center-align">
            <div className="col-sm-12">
              <div className="d-flex justify-content-center">
                    <div class="form-group">
                      <input 
                            type="file" 
                            class="form-control-file" 
                            name="pictures" 
                            accept="image/*"
                            className="btn btn-primary" 
                            onChange={(e) => props.handleChange(e)}
                            />
                    </div>
              </div>
        </div>
        </div>
    )
}
