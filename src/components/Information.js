import React from 'react'

export default function Information(props) {
    return (
        <React.Fragment>
            <div className="row text-center">
                <div className="col-sm-6 col-md-6 col-xs-12 col-lg-6">
                    <strong> Original Image: </strong> {" "}
                            <b className="text-danger">
                            {
                                (props.file.size / 1024 / 1024).toFixed(2) < 1
                                ? 
                                (props.file.size / 1024).toFixed(2)
                                : 
                                (props.file.size / 1024 / 1024).toFixed(2)
                            }
                                {
                                    (props.file.size / 1024 / 1024).toFixed(2) < 1 ? " KB" : " MB"
                                }
                            </b>
                </div>
                <div className="col-sm-6 col-md-6 col-xs-12 col-lg-6">
                    <strong> Compressed Image </strong> :{" "}
                            <b className="text-success">
                            {
                                (props.outputFile.size / 1024 / 1024).toFixed(2) < 1
                                ? 
                                (props.outputFile.size / 1024).toFixed(2)
                                : 
                                (props.outputFile.size / 1024 / 1024).toFixed(2)
                            }
                                {
                                    (props.outputFile.size / 1024 / 1024).toFixed(2) < 1 ? " KB" : " MB"
                                }
                            </b>
                </div>
            </div>
        </React.Fragment>
    )
}
