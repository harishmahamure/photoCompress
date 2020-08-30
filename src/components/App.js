import React, { useState, useEffect } from "react";
import Jimp from "jimp";
import Rotator from "exif-auto-rotate";
import imageCompression from 'browser-image-compression';
const Header = React.lazy(() => import('./Header'));
const Buttons = React.lazy(() => import('./Buttons'));
const Preview = React.lazy(() => import('./Preview'));
// import Portal from './Portal/Portal'
export default function App() {
  const url = "https://infinite-brook-42777.herokuapp.com/";
  const [state, setState] = useState({
    file: null,
    output: null,
    base64Image: null,
    loading: false,
    outputFile: null,
    quality: 50,
    width: null,
    height: null,
    outputURL: null
  });

  useEffect(() => {
    checkLoading();
  }, [state.loading]);

  const checkLoading = () => {
    if (state.loading) {
      return <div className="progress">loading...</div>;
    }
  };
  const {
    file,
    output,
    quality,
    width,
    height,
    loading,
    outputFile,
    base64Image,
  } = state;

  const handleChange = (e) => {
    // const res = axios.patch(url, { fileCount: 1 });
    console.log(e);
    setState({ ...state, loading: true });
    var file = e.target.files[0];
    Rotator.createRotatedImage(file, "base64", (uri) => {
      let image = new Image();
      image.src = uri;
      image.addEventListener("load", () => {
        // console.log(uri);
        setState({
          ...state,
          width: image.width,
          height: image.height,
          file,
          loading: false,
          base64Image: uri,
          output:null,
          outputFile: null,
          outputURL: null
        });
      });
    });
    // var reader = new FileReader();
    // reader.onload = function(event) {
    //     setState({
    //         ...state,
    //         file,
    //         base64Image:event.target.result,
    //         loading:false
    //     })
    // };

    // reader.readAsDataURL(file);
  };
  // // console.log(state);

  const compressImage = async (e) => {
    
      setState({ ...state, loading: true });
      await Jimp.read(base64Image, (err, data) => {
        if (err) throw err;
        data
          .resize(width, height)
          .quality(quality || 75)
          .getBase64(
            Jimp.MIME_JPEG || Jimp.MIME_BMP || Jimp.MIME_GIF || Jimp.MIME_PNG,
            (err, img) => {
              image(img);
            }
          );
      });
  };
  
  if(outputFile){
    console.log("file exists");
    const outSize = outputFile.size;
    const fSize = file.size;
    const lossyFunction = async () =>{
      const options = { 
        maxSizeMB: 1,          // (default: Number.POSITIVE_INFINITY)
        // // maxWidthOrHeight: state.height, 
        // compressedFile will scale down by ratio to a point that width or height is smaller than maxWidthOrHeight (default: undefined)
           // optional, fileType override
      }
  
      const lossyOutput = await imageCompression(file,options);
      var fileS = new File([lossyOutput], "name");
      // console.log(fileS);
      setState({
        ...state,
        loading:false,
        output:URL.createObjectURL(lossyOutput),
        outputFile:fileS
      })
      
    }
    if(outSize >= fSize){
      lossyFunction();
    }

  }
  const image = async (img) => {
    fetch(img).then((response) => {
      return response.blob().then((blob) => {
        // console.log(blob);
        setState({ ...state, output: img, outputFile: blob });
      });
    });
  };

  const handleCancel = () => {
    setState({
      file: null,
      output: null,
      base64Image: null,
      loading: false,
      outputFile: null,
      quality: 75,
      width: null,
      height: null,
    });
  };


  const handleDownloadClick = (e) => {
    // console.log(file);
    // console.log((outputFile.size)*100/(file.size)-100)
    if (!output) {
      let message = "Please Add Image";
    }
    var dataStr = output;
    var dlAnchorElem = document.createElement("a");
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "min-" + file.name);
    dlAnchorElem.click();
  };
  function handleRangeChange(e) {
    setState({
      ...state,
      quality: parseInt(e.target.value),
    });
  }
  // console.log(quality);
  // console.log(state);
  return (
    <React.Fragment>
      {checkLoading()}
      {loading ? (
        <div className="progress">loading...</div>
      ) : (
        <React.Fragment>
            <Header handleChange={handleChange} compressImage={compressImage} />
            <Buttons base64Image={base64Image} output={output} handleDownloadClick={handleDownloadClick} handleCancel={handleCancel} compressImage={compressImage}  />
        </React.Fragment>
      )}
      <Preview output={output} base64Image={base64Image}/>
      {outputFile ? (
        <React.Fragment>
          <div className="row">
            <div className="col s6">
              <p className="lead">
                Original File:{" "}
                <b>
                  {(file.size / 1024 / 1024).toFixed(2) < 1
                    ? (file.size / 1024).toFixed(2)
                    : (file.size / 1024 / 1024).toFixed(2)}
                  {(file.size / 1024 / 1024).toFixed(2) < 1 ? " KB" : " MB"}
                </b>
                <br></br>
                Compressed File :
                <b>
                  {(outputFile.size / 1024 / 1024).toFixed(2) < 1
                    ? (outputFile.size / 1024).toFixed(2)
                    : (outputFile.size / 1024 / 1024).toFixed(2)}
                  {(outputFile.size / 1024 / 1024).toFixed(2) < 1
                    ? " KB"
                    : " MB"}
                </b>
              </p>
            </div>
            <div className="col-6">
              <p className="lead">
                We just saved{" "}
                <b>
                  {Math.floor(100 - (outputFile.size * 100) / file.size)} %{" "}
                </b>{" "}
                from your storage.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <p className="center-align">
                Want to save more space. Slide to reduce or Increase the quality
                of image quality
              </p>
              <form action="#">
                <p className="range-field ">
                  <input
                    type="range"
                    value={quality}
                    id="test5"
                    min={30}
                    max={90}
                    onChange={(e) => handleRangeChange(e)}
                  />
                  {quality}
                </p>
                <button
                  className="waves-effect hoverable waves-light btn green"
                  onClick={(e) => {
                    e.preventDefault();
                    compressImage();
                  }}
                >
                  Compress Again
                </button>
              </form>
            </div>
          </div>
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
}
