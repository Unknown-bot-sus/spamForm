const axios = require("axios");
const CliProgress = require("cli-progress");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
const { EOL } = require("os");

function question(query) {
  return new Promise((resolve) => {
    readline.question(query, resolve);
  });
}

const bar = new CliProgress.SingleBar(
  {
    clearOnComplete: true,
  },
  CliProgress.Presets.legacy
);

const url =
  "https://forms.office.com/formapi/api/aa91c14f-80f9-42eb-9670-1d5a3754a696/users/7362dd4b-3a85-45bd-b8e2-8159cf83782f/forms('T8GRqvmA60KWcB1aN1SmlkvdYnOFOr1FuOKBWc-DeC9URjI3OU05SzUzWUwwWjNMMDNXTDdQMEIwSS4u')/responses";
const data = {
  answers:
    '[{"questionId":"r38aef010d22a4053bd90890ec3ca4a03","answer1":"Jonas Ang Kai Jie"},{"questionId":"r662e3dc9ac70458d985ad6e94fbeef65","answer1":"Penny Kong"}]',
  emailReceiptConsent: false,
};

async function sendRequest() {
  const startDate = new Date();
  const submitDate = new Date(startDate.getTime() + 1000);

  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const res = await axios.post(url, {
          ...data,
          startDate,
          submitDate,
        });
        resolve();
      } catch (e) {
        reject();
      }
    }, 0);
  });
}

async function main() {
  let total = 0;

  mainLoop: do {
    const res = await question(`How many requests do you want to send?${EOL}`);
    total = parseInt(res);
    bar.start(total, 0);

    for (let counter = 0; counter < total; ++counter) {
      try {
        const res = await sendRequest();
        bar.increment(1);
      } catch (e) {
        bar.stop();
        console.log("An erorr occured");
        break mainLoop;
      }
    }
  } while (true);
}

main();
