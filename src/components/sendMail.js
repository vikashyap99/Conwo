import sendGrid from '@sendgrid/mail'

sendGrid.setApiKey('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')


function sendMail(props)  {

        let x = props.timeToLeave - (5*60*60 + 30*60)
        let totalSecs = 0
        let totalMinutes = 0
        let totalHours = 0

        if(x/60 >= 60){
            
            totalSecs = x%60
            totalMinutes = (x-totalSecs)/60

            if(totalMinutes >= 60){
                totalHours = (totalMinutes - (totalMinutes%60))/60

                
            }
            totalMinutes = totalMinutes%60
        }

        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth()
        const day = today.getDate();

        console.log(year, month,day);
        console.log( totalHours, totalMinutes, totalSecs);


        //const date = new Date(year, month, day, totalHours, totalMinutes, totalSecs);
        var date = new Date(Date.UTC(year, month, day, totalHours, totalMinutes, totalSecs));
        const UnixDate  =  date.getTime()/1000;

        console.log(UnixDate);

        
            
                const msg = {
            to: props.email,
            send_at: UnixDate,
            from: '98kumarvikash@gmail.com',
            subject: 'Reminder',
            text: 'Time to Leave !!',
            html: `<h1>Time to Leave !! </h1> <br/><strong> You have a meeting on ${props.time} at ${props.destination}. </strong>`,
          };

          sendGrid.send(msg)
          .then(() => {
              console.log('Successfully Sent')
          })
          .catch((err) => console.log(err));


          return true;


         

  

    }


export default sendMail;