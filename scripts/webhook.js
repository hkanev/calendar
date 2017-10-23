$(() => {
    let baseurl = 'https://discordapp.com/api/webhooks/';
    let bot = 'EventCreator';

    //config discord
    let token = 'WkqfSB0t9u3JQ7ujVKHqyYON2RyK0_hdtcKVPsaVQcgVoxmYBC5qhuleIsI8zD3RV1PS';
    let id  = '370275455640535051';
    let webhook = baseurl + id + '/' + token;
    let chnId = '289812771984506880';
    let calendarId = '370842343609466880';

    //init
    initCalendar();

    //events
    $('#submit').on('click', () => {
        event.preventDefault();

        let nameContent = $('#name').val();
        let descriptionContent = $('#description').val();
        let dateTime = $('#dateTime').val();
        let dateContent = dateTime.split(' ')[0];
        dateContent = dateContent.split('/');
        dateContent.pop();
        dateContent = dateContent.join('/');
        let startContent = dateTime.split(' ')[1]+dateTime.split(' ')[2];
        let command = `!create  ${calendarId}  "${nameContent}" ${startContent} date ${dateContent} image https://s3.amazonaws.com/files.enjin.com/973675/Post%20Headers/BDO_Node_War.png "${descriptionContent}"`;

        sender.send(webhook, bot, [command]);
        setTimeout(function () {location.reload()}, 1000);
    });
    $('#cancel').on('click', () => {
        location.reload();
    });
    $('#announcementsBtn').on('click', () => {
        event.preventDefault();

        let eventId = $('#eventId').val();
        let mainAnnouncement = `!config ${calendarId}  message "@everyone %t уже началась!"`;
        let command1 = `!announcements ${eventId} add ${chnId} start-58m  "@everyone %t начнется в %s (мск).  %nСамое время заюзать обеды, пробафаться, и взять банок и аптечек!"`;
        let command2 = `!announcements ${eventId} add ${chnId} start-30m  "@everyone %t начнется в %s (мск).  %nОсталось совсем мало времени! Бафы, аптечки, банки, и главное КАМЕНЬ ДЛЯ РЕМОНТА КИПА!"`;
        let command3 = `!edit ${eventId} image https://s3.amazonaws.com/files.enjin.com/973675/Post%20Headers/BDO_Node_War.png`;
        let commands = [mainAnnouncement, command1, command2,command3];

        sender.send(webhook, bot, commands);

    });
    $('#autowinBtn').on('click', () => {
        event.preventDefault();

        let eventId = $('#eventId').val();
        let mainAnnouncement = `!config ${calendarId} message "@everyone АУТОВИН - Враги не пришли, автовин :frowning:"`;
        let remove1 = `!announcements ${eventId} remove 1`;
        let remove2 = `!announcements ${eventId} remove 2`;
        let comment = `!edit ${eventId} comment add "АУТОВИН - Враги не пришли, автовин :frowning:"`;

        let commands = [mainAnnouncement, remove2, remove1, comment];

        sender.send(webhook, bot, commands);
    });
    $('#defaultBtn').on('click', () => {
        event.preventDefault();

         let command = [`!config ${calendarId} message "@everyone %t уже началась!"`];
         sender.send(webhook, bot, command)

    });

    //functions
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

