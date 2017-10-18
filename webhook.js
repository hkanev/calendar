$(() => {
    let webhook = 'https://discordapp.com/api/webhooks/370275455640535051/WkqfSB0t9u3JQ7ujVKHqyYON2RyK0_hdtcKVPsaVQcgVoxmYBC5qhuleIsI8zD3RV1PS';
    let bot = 'EventCreator';

    initCalendar();

    $('#submit').on('click', () => {
        event.preventDefault();

        let nameContent = $('#name').val();
        let descriptionContent = $('#description').val();
        let dateTime = $('#dateTime').val();
        let dateContent = dateTime.split(' ')[0];
        dateContent = dateContent.split('/');
        dateContent.pop();
        dateContent = dateContent.join('/');
        let startContent = dateTime.split(' ')[1];

        let command = `!create  289812771984506880  "${nameContent}" ${startContent} date ${dateContent} "${descriptionContent}"`;


        let commandReq = requester.post(webhook, command, bot);
        $.ajax(commandReq);

    });

    $('#cancel').on('click', () => {
        location.reload();
    });


    function setDate(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!

        var yyyy = today.getFullYear();
        if(dd<10){
            dd='0'+dd;
        }
        if(mm<10){
            mm='0'+mm;
        }
        var today = yyyy+'/'+mm+'/'+dd + ' 21:00';
        return today;
    }

    function initCalendar() {
        $('#datetimepicker5').datetimepicker({
            defaultDate: setDate(),
        });
        }


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