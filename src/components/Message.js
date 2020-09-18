import React from 'react'

export default function Message(props) {
    const {file,outputFile} = props
    return (
        <React.Fragment>
                <div className="row mx-auto">
                        <blockquote className="blockquote">
                                <p className="mb-0 text-primary text-center"> 
                                        We just saved{" "}
                                        <span className="text-success">
                                            {Math.floor(100 - (outputFile.size * 100) / file.size)} %{" "}
                                        </span>
                                        {" "}
                                        from your storage.
                                </p>
                        </blockquote>
                    
                </div>

        </React.Fragment>
    )
}
