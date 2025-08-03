import http from "http";

const form = `
<html>
<head>
<title>Send message</title>
<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    min-height: 90vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    position: relative;
    overflow-x: hidden;
  }
  
  /* Animated background shapes */
  .bg-shapes {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    overflow: hidden;
  }
  
  .shape {
    position: absolute;
    border-radius: 50%;
    background: linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
    backdrop-filter: blur(10px);
    animation: float 6s ease-in-out infinite;
  }
  
  .shape:nth-child(1) {
    width: 200px;
    height: 200px;
    top: 10%;
    left: 10%;
    animation-delay: 0s;
  }
  
  .shape:nth-child(2) {
    width: 150px;
    height: 150px;
    top: 60%;
    right: 10%;
    animation-delay: 2s;
  }
  
  .shape:nth-child(3) {
    width: 100px;
    height: 100px;
    bottom: 20%;
    left: 20%;
    animation-delay: 4s;
  }
  
  .shape:nth-child(4) {
    width: 120px;
    height: 120px;
    top: 30%;
    right: 30%;
    animation-delay: 1s;
  }
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(-20px) rotate(180deg);
    }
  }
  
  /* Glassmorphism form container */
  .form-container {
    width: 90%;
    max-width: 600px;
    margin: 50px auto;
    padding: 40px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    border-radius: 25px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    position: relative;
    z-index: 1;
  }
  
  .form-container::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57);
    border-radius: 25px;
    z-index: -1;
    opacity: 0.3;
    animation: borderGlow 3s ease-in-out infinite alternate;
  }
  
  @keyframes borderGlow {
    0% {
      opacity: 0.3;
    }
    100% {
      opacity: 0.6;
    }
  }
  
  /* Form styling */
  form {
    width: 100%;
  }
  
  h1 {
    margin-bottom: 30px;
    font-size: 32px;
    font-weight: 600;
    background: linear-gradient(135deg, #667eea, #764ba2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-align: center;
    text-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  input, textarea {
    width: 100%;
    margin-bottom: 20px;
    padding: 15px 20px;
    border: none;
    border-radius: 15px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    color: #333;
    font-size: 16px;
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  input:focus, textarea:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 20px rgba(102, 126, 234, 0.3);
    transform: translateY(-2px);
  }
  
  input::placeholder, textarea::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
  
  input {
    height: 50px;
  }
  
  textarea {
    height: 200px;
    resize: vertical;
    min-height: 150px;
  }
  
  button {
    width: 100%;
    height: 55px;
    border: none;
    border-radius: 15px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  
  button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }
  
  button:hover::before {
    left: 100%;
  }
  
  button:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
  }
  
  button:active {
    transform: translateY(-1px);
  }
  
  #status {
    margin-top: 20px;
    text-align: center;
    font-weight: 500;
    padding: 10px;
    border-radius: 10px;
    transition: all 0.3s ease;
  }
  
  /* Loader styling */
  .loader {
    width: 30px;
    height: 30px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-top: 3px solid #667eea;
    border-radius: 50%;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: translate(-50%, -50%) rotate(0deg); }
    100% { transform: translate(-50%, -50%) rotate(360deg); }
  }
</style>
</head>
<body>
  <div class="bg-shapes">
    <div class="shape"></div>
    <div class="shape"></div>
    <div class="shape"></div>
    <div class="shape"></div>
  </div>
  
  <div class="form-container">
    <form method="post" action="/message">
      <h1>Send Message</h1>
      <input type="text" name="name" placeholder="Enter your name" required>
      <textarea name="message" placeholder="Enter your message" required></textarea>
      <button type="submit">Send Message</button>
      <p id="status"></p>
    </form>
  </div>
<script type="text/javascript">
  const status = document.querySelector("#status");
  const form = document.querySelector("form");
  let isSubmitting = false;
  
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    isSubmitting = true;
    
    // Show loader
    const loader = document.createElement("div");
    loader.className = "loader";
    const submitButton = document.querySelector("button");
    submitButton.style.display = "none";
    document.body.appendChild(loader);
    
    try {
      // Get form data
      const formData = new FormData(form);
      
      // Send POST request to /message
      const response = await fetch("/message", {
        method: "POST",
        body: formData
      });
      
      if (response.redirected) {
        // If server redirects, wait a bit to show loader, then follow the redirect
        setTimeout(() => {
          window.location.href = response.url;
        }, 2000); // 2 second delay to show loader
      } else if (response.ok) {
        // If no redirect, show success message
        status.style.color = "green";
        status.style.textAlign = "center";
        status.style.display = "block";
        status.textContent = "Message sent successfully!";
        form.reset();
        setTimeout(() => {
          status.style.display = "none";
        }, 3000);
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error:", error);
      status.style.color = "red";
      status.style.textAlign = "center";
      status.style.display = "block";
      status.textContent = "Error sending message. Please try again.";
    } finally {
      // Hide loader
      setTimeout(() => {
        isSubmitting = false;
        submitButton.style.display = "block";
        if (document.body.contains(loader)) {
          document.body.removeChild(loader);
        }
      }, 1000);
    }
  });
</script>
</body>
</html>
`;

const successPage = `
<html>
<head>
<title>Message Sent Successfully</title>
<style>
  body {
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 0;
    background-color: #f5f5f5;
  }
  .success-container {
    text-align: center;
    padding: 40px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 500px;
  }
  .success-icon {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: linear-gradient(135deg, #28a745, #20c997);
    margin: 0 auto 20px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
  }
  
  .success-icon::before {
    content: '';
    width: 30px;
    height: 15px;
    border: 3px solid white;
    border-top: none;
    border-right: none;
    transform: rotate(-45deg);
    margin-top: -3px;
  }
  h1 {
    color: #28a745;
    margin-bottom: 20px;
  }
  .back-button {
    display: inline-block;
    padding: 12px 24px;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    margin-top: 20px;
    transition: background-color 0.3s;
  }
  .back-button:hover {
    background-color: #0056b3;
  }
</style>
</head>
<body>
  <div class="success-container">
    <div class="success-icon"></div>
    <h1>Message Sent Successfully!</h1>
    <p>Your message has been received. Thank you for contacting us.</p>
    <a href="/" class="back-button">Back to Form</a>
  </div>
</body>
</html>
`;

const server = http.createServer((req, res) => {
  console.log(req.url);

  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(form);
  }

  if (req.url === "/message" && req.method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log("Received message:", parsedBody);

      // Redirect to success page
      res.writeHead(302, { Location: "/success" });
      res.end();
    });
  }

  if (req.url === "/success") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(successPage);
  }

  // Handle 404 for any other routes
  if (req.url !== "/" && req.url !== "/message" && req.url !== "/success") {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end(`
      <html>
      <head><title>404 - Page Not Found</title></head>
      <body>
        <h1>404 - Page Not Found</h1>
        <a href="/">Go back to home</a>
      </body>
      </html>
    `);
  }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
