import React,{useState,useEffect} from 'react'
import Jimp from 'jimp';
// import Portal from './Portal/Portal'
export default function App() {
    
    const [state,setState] = useState({
        file: null,
        output:null,
        base64Image:null,
        loading:false,
        outputFile:null,
        quality:75,
        width:null,
        height:null,
    });
    useEffect(() => {
      checkLoading();
      
    }, [state.loading])
    
    const checkLoading = () => {
      if(state.loading){
        return(      
          <div className="progress">
              loading...
          </div>
          )
      }  
    }
    const {
        file,
        output,
        quality, 
        width, 
        height, 
        loading, 
        outputFile,
        base64Image} = state;

    const handleChange = (e) =>{
        setState({...state,loading: true});
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.onload = function(event) {
            setState({
                ...state,
                file,
                base64Image:event.target.result,
                loading:false
            })
        };

        reader.readAsDataURL(file);
    }
    
    const compressImage = async (event) => {
      if(!base64Image){
        setTimeout(()=>{
          return (
            <div className="">
              Please upload image
            </div>
          )
        },3000)
      }
      else{
        setState({...state,loading:true});
            await  Jimp.read(base64Image,(err,data) => {
            if (err) throw err;
            data
            .quality(quality || 75)
            .getBase64(Jimp.MIME_JPEG || Jimp.MIME_BMP || Jimp.MIME_GIF || Jimp.MIME_PNG,(err,img)=>{
                image(img);
            })
          })
        }
    }
    const image = async (img) =>{
        fetch(img)
        .then(response =>{
          return response.blob().then(blob =>{
            // console.log(blob);
            setState({...state,output:img, outputFile:blob});
          })
        })
        
    }
    
    const handleCancel = () =>{
        setState({
            file: null,
            output:null,
            base64Image:null,
            loading:false,
            outputFile:null,
            quality:75,
            width:null,
            height:null,
        });
    }
    
    
    const handleDownloadClick = e => {
        // console.log(file);
        if(!output){
          let message = "Please Add Image";
        }
        var dataStr = output;
        var dlAnchorElem = document.createElement('a');
        dlAnchorElem.setAttribute("href",     dataStr     );
        dlAnchorElem.setAttribute("download", file.name);
        dlAnchorElem.click();
    }
    function handleRangeChange(e){
        setState({
          ...state,
          quality:parseInt(e.target.value)
        })

    }
    console.log(quality);
    return (
        <React.Fragment>
        {checkLoading()}
        {loading ? (
          <div className="progress">
              loading...
          </div>
        ) :
        (
        <React.Fragment> 
        <div className="row">
          <div className= "col s12">
              <div className="d-flex justify-content-center">
                  <span className="btn tooltipped" data-position="bottom" data-tooltip="I am a tooltip">
                      <input type="file" name="pictures" accept="image/*" onChange={e=>handleChange(e)}  />
                  </span>
                  <br></br>
              </div>
          </div>    
          <div className="col s6"></div>
        </div>
           {base64Image 
           ?(
            <div className="row">
            {output ? (
              
                  <div className="col s6">
                      <div className="row">
                          <div className="col s6">
                              <button className="waves-effect waves-light btn green" onClick={handleDownloadClick}>
                                    <i className="fa fa-ban"></i>
                                    <span>Download</span>
                              </button>
                          </div>
                      </div>
                  <div className="col-3">
                      <div className="row">
                          <div className="col s3">
                              <button className="waves-effect waves-light btn red" onClick={handleCancel}>
                                    <i className="fa fa-ban"></i>
                                    <span>delete</span>
                              </button>
                          </div>
                      </div>
                  </div>
              </div>
            ):
            (
              <React.Fragment>
                  <div className="col s6">
                      <button className="waves-effect waves-light btn" onClick ={compressImage}>
                          <i className="fa fa-download"></i>
                         <span>Compress photo</span>
                      </button>
                  </div>
                  <div className="col-6">
                      <div className="row">
                          <div className="col s6">
                              <button className="waves-effect waves-light btn red" onClick={handleCancel}>
                                    <i className="fa fa-ban"></i>
                                    <span>cancel</span>
                              </button>
                          </div>
                      </div>
                  </div>
              </React.Fragment>

            )
            }

           </div>
           )
           :null
           }
  
            </React.Fragment>

        )
       }
      <div className="row">
                <div className="col s6">
                        {base64Image ? (
                            <div className="col-sm">
                              <img className="materialboxed responsive-img" alt="a" src={base64Image} />
                            </div>)
                          : 
                            null
                        }
                </div>
                <div className="col s6">
                        {output ? (
                            <div className="col-sm">
                              <img className="materialboxed responsive-img" alt="a" src={output} />
                            </div>)
                          : 
                            null
                        }
                </div>
           
              </div>
              <div className="row">
                    <div className="col s12">
                        {outputFile ? (
                            <React.Fragment>
                              <div className="col s6"> 
                              <p className="lead">
                                Original File: <b>
                                                   {(file.size/1024/1024).toFixed(2)} mb
                                                </b>
                                <br></br>
                                Compressed File : <b> 
                                                      {(outputFile.size/1024/1024).toFixed(2)} mb
                                                  </b> 
                              </p>
                              </div>
                              
                                <div className="col s12">
                                <p>
                                  Slide to reduce or Increase the quality of image quality
                                </p>
                                    <form action="#">
                                            <p className="range-field">
                                              <input type="range" 
                                              value={quality}
                                              id="test5" 
                                              min={30}
                                              max={90} 
                                              onChange={e=>handleRangeChange(e)} 
                                              />
                                              {quality}
                                            </p>
                                    <button className="waves-effect waves-light btn green" onClick={e=>{
                                    e.preventDefault()
                                    compressImage()}
                                    }
                                    >
                                        Compress Again
                                    </button>
                                    </form>

                                </div>
                                </React.Fragment>
                        ) :null}
                    </div>
              </div>
        </React.Fragment>
    )
}
