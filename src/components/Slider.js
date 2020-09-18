import React from 'react'
import Buttons from './Buttons'
export default function Slider(props) {
    return (
        <div className="row">
            <div className="col-sm-10 col-md-10 col-lg-10 col-xs-10">
                    <label for="customRange1" className="text-center">Compress Again</label>
                    <input type="range" class="custom-range" min={30} max={90} id="customRange1" value={props.quality} onChange={(e) => props.onChange(e)}/>
            </div>

        </div>
    )
}
