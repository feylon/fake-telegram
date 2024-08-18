// const { TelegramClient } = require('telegram');
// const { StringSession } = require('telegram/sessions');
// const readline = require('readline');
// require('dotenv').config();

// const API_ID = 27031927;
// const API_HASH = "8d00c82e3c6765584d3f9f6b5ec8d728";
// const PHONE_NUMBER = "+998941791409";

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });

// function askQuestion(query) {
//     return new Promise(resolve => rl.question(query, resolve));
// }

// const stringSession = new StringSession(''); // You will fill this in after the first run

// (async () => {
//     const client = new TelegramClient(stringSession, API_ID, API_HASH, {
//         connectionRetries: 5,
//     });

//     await client.start({
//         phoneNumber: async () => await askQuestion('Please enter your number: '),
//         password: async () => await askQuestion('Please enter your password: '),
//         phoneCode: async () => await askQuestion('Please enter the code you received: '),
//         onError: (err) => console.log(err),
//     });

//     console.log('You are now connected.');

//     // Save session so you don't need to log in every time
//     console.log('Your session string:', client.session.save());

//     // Change the bio using the correct method
//     const newBio = `Current time: `;
//     await client.editProfile({ about: newBio });

//     console.log('Bio updated successfully.');

//     rl.close();
//     await client.disconnect();
// })();

import { TelegramClient, Api } from "telegram";
import readline from "readline";
import dotenv from "dotenv"
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



  const result = await client.invoke(
    new Api.account.UpdateStatus({
      offline: false,
    })
  );





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