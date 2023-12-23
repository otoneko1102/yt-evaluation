function check() {
    const youtubeUrl = document.getElementById("youtubeUrl").value;
    const videoId = extractVideoId(youtubeUrl);

    if (videoId) {
        fetch(`https://returnyoutubedislikeapi.com/votes?videoId=${videoId}`)
            .then(response => response.json())
            .then(data => {
              const format = (number) => {
                  return new Intl.NumberFormat().format(number);
              };
              const count = `▶ ${format(data.viewCount)} | 👍 ${format(data.likes)} | 👎 ${format(data.dislikes)}`;
                document.getElementById("count").textContent = count;
            })
            .catch(error => {
                document.getElementById("count").textContent = "N/A";
            });
    } else {
        alert("This URL is invalid.");
    }
}

function extractVideoId(url) {
    const urlObject = new URL(url);
    let videoId = null;

    if (urlObject.hostname === "www.youtube.com" || urlObject.hostname === "m.youtube.com") {
        videoId = urlObject.searchParams.get("v");
    } else if (urlObject.hostname === "youtu.be") {
        videoId = urlObject.pathname.substr(1);  // Remove leading slash
    } else if (urlObject.hostname.endsWith(".youtube.com")) {
        // Handle short URLs like "https://youtu.be/abc123" or "https://youtube.com/shorts/abc123"
        const pathParts = urlObject.pathname.split("/");
        if (pathParts.length === 3 && pathParts[1] === "shorts") {
            videoId = pathParts[2];
        }
    }
    return videoId;
}
