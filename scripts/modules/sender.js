let sender = (() => {
    function send(webhook, bot, commands){
        let interval = 0;
        for(let command of commands){
            setTimeout(function () {$.ajax(requester.post(webhook, command, bot))}, interval);
            interval += 1500;
        }
    }

    return {
        send
    };
})();