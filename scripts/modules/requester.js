let requester = (() => {
    function post(url, content, bot) {
        return req = {
            method: "POST",
            url: url,
            contentType: 'application/json',
            data: JSON.stringify({
                "content": content,
                "username": bot
            }),
        }
    }

    return {
        post
    };
})();