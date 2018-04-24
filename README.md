<h1>React Image Cropper for React with Typescript</h1>
Example of a file upload component with crop functionality for React using Typescript. Based on react-image-crop by DominicTobias.

<h1>Props</h1>
<h4>onGetBlobFile: (blobFile: File) - (required)</h4>

<div class="highlight highlight-source-js-jsx">
    <pre>
        &lt;ReactImageCropperTs onGetBlobFile = {(blobFile: File) => console.log(blobFile)} /&gt;
    </pre>
</div>

Function to return blobFile for uploading. Function fires every time crop is complete. The blob file can be posted directly to AWS as FormData. Example usage:

<div class="highlight highlight-source-js-jsx">
    <pre>
        let formData = new FormData();
        <br />
        <br />
        formData.append("img", blobFile);
        <br />
        <br />
        axios.post(URL, formData, config?);
    </pre>
</div>

    onGetBlobFile: (blobFile: File) => void;
    placeholderImage?: any; // optional placeholder image
    aspect?: number; // optional aspect ratio requirement
    style?: React.CSSProperties; // optional style to apply to placeholder image and uploaded image