function check() {
    const youtubeUrl = document.getElementById("youtubeUrl").value;
    const videoId = extractVideoId(youtubeUrl);

    if (videoId) {
        fetch(`https://returnyoutubedislikeapi.com/votes?videoId=${videoId}`)
            .then(response => response.json())
            .then(data => {
              const count = `▶ ${data.viewCount} | 👍${data.likes} | 👎${data.dislikes}`;
                document.getElementById("count").textContent = count;
            })
            .catch(error => {
                document.getElementById("count").textContent = "N/A";
            });
    } else {
        alert("有効なYouTubeの動画のURLを入力してください");
    }
}

function extractVideoId(url) {
    const match = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
}
