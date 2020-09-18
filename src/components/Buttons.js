import React from 'react';
import PropTypes from 'prop-types';

export default function Buttons(props) {
    console.log(props);
    return (
        <React.Fragment>
        {
            props.loading
        ?
        (
            <button className={props.className} type="button" disabled={props.loading ? true :false}>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    {props.name}
            </button>
        )
        :
        (
            <button className={props.className} disabled={props.disabled} type="button" onClick={(e)=>props.onClick()}>
            {props.name}
            </button>
        )
        }
        </React.Fragment>
    )
}

Buttons.prototype={
    name:PropTypes.string,
    className:PropTypes.string,
    onClick:PropTypes.func,
    disabled:PropTypes.bool
}

Buttons.defaultProps={
    name:"button",
    className:"btn btn-primary",
    disabled:false,
    onClick: (e)=>{
        console.log(e)
    }
}
