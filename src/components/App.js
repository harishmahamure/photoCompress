import React, { useState, useEffect } from "react";
import Jimp from "jimp";
import Rotator from "exif-auto-rotate";
import imageCompression from 'browser-image-compression';
import Header from "./Header";
import Buttons from './Buttons';
import Preview from './Preview';
// import Portal from './Portal/Portal'
export default function App() {
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
    setState({ ...state, loading: true });
    var file = e.target.files[0];
    Rotator.createRotatedImage(file, "base64", (uri) => {
        setState({
          ...state,
          file,
          loading: false,
          base64Image: uri,
          output:null,
          outputFile: null,
          outputURL: null
        });
      });
  };


  const compressImage = async (e) => {
    
      setState({ ...state, loading: true });
      await Jimp.read(base64Image, async (err, data) => {
        if (err) throw err;
        data
          .quality(quality || 50)
          .getBase64(
            await Jimp.MIME_JPEG || Jimp.MIME_BMP || Jimp.MIME_GIF || Jimp.MIME_PNG,
            async (err, img) => {
              // image(img);
              let img1 = await imageCompression.getFilefromDataUrl(img,state.file.name,new Date());
              const options ={
                maxSizeMB: 50,
                useWebWorker: true
              }
              const lossyOutput = await imageCompression(img1,options);
              var fileS = await new File([lossyOutput], "name");
              // console.log(fileS);
              setState({
                ...state,
                loading:false,
                output:URL.createObjectURL(lossyOutput),
                outputFile:fileS
              })

            }
          );
      });
  };
  
  const handleCancel = () => {
    setState({
      file: null,
      output: null,
      base64Image: null,
      loading: false,
      outputFile: null,
      quality: 50,
      width: null,
      height: null,
    });
  };


  const handleDownloadClick = (e) => {
    
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


  return(
    <React.Fragment>
        <Header handleChange={handleChange} />
        {
          !outputFile 
            ?
              (
                <div className="row">
                    <div className="col-sm-12 text-center py-2">
                        <Buttons loading={loading} name="compress" className="btn btn-success mx-3" onClick={compressImage}/>
                        <button loading={loading} className="btn btn-danger mx-3" onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
              )
            :
              (
                <div className="row">
                    <div className="col-sm-12 text-center py-2">
                        <Buttons loading={loading} name="download" className="btn btn-success mx-3" onClick={handleDownloadClick}/>
                        <button loading={loading} className="btn btn-danger mx-3" onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
              )
        }
        <div className="row">
          
        </div>
        <Preview base64Image={base64Image} output={output} />
    </React.Fragment>
  )
  // console.log(quality);
  // console.log(state);
//   return (
//     <React.Fragment>
//       {checkLoading()}
//       {loading ? (
//         <div className="progress">loading...</div>
//       ) : (
//         <React.Fragment>
//             <Header handleChange={handleChange} compressImage={compressImage} />
//             <Buttons base64Image={base64Image} output={output} handleDownloadClick={handleDownloadClick} handleCancel={handleCancel} compressImage={compressImage}  />
//         </React.Fragment>
//       )}
//       <Preview output={output} base64Image={base64Image}/>
//       {outputFile ? (
//         <React.Fragment>
//           <div className="row">
//             <div className="col s6">
//               <p className="lead">
//                 Original File:{" "}
//                 <b>
//                   {(file.size / 1024 / 1024).toFixed(2) < 1
//                     ? (file.size / 1024).toFixed(2)
//                     : (file.size / 1024 / 1024).toFixed(2)}
//                   {(file.size / 1024 / 1024).toFixed(2) < 1 ? " KB" : " MB"}
//                 </b>
//                 <br></br>
//                 Compressed File :
//                 <b>
//                   {(outputFile.size / 1024 / 1024).toFixed(2) < 1
//                     ? (outputFile.size / 1024).toFixed(2)
//                     : (outputFile.size / 1024 / 1024).toFixed(2)}
//                   {(outputFile.size / 1024 / 1024).toFixed(2) < 1
//                     ? " KB"
//                     : " MB"}
//                 </b>
//               </p>
//             </div>
//             <div className="col-6">
//               <p className="lead">
//                 We just saved{" "}
//                 <b>
//                   {Math.floor(100 - (outputFile.size * 100) / file.size)} %{" "}
//                 </b>{" "}
//                 from your storage.
//               </p>
//             </div>
//           </div>
//           <div className="row">
//             <div className="col s12">
//               <p className="center-align">
//                 Want to save more space. Slide to reduce or Increase the quality
//                 of image quality
//               </p>
//               <form action="#">
//                 <p className="range-field ">
//                   <input
//                     type="range"
//                     value={quality}
//                     id="test5"
//                     min={30}
//                     max={90}
//                     onChange={(e) => handleRangeChange(e)}
//                   />
//                   {quality}
//                 </p>
//                 <button
//                   className="waves-effect hoverable waves-light btn green"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     compressImage();
//                   }}
//                 >
//                   Compress Again
//                 </button>
//               </form>
//             </div>
//           </div>
//         </React.Fragment>
//       ) : null}
//     </React.Fragment>
//   );
// }
  }