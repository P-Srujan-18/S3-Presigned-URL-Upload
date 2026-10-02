const API_URL =
"https://7qljv626eh.execute-api.ap-south-1.amazonaws.com/upload-url";

async function uploadFile() {

    const fileInput = document.getElementById("fileInput");
    const status = document.getElementById("status");

    const progressContainer =
        document.getElementById("progressContainer");

    const progressBar =
        document.getElementById("progressBar");

    const progressPercent =
        document.getElementById("progressPercent");

    const progressText =
        document.getElementById("progressText");


    // Check whether file is selected
    if (fileInput.files.length === 0) {

        status.innerHTML = "❌ Please select an image.";
        return;
    }


    const file = fileInput.files[0];


    try {

        // Reset progress bar
        progressContainer.style.display = "none";
        progressBar.style.width = "0%";
        progressPercent.textContent = "0%";

        status.innerHTML =
            "⏳ Generating secure upload URL...";


        // STEP 1
        // Request presigned URL from API Gateway

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                fileName: file.name,
                contentType: file.type

            })

        });


        if (!response.ok) {

            throw new Error(
                "Could not generate upload URL."
            );

        }


        const data = await response.json();


        // STEP 2
        // Upload file directly to S3

        status.innerHTML = "";

        progressContainer.style.display = "block";

        progressText.textContent =
            "Uploading to Amazon S3...";


        const xhr = new XMLHttpRequest();


        xhr.open(
            "PUT",
            data.uploadUrl,
            true
        );


        xhr.setRequestHeader(
            "Content-Type",
            file.type
        );


        // Upload progress
        xhr.upload.onprogress = function(event) {

            if (event.lengthComputable) {

                const percent =
                    Math.round(
                        (event.loaded / event.total) * 100
                    );


                progressBar.style.width =
                    percent + "%";

                progressPercent.textContent =
                    percent + "%";

            }

        };


        // Upload completed
        xhr.onload = function() {

            if (
                xhr.status >= 200 &&
                xhr.status < 300
            ) {

                progressBar.style.width = "100%";

                progressPercent.textContent = "100%";

                progressText.textContent =
                    "Upload complete";

                status.innerHTML =
                    "✅ File uploaded successfully!";

            }

            else {

                progressText.textContent =
                    "Upload failed";

                status.innerHTML =
                    "❌ S3 upload failed.";

            }

        };


        // Network error
        xhr.onerror = function() {

            progressText.textContent =
                "Upload failed";

            status.innerHTML =
                "❌ Upload failed. Check browser console.";

        };


        // Start upload
        xhr.send(file);


    }

    catch (error) {

        console.error(error);

        progressContainer.style.display =
            "none";

        status.innerHTML =
            "❌ Upload failed. Check browser console.";

    }

}



function showPreview() {

    const fileInput =
        document.getElementById("fileInput");

    const file =
        fileInput.files[0];

    const previewArea =
        document.getElementById("previewArea");

    const imagePreview =
        document.getElementById("imagePreview");

    const progressContainer =
        document.getElementById("progressContainer");


    if (!file) {

        previewArea.style.display = "none";
        return;

    }


    // File information

    document.getElementById("fileName")
        .textContent = file.name;


    document.getElementById("fileSize")
        .textContent =
        (file.size / (1024 * 1024))
        .toFixed(2) + " MB";


    document.getElementById("fileType")
        .textContent =
        file.type || "Unknown";


    // Image preview

    const reader =
        new FileReader();


    reader.onload = function(event) {

        imagePreview.src =
            event.target.result;

    };


    reader.readAsDataURL(file);


    previewArea.style.display =
        "block";


    // Clear previous result

    document.getElementById("status")
        .textContent = "";


    progressContainer.style.display =
        "none";

}