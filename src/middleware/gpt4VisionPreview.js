const OpenAI = require("openai");
const openai = new OpenAI();

async function main() {
  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "What is in this image?" },
          {
            type: "image_url",
            image_url: {
              url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
            },
          },
        ],
      },
    ],
  });
  console.log(response.choices[0]);
}

module.exports = {
  gpt4VisionPreview: main,
};
