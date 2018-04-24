<h1>React Image Cropper for React with Typescript</h1>
Example of a file upload component with crop functionality for React using Typescript. Based on react-image-crop by DominicTobias.

<h1>Props</h1>
<h4>onGetBlobFile: (blobFile: File) => void - (required)</h4>

<pre>
&lt;ReactImageCropperTs onGetBlobFile = {(blobFile: File) => console.log(blobFile)} /&gt;
</pre>

Function to return blobFile for uploading. Function fires every time crop is complete. The blob file can be posted directly to AWS as FormData. Example usage:

<pre>
let formData = new FormData();

formData.append("img", blobFile);

axios.post(URL, formData, config?);
</pre>

<h4>placeHolderImage: string - (optional)</h4>

Optional URL for placeholder image.

<h4>aspect: number - (optional)</h4>

Optional aspect ratio required for crop. (e.g. 16/9, 1).

<h4>style: React.CSSProperties - (optional)</h4>

Optional property for CSS styles for the placeholder image and uploaded image.