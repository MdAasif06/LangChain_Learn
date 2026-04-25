// process.stdin.on("data", (data) => {
//   console.log("You typed:", data.toString());
// });

process.stdout.write("Enter your name: ");
process.stdin.on("data", (data) => {
  const name = data.toString().trim();
  console.log("Hello", name);
});