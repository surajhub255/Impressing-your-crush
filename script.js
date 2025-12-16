function moveRandomEl(elm) {
    elm.style.position = "absolute";
    elm.style.top = Math.floor(Math.random() * 90 + 5) + "%";
    elm.style.left = Math.floor(Math.random() * 90 + 5) + "%";
  }
  
  const moveRandom = document.querySelector("#move-random");
  
  moveRandom.addEventListener("mouseenter", function (e) {
    moveRandomEl(e.target);
  });

// Function to send SMS to your phone
function sendSMS() {
  // IMPORTANT: Do NOT commit credentials directly!
  // Use environment variables or a backend service instead
  const phoneNumber = process.env.PHONE_NUMBER || "+918210572463"; // Your phone number
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioNumber = process.env.TWILIO_PHONE_NUMBER;
  
  // Create the message
  const message = "Someone said YES! 🎉";
  
  // Send SMS via Twilio API
  fetch("https://api.twilio.com/2010-04-01/Accounts/" + accountSid + "/Messages.json", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": "Basic " + btoa(accountSid + ":" + authToken)
    },
    body: new URLSearchParams({
      "From": twilioNumber,
      "To": phoneNumber,
      "Body": message
    })
  })
  .then(async response => {
    if (!response.ok) {
      const text = await response.text().catch(() => "<no body>");
      console.error("SMS request failed:", response.status, response.statusText, text);
      // still redirect after logging the error
      window.location.href = "yes.html";
      return;
    }

    // success
    console.log("SMS sent successfully!", response.status, response.statusText);
    // Redirect to yes.html after sending SMS
    setTimeout(() => {
      window.location.href = "yes.html";
    }, 500);
  })
  .catch(error => {
    console.error("Network or fetch error when sending SMS:", error);
    // Still redirect even if SMS fails
    window.location.href = "yes.html";
  });
}