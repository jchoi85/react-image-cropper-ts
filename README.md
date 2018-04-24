<h1>React Image Cropper for React with Typescript</h1>
Example of a file upload component with crop functionality for React using Typescript. Based on react-image-crop by DominicTobias.

<h1>Props</h1>
<h4>onGetBlobFile: (blobFile: File) - (required)</h4>

<div class="highlight highlight-source-js-jsx">
    <pre>&lt;
        <span class="pl-ent">
            <span class="pl-c1">
                ReactImageCropperTs
            </span>
        </span>
        <span class="pl-e">
            onGetBlobFile
        </span>
        <span class="pl-k">
            =
        </span>
        <span class="pl-s">
            <span class="pl-pds">
                {
            </span>
            (blobFile: File) => console.log(blobFile)
        <span class="pl-pds">
                }
        </span>
    </span>
        /&gt;
    </pre>
</div>

Function to return blobFile for uploading. Function fires every time crop is complete. The blob file can be posted directly to AWS as FormData. Example usage:

<div class="highlight highlight-source-js-jsx">
    <pre>
        <span class="pl-ent">
            <span class="pl-c1">
                let
            </span>
        </span>
        formData 
        <span class="pl-k">
            =
        </span>
       <span class="pl-ent">
            <span class="pl-c1">
                new
            </span>
        </span>
         <span class="pl-e">
            FormData()
        </span>
        ;
        <br />
        <br />
        formData.append(
        <span class="pl-k">
            "img"
        </span>
        ,
        <span class="pl-ent">
            <span class="pl-c1">
                blobFile
            </span>
        </span>
        );
        <br />
        <br />
        axios.post(
        <span class="pl-k">
            URL
        </span>
        ,
        <span class="pl-ent">
            <span class="pl-c1">
                formData
            </span>
        </span>
        );
    </pre>
</div>

    onGetBlobFile: (blobFile: File) => void;
    placeholderImage?: any; // optional placeholder image
    aspect?: number; // optional aspect ratio requirement
    style?: React.CSSProperties; // optional style to apply to placeholder image and uploaded image