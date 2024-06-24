module.exports = {
    getResponseType: (STATUS , MSG , DATA , TOKEN = "" , STATUSCODE = 200) => {
        return {
             'status': STATUS,
             'statusCode': STATUSCODE,
             'msg': MSG,
             'data': DATA,
             'token': TOKEN
         };
    }
}
