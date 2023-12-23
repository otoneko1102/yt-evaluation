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

    if (urlObject.hostname === "www.youtube.com" || urlObject.hostname === "m.youtube.com") {
        return urlObject.searchParams.get("v");
    } else if (urlObject.hostname === "youtu.be") {
        return urlObject.pathname.substr(1);  // Remove leading slash
    }
    return null;
}
