$(() => {
    let webhook = 'https://discordapp.com/api/webhooks/370175718208045066/MAkJKamDTGQfxed4McLp6Jy6oKq1smtX0jZf6vpQn-3J4-jxeAeW4SiDSU4igw2tysFK';
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

        let command = `!create  370179411502170113  "${nameContent}" ${startContent} date ${dateContent} "${descriptionContent}"`;


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