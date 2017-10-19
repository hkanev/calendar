$(() => {
    let baseurl = 'https://discordapp.com/api/webhooks/';

    let token = 'WkqfSB0t9u3JQ7ujVKHqyYON2RyK0_hdtcKVPsaVQcgVoxmYBC5qhuleIsI8zD3RV1PS';
    let id  = '370275455640535051';
    let webhookNugos = baseurl + id + '/' + token;

    let testWebhook = 'https://discordapp.com/api/webhooks/370175718208045066/MAkJKamDTGQfxed4McLp6Jy6oKq1smtX0jZf6vpQn-3J4-jxeAeW4SiDSU4igw2tysFK';
    let testId = '370582148022796288';
    let testCalendarId = '370582148022796288';

    let bot = 'EventCreator';

    let webhook = testWebhook;
    let chnId = testId;
    let calendarId = testCalendarId;

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

        let command = `!create  ${chnId}  "${nameContent}" ${startContent} date ${dateContent} "${descriptionContent}"`;

        let req = requester.post(webhook, command, bot);
        $.ajax(req);
    });

    $('#cancel').on('click', () => {
        location.reload();
    });

    $('#announcementsBtn').on('click', () => {
        event.preventDefault();

        let eventId = $('#eventId').val();
        let mainAnnouncement = `!config ${calendarId} message "%t уже началась!"`;
        let command1 = `!announcements ${eventId} add ${chnId} start-1h  "%t начнется в %s (мск).  %n Самое время заюзать обеды, пробафаться, и взять банок и аптечек!"`;
        let command2 = `!announcements ${eventId} add ${chnId} start-30m  "%t начнется в %s (мск).  %n Осталось совсем мало времени! Бафы, аптечки, банки, и главное КАМЕНЬ ДЛЯ РЕМОНТА КИПА!"`;

        let mainAnnouncementReq = requester.post(webhook, mainAnnouncement, bot);
        let announce1Req = requester.post(webhook, command1, bot);
        let announce2Req = requester.post(webhook, command2, bot);

       $.ajax(mainAnnouncementReq);
        setTimeout(function () {$.ajax(announce1Req)}, 1500);
        setTimeout(function () {$.ajax(announce2Req)}, 3000);
    });

    $('#autowinBtn').on('click', () => {
        event.preventDefault();

        let eventId = $('#eventId').val();
        let mainAnnouncement = `!config ${calendarId} message "АУТОВИН - Враги не пришли, автовин :frowning:"`;
        let remove1 = `!announcements ${eventId} remove 1`;
        let remove2 = `!announcements ${eventId} remove 2`;
        let comment = `!edit ${eventId} comment add "АУТОВИН - Враги не пришли, автовин :frowning:"`;

        let mainAnnouncementReq = requester.post(webhook, mainAnnouncement, bot);
        let remove1req = requester.post(webhook, remove1, bot);
        let remove2req = requester.post(webhook, remove2, bot);
        let commentReq = requester.post(webhook, comment, bot);

        $.ajax(mainAnnouncementReq);
        setTimeout(function () {$.ajax(remove2req)}, 1500);
        setTimeout(function () {$.ajax(remove1req)}, 3000);
        setTimeout(function () {$.ajax(commentReq)}, 4500);
    });

    $('#defaultBtn').on('click', () => {
        event.preventDefault();

        let mainAnnouncement = `!config ${calendarId} message "%t уже началась!"`;
        let mainAnnouncementReq = requester.post(webhook, mainAnnouncement, bot);
        $.ajax(mainAnnouncementReq);

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