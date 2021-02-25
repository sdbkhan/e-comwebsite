const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51IOgsDHLrnSM26nS1X4kHVEl4sHTb6iEGUKGqtLCftWiyKtkbVGMPCG0DSfQkxFncZsk8381C8G4w3lR8eFv9CiZ00gPd6lZqc"
);
const { v4: uuidv4 } = require("uuid");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("welcome sln Shopping");
});
app.post("/checkout", async (req, res) => {
  let errors;
  let status;

  try {
    const { product, token } = req.body;
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    const key = uuidv4();
    const charge = await stripe.charges.create(
        { 
            amount:product.price*100,
            currency:"inr",
            customer:customer.id,
            receipt_email:token.eamil,
            description:"All products are genuine please let me know if you have any concerns",
            shipping:{
                name:token.card.name,
                address:{
                    line1:token.card.address_line1,
                    line2:token.card.address_line2,
                    city:token.card.address_city,
                    country:token.card.address_country,
                    postal_code:token.card.address_zip
                }
            }


        }, 
        { idempotencyKey: key });
        status="success";
  } catch (error) {
    console.log(error);
    status="fail";
  }
  res.json({status});
});
app.listen(8080, () => {
  console.log("running on port no 8080");
});
