const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("")); // folder gdje ti je index.html

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
