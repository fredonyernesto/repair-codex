// Takes a File object (from an <input type="file"), resizes it,
// and returns a Promise that resolves to a base64 JPEG string.
// Returns a Promise because file reading and image loading are both async -
// they fire a callback when they're done, they don't return a value immediately.
export function compressImage(file, maxWidth = 1200, quality = 0.7){
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            // The file is now in memory as a base64 string. Build an Image element from it.
            const img = new Image();

            img.onload = () => {
            // Scale down if wider than maxWidth. Height is recalculated to preserve the ratio.
                let { width, height } = img;
                if (width > maxWidth) {
                    height = height * (maxWidth / width);
                    width = maxWidth;
                }
                
                // Draw to an invisible canvas at the new dimensions.
                const canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, width, height);

                // Export the canvas as a JPEG. quality ranges 0-1; 0.7 is the visual sweet spot.
                const compressedBase64 = canvas.toDateURL("image/jpeg", quality);
                resolve(compressedBase64);
            };

            img.onerror = reject;
            img.src = reader.result;
        };

        reader.onerror = reject;
        reader.readAsDataURL(file);
    })
}