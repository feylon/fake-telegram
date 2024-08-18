const  { TelegramClient, Api } = require ("telegram");
const  readline = require("readline");
let dotenv = require("dotenv")
dotenv.config()
console.log(process.env.apiId)
const apiId = 27031927;
const apiHash = process.env.apiHash;
// const stringSession = new StringSession(""); // fill this later with the value from session.save()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

(async () => {
  console.log("Loading interactive example...");
  const client = new TelegramClient("a", apiId, apiHash, {
    connectionRetries: 5,
  });
  await client.start({
    phoneNumber: async () =>
      new Promise((resolve) =>
        rl.question("Please enter your number: ", resolve)
      ),
    password: async () =>
      new Promise((resolve) =>
        rl.question("Please enter your password: ", resolve)
      ),
    phoneCode: async () =>
      new Promise((resolve) =>
        rl.question("Please enter the code you received: ", resolve)
      ),
    onError: (err) => console.log(err),
  });



  setInterval(async () => {
    const now = new Date();
const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
const dateString = now.toLocaleString('en-US', options);
    try {


        const now = new Date();
        const timeDiff = new Date('2024-09-14T00:00:00Z') - now;
    
        if (timeDiff <= 0) {
            return 'Countdown complete!';
        }
    
        const seconds = Math.floor(timeDiff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
    let countdown = {
        days: days,
        hours: hours % 24,
        minutes: minutes % 60,
        seconds: seconds % 60
    }


        const result = await client.invoke(
            new Api.account.UpdateProfile({
              firstName: "Ergashev Jamshid ⩔",
              lastName: "",
              about: `Tugʻilgan kunimga ${countdown.days} kun, ${countdown.hours} soat, ${countdown.minutes} minut, ${countdown.seconds} sekund qoldi`
            })
          );
        //   console.log(result)
    } catch (error) {
        console.log(error)
    }
  }, 30000);



 setInterval(async () => {
    const result = await client.invoke(
        new Api.account.UpdateStatus({
          offline: false,
        })
      );
 }, 2000);





  setInterval(async () => {
    try {
       const getent = await client.getEntity('5839498578');
    //    console.log(getent) 
      const result = await client.invoke(
        new Api.messages.SendMessage({
            peer: getent, // Ensure this is correct
            message: "Men seni sevaman",
          
        })
      );
      console.log(result);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }, 3600000);
  

  console.log("You should now be connected.");
  console.log(client.session.save()); // Save this string to avoid logging in again
  await client.sendMessage("me", { message: "Hello!" });
//   await client.getMe()
})();