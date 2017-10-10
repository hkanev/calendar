$(() => {
    let webhook = 'https://discordapp.com/api/webhooks/367279365978980354/mRhaQl_167FOvxcTVN7wJWkRjREpwZh-jqbFQOCkJvZnvTO3Bbv4YGfgOaVYlEWoEPeB';
    let bot = 'EventCreator';

    $('#submit').on('click', () => {
        event.preventDefault();

        let nameContent = '!event create ' + $('#name').val();
        let descriptionContent = '!event description ' + $('#description').val();
        let startContent = '!event startDate ' + $('#date').val() + "-" + $('#startTime').val();
        let endContent = '!event endDate ' + $('#date').val() + "-" + $('#endTime').val();

        let nameReq = requester.post(webhook, nameContent, bot);
        let descriptionReq = requester.post(webhook, descriptionContent, bot);
        let startDateReq = requester.post(webhook, startContent, bot);
        let endDateReq = requester.post(webhook, endContent, bot);
        let confirm = requester.post(webhook, '!event confirm', bot);

        $.ajax(nameReq);
        setTimeout(function() { $.ajax(descriptionReq) }, 2000);
        setTimeout(function() {$.ajax(startDateReq) }, 4000);
        setTimeout(function() { $.ajax(endDateReq) }, 6000);
        setTimeout(function() { $.ajax(confirm) }, 8000);
    });
});

let requester = (() => {
    function post(url, content, bot) {
        return req = {
            method: "POST",
            url: url,
            contentType: 'application/json',
            data: JSON.stringify({
                "content": content,
                "username": bot
            })
        }
    }

    return {
        post
    };
})();