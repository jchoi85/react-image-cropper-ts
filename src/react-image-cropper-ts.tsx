//file upload with cropping
// jason

import * as React from "react";
import ReactCrop, { makeAspectCrop } from 'react-image-crop';
import "./ReactCrop.css";

interface IFileSelectorCrop {
    onGetBlobFile: (blobFile: File) => void;
    placeholderImage?: any;
    aspect?: number;
}

interface IFileSelectorCropState {
    dataUrl: URL;
    crop: any;
    fileName: string;
    upload: boolean;
    imgLoaded: boolean;
}

export class ReactImageCropperTs extends React.Component<IFileSelectorCrop, IFileSelectorCropState>
{
    constructor(props: any) {
        super(props);
        this.state = {
            dataUrl: new URL("/", "https://developer.mozilla.org"),
            crop: {},
            fileName: "",
            upload: false,
            imgLoaded: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.onComplete = this.onComplete.bind(this);
        this.onCropChange = this.onCropChange.bind(this);
        this.dataURLtoBlobFile = this.dataURLtoBlobFile.bind(this);
        this.fileUploadHandler = this.fileUploadHandler.bind(this);
    }

    onImageLoaded = (image: any) => {
        this.props.aspect ?
            this.setState({
                crop: makeAspectCrop({
                    x: 25,
                    y: 25,
                    aspect: this.props.aspect,
                    width: 50
                }, image.width / image.height),
            })
            :
            this.setState({
                crop: makeAspectCrop({
                    x: 25,
                    y: 25,
                    width: 50
                }, image.width / image.height),
            });
    }

    handleChange(selectorFiles: FileList) {
        //console.log(selectorFiles);
        var fileReader = new FileReader();
        var data;

        fileReader.onload = () => {
            data = fileReader.result;  // data <-- in this var you have the file data in Base64 format

            //get file name and set dataURL for redering
            this.setState({
                fileName: selectorFiles[0].name,
                dataUrl: data,
                imgLoaded: true
            })

            //convert dataURL and send blob data to container level
            var blobFile = this.dataURLtoBlobFile(data);

            this.props.onGetBlobFile(blobFile);
        };
        fileReader.readAsDataURL(selectorFiles[0]);
    }

    //**dataURL to blob**
    dataURLtoBlobFile(dataurl: any) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        let blob = new Blob([u8arr], { type: mime });

        return new File([blob], this.state.fileName);
    }

    onCropChange = (crop: any) => {
        this.setState({ crop: crop });
    }

    //runs every time user drags in crop box
    onComplete = (crop: any, pixelCrop: any) => {
        const canvas = document.createElement('canvas');
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;
        const ctx: any = canvas.getContext('2d');

        let blob = this.dataURLtoBlobFile(this.state.dataUrl)

        var image = new Image();

        image.src = URL.createObjectURL(blob);
        //document.body.appendChild(image);

        //IMPORTANT: WAIT FOR IMAGE TO LOAD BEFORE TRYING TO CROP
        image.onload = () => {

            ctx.drawImage(
                image,
                pixelCrop.x,
                pixelCrop.y,
                pixelCrop.width,
                pixelCrop.height,
                0,
                0,
                pixelCrop.width,
                pixelCrop.height
            );

            //
            new Promise((resolve, reject) => {
                canvas.toBlob((file: any) => {
                    resolve(file);
                }, 'image/jpeg');
            }).then(response => {
                //console.log(response)
                // send blobFile to parent
                var blob = new Blob([response]);
                var file = new File([blob], this.state.fileName);

                this.props.onGetBlobFile(file);
            })
        }
    }

    fileUploadHandler(e: any) {
        this.handleChange(e.target.files)
    }

    render() {
        //console.log(this.state)
        return (
            <React.Fragment>
                <div className="row" style={{ margin: "auto" }}>
                    {this.state.imgLoaded ? <ReactCrop src={this.state.dataUrl} crop={this.state.crop} onChange={this.onCropChange} onComplete={this.onComplete} onImageLoaded={this.onImageLoaded} style={{ maxHeight: "50vh" }} imageStyle={{ maxHeight: "50vh" }} /> : (this.props.placeholderImage ? <img src={this.props.placeholderImage} className="img-responsive center-block" /> : "")}
                    <br />
                </div>
                <br />
                <input type="file" onChange={this.fileUploadHandler} />
            </React.Fragment>
        )
    }
}