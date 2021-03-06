var express = require("express");
var fetch = require("node-fetch");
var router = express.Router();
const Customer = require("../models/customer");

const keycloakConfig = require("../tools/keycloak");

const startDeploy = async (domain, email) => {
  const startDeployProcess = await fetch(
    `http://host.docker.internal:30666/create-new-domain/${domain}`
  );
  const dataAboutDomain = await startDeployProcess.json();
  console.log("data About Domain", dataAboutDomain);

  await Customer.updateOne(
    { email },
    { $set: { domainUrl: dataAboutDomain.frontendUrl } }
  );

  await Customer.updateOne(
    { email },
    { $set: { deployedStatus: "Start deploy process" } }
  );
  setTimeout(async () => {
    await Customer.updateOne(
      { email },
      { $set: { deployedStatus: "Unzip libraries" } }
    );
  }, 1000);
  setTimeout(async () => {
    await Customer.updateOne(
      { email },
      { $set: { deployedStatus: "Setup database" } }
    );
  }, 2000);
  setTimeout(async () => {
    await Customer.updateOne(
      { email },
      { $set: { deployedStatus: "Init database" } }
    );
  }, 3000);
  setTimeout(async () => {
    await Customer.updateOne(
      { email },
      { $set: { deployedStatus: "Init admin credentials" } }
    );
  }, 7000);
  setTimeout(async () => {
    await Customer.updateOne(
      { email },
      { $set: { deployedStatus: "Setup profolio config" } }
    );
  }, 11000);
  setTimeout(async () => {
    await Customer.updateOne(
      { email },
      { $set: { deployedStatus: `Init ${domain} domain` } }
    );
  }, 16000);
  setTimeout(async () => {
    await Customer.updateOne({ email }, { $set: { deployedService: true } });
  }, 25000);
};

router.post("/keycloak-by-domain", async function (req, res) {
  try {
    const { domain } = req.body;
    const { access_token: token } = await keycloakConfig.getAdminToken();
    const customer = await Customer.findOne({ domainUrl: domain });

    let resultData = {};

    if (customer) {
      const userData = await keycloakConfig.getUser({
        email: customer.email,
        token,
        realmName: customer.keyCloakRealm,
      });
      resultData = {
        url: keycloakConfig["auth-server-url"],
        clientId: keycloakConfig.customerClientId,
        redirectUrl: domain,
        realm: customer.keyCloakRealm,
        redirectUrl: `${domain}?data=${customer.domain}`,
      };
    }

    res.status(200).json(resultData);
  } catch (e) {
    console.log("e", e);
    res.status(200).json({
      error: e.toString(),
    });
  }
});
router.post("/keycloak-by-username", async function (req, res) {
  try {
    const { email } = req.body;
    const { access_token: token } = await keycloakConfig.getAdminToken();
    const customers = await Customer.find({});

    let resultData = {};

    const waitingPromise = customers.map(async (customer) => {
      const userData = await keycloakConfig.getUser({
        email,
        token,
        realmName: customer.keyCloakRealm,
      });
      if (userData) {
        resultData = {
          url: keycloakConfig["auth-server-url"],
          clientId: keycloakConfig.customerClientId,
          redirectUrl: customer.domainUrl,
          realm: customer.keyCloakRealm,
          redirectUrl: `${customer.domainUrl}?data=${customer.domain}`,
        };
      }
    });

    await Promise.all(waitingPromise);
    res.status(200).json(resultData);
  } catch (e) {
    console.log("e", e);
    res.status(200).json({
      error: e.toString(),
    });
  }
});

router.post("/customer-registration", async function (req, res) {
  try {
    const { domain, email } = req.body;

    const customerByEmail = await Customer.findOne({ email });
    if (customerByEmail) {
      throw new Error("Customer already exist");
    }

    const customerByDomain = await Customer.findOne({ domain });
    if (customerByDomain) {
      throw new Error("Domain already exist");
    }
    function getRndInteger(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
    const registrationCode = `${getRndInteger(100000, 999999)}`;
    const realmName = `CUSTOMER_${domain}`;
    let newCustomer = new Customer({
      keyCloakRealm: realmName,
      domain,
      email,
      registrationCode,
      confirmedEmail: false,
      deployedService: false,
    });

    const { access_token } = await keycloakConfig.getAdminToken();

    const realmJson = keycloakConfig.getCustomerRealmJson();
    realmJson.realm = realmName;
    try {
      console.log('Delete realm');
      await keycloakConfig.deleteRealm(realmName, access_token);
    } catch (e) {
      console.log(e);
    }
    await keycloakConfig.createRealm(realmJson, access_token);

    const userData = await keycloakConfig.createNewUser({
      email,
      token: access_token,
      realmName: realmJson.realm,
    });

    const userId = userData.id;

    await keycloakConfig.confirmUserEmail({
      email,
      token: access_token,
      domain,
      userId,
      realmName: realmName,
      registrationCode,
    });

    newCustomer = await newCustomer.save();

    res.status(200).json({ ok: true, domain, email, newCustomer });
  } catch (e) {
    console.log(e);
    res.status(200).json({ error: e.toString() });
  }
});

router.get("/customer-get-all", async function (req, res) {
  const allCustomers = await Customer.find({});
  res.status(200).json(allCustomers);
});

router.get("/customer-delete-one", async function (req, res) {
  const customer = await Customer.findOne();
  if (!customer) {
    return res.status(200).json([]);
  }
  await customer.delete();
  const allCustomers = await Customer.find({});
  res.status(200).json(allCustomers);
});

router.post("/customer-get-one", async function (req, res) {
  try {
    const { email } = req.body;
    let customer = await Customer.findOne({ email });
    if (!customer || !customer.domain) {
      res.status(200).json([]);
    }
    const getCustomerInfo = async (domain, email) => {
      const customerByEmail = await Customer.findOne({ email });
      const customerByDomain = await Customer.findOne({ domain });
      return customerByEmail || customerByDomain;
    };
    customer = await getCustomerInfo(customer.domain);
    res.status(200).json(customer);
  } catch (e) {
    console.log(e);
    res.status(200).json({ error: e.toString() });
  }
});

const initTestData = async (req, res) => {
  const testCustomer =   {
    "email": "gerda@gmail.com",
    "domain": "gerda",
    "keyCloakRealm": "CUSTOMER_gerda",
    "registrationCode": "832080",
    "confirmedEmail": true,
    "deployedService": true,
    "domainUrl": "http://localhost:41010/",
    "deployedStatus": "done"
  }

  let customer = await Customer.findOne({ email: testCustomer.email });
  if (customer) {
    console.log('Test user exists');
    await customer.delete();
  }

  let newCustomer = new Customer(testCustomer);
  const { access_token } = await keycloakConfig.getAdminToken();
  const realmName = testCustomer.keyCloakRealm;

  const realmJson = keycloakConfig.getCustomerRealmJson();
  realmJson.realm = realmName;
  try {
    console.log('Delete realm');
    await keycloakConfig.deleteRealm(realmName, access_token);
  } catch (e) {
    console.log(e);
  }
 
  await keycloakConfig.createRealm(realmJson, access_token);

  const userData = await keycloakConfig.createNewUser({
    email: testCustomer.email,
    token: access_token,
    realmName: realmJson.realm,
  });

  const userId = userData.id;

  await keycloakConfig.confirmUserEmail({
    email: testCustomer.email,
    token: access_token,
    domain: testCustomer.domain,
    userId,
    realmName: realmName,
    registrationCode: testCustomer.registrationCode,
  });

  newCustomer = await newCustomer.save();
  console.log(testCustomer);

  res.status(200).json({message: 'Done'});
}

router.get('/init-test-data', initTestData);

router.post("/customer-confirm", async function (req, res) {
  try {
    const { email, registrationCode } = req.body;

    const customer = await Customer.findOne({ email, registrationCode });
    if (!customer) {
      throw new Error("Customer does not exist");
    }

    if (customer.confirmedEmail) {
      throw new Error("Already confirmed");
    }

    if (customer.deployedService) {
      return;
    }

    await Customer.updateOne({ email }, { $set: { confirmedEmail: true } });
    await startDeploy(customer.domain, customer.email);

    res.status(200).json({ ok: true });
  } catch (e) {
    console.log(e);
    res.status(200).json({ error: e.toString() });
  }
});

module.exports = router;
