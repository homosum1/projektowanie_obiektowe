import { Builder, By, until } from "selenium-webdriver";
import { strictEqual, ok } from "assert";

const url = "http://localhost:3000";

const offer = {
  title: "test",
  organizationName: "organizacja",
  description: "opis",
  startDateTime: "2024-04-26T22:43",
  endDateTime: "2024-04-28T22:43",
  maximumValue: "5000",
};

const existingOffer = {
  title: "nazwa 1",
  organizationName: "organizacja 1",
  description: "opis aukcji 1",
  startDateTime: "4/28/2024, 7:54:52 PM",
  endDateTime: "5/2/2024, 7:54:52 PM",
  maximumValue: "5000",
};

const bid = {
  name: "testUser",
  value: 100,
}

function parseDate(dateString) {
  const components = dateString.split(/[\s,/,:]+/);

  const month = parseInt(components[0]) - 1;
  const day = parseInt(components[1]);
  const year = parseInt(components[2]);
  let hour = parseInt(components[3]);
  let minute = parseInt(components[4]);
  const ampm = components[5];

  if (ampm.toLowerCase() === "pm" && hour !== 12) {
    hour += 12;
  }

  return new Date(year, month, day, hour, minute);
}

async function navigationTest(url) {
  let driver = await new Builder().forBrowser("chrome").build();
  let errorMessage = "";

  try {
    await driver.get(url);

    await driver.wait(until.elementsLocated(By.css(".nav__element")), 5000);

    const navigationLinks = [
      { selector: 'a[href="/"]', expectedUrl: `${url}/` },
      {
        selector: 'a[href="/auctions/active-auctions"]',
        expectedUrl: `${url}/auctions/active-auctions`,
      },
      {
        selector: 'a[href="/auctions/inactive-auctions"]',
        expectedUrl: `${url}/auctions/inactive-auctions`,
      },
      {
        selector: 'a[href="/auctions/add-auction"]',
        expectedUrl: `${url}/auctions/add-auction`,
      },
    ];

    for (const link of navigationLinks) {
      await driver.findElement(By.css(link.selector)).click();

      await driver.wait(until.urlIs(link.expectedUrl), 5000);

      const currentUrl = await driver.getCurrentUrl();
      strictEqual(
        currentUrl,
        link.expectedUrl,
        `Przejście do ${link.expectedUrl} nie udało się, otrzymano podstronę: ${currentUrl}`
      );

      // await driver.navigate().back();
    }
  } catch (error) {
    errorMessage = error.message;
  } finally {
    await driver.quit();
  }

  if (!errorMessage) console.log("navigationTest ✅");
  else console.log("navigationTest ❌ - " + errorMessage);
}

async function webTitleTest(url) {
  let driver = await new Builder().forBrowser("chrome").build();
  let errorMessage = "";

  try {
    await driver.get(url);

    const pageTitle = await driver.getTitle();
    strictEqual(pageTitle, "Przetargi.com");
  } catch (error) {
    errorMessage = error.message;
  } finally {
    await driver.quit();
  }

  if (!errorMessage) console.log("webTitleTest ✅");
  else console.log("webTitleTest ❌ - " + errorMessage);
}

async function homePageHeadersDisplay(url) {
  let driver = await new Builder().forBrowser("chrome").build();
  let errorMessage = "";

  try {
    await driver.get(url);

    const mainLanding = await driver.findElement(By.className("main__landing"));
    await driver.wait(until.elementIsVisible(mainLanding), 5000);

    const headers = await driver.findElements(
      By.className("main__landing__description__header")
    );

    const requiredHeaders = [
      "Informacje o stronie:",
      "Dostępne funkjonalności:",
    ];

    for (let i = 0; i < headers.length; i++) {
      const text = await headers[i].getText();
      strictEqual(
        text,
        requiredHeaders[i],
        `nieprawidłowe nagłówki - otrzymano: ${text} oczekiwano: ${requiredHeaders[i]}`
      );
    }
  } catch (error) {
    errorMessage = error.message;
  } finally {
    await driver.quit();
  }

  if (!errorMessage) console.log("homePageHeadersDisplay ✅");
  else console.log("homePageHeadersDisplay ❌ - " + errorMessage);
}

async function homePageTextBoxesDisplay(url) {
  let driver = await new Builder().forBrowser("chrome").build();
  let errorMessage = "";

  try {
    await driver.get(url);

    const mainLanding = await driver.findElement(By.className("main__landing"));

    await driver.wait(until.elementIsVisible(mainLanding), 5000);

    const texts = await driver.findElements(
      By.className("main__landing__description__text")
    );

    const expectedTextsCnt = 2;

    strictEqual(
      texts.length,
      expectedTextsCnt,
      `nieprawidłowa liczba pól tekstowych. Otrzymano: ${texts.length}, oczekiwano: ${expectedTextsCnt}`
    );
  } catch (error) {
    errorMessage = error.message;
  } finally {
    await driver.quit();
  }

  if (!errorMessage) console.log("homePageTextBoxesDisplay ✅");
  else console.log("homePageTextBoxesDisplay ❌ - " + errorMessage);
}

async function homePageFunctionalitiesDisplay(url) {
  let driver = await new Builder().forBrowser("chrome").build();
  let errorMessage = "";

  try {
    await driver.get(url);

    const funcListComponent = await driver.findElement(
      By.css(".main__landing__description__text ul")
    );

    await driver.wait(until.elementIsVisible(funcListComponent), 5000);

    const expectedListItemsLen = 4;
    const listItems = await driver.findElements(
      By.css(".main__landing__description__text ul li")
    );

    strictEqual(
      listItems.length,
      expectedListItemsLen,
      `nieprawidłowa długość listy funkcjonalności - otrzymano: ${listItems.length}, oczekiwano: ${expectedListItemsLen}`
    );

    const expectedTitles = [
      "Strona główna",
      "Lista przetargów",
      "Przetargi",
      "Dodaj przetarg",
    ];

    for (let i = 0; i < listItems.length; i++) {
      const titleText = await listItems[i].findElement(By.css("b")).getText();
      strictEqual(
        titleText,
        expectedTitles[i],
        `Tytuł funkcjonalności ${
          i + 1
        } nie jest prawidlowy - otrzymano: ${titleText}, oczekiwano: ${
          expectedTitles[i]
        }`
      );
    }
  } catch (error) {
    errorMessage = error.message;
  } finally {
    await driver.quit();
  }

  if (!errorMessage) console.log("correctActiveEndDatesDisplayed ✅");
  else console.log("correctActiveEndDatesDisplayed ❌ - " + errorMessage);
}

async function addOfferPageFormDisplay(url) {
  let driver = await new Builder().forBrowser("chrome").build();
  let errorMessage = "";

  try {
    await driver.get(`${url}/auctions/add-auction`);

    const form = await driver.findElement(
      By.className("main__landing__description__form-box")
    );
    await driver.wait(until.elementIsVisible(form), 5000);

    const expectedFields = [
      "input#title",
      "input#organizationName",
      "textarea#description",
      "input#startDateTime",
      "input#endDateTime",
      "input#maximumValue",
      'button[type="submit"]',
    ];

    for (let expectedField of expectedFields) {
      const field = await driver.findElement(By.css(expectedField));
      ok(field, `Nie znaleziono pola formularza: ${expectedField} `);
    }
  } catch (error) {
    errorMessage = error.message;
  } finally {
    await driver.quit();
  }

  if (!errorMessage) console.log("addOfferPageFormDisplay ✅");
  else console.log("addOfferPageFormDisplay ❌ - " + errorMessage);
}

// tu powinien byc obiekt podawany "offer"
async function addingOffer(offer, url) {
  let driver = await new Builder().forBrowser("chrome").build();
  let errorMessage = "";

  try {
    await driver.get(`${url}/auctions/add-auction`);

    const form = await driver.findElement(
      By.className("main__landing__description__form-box")
    );
    await driver.wait(until.elementIsVisible(form), 5000);

    await driver.findElement(By.id("title")).sendKeys(offer.title);
    await driver
      .findElement(By.id("organizationName"))
      .sendKeys(offer.organizationName);
    await driver.findElement(By.id("description")).sendKeys(offer.description);
    await driver
      .findElement(By.id("startDateTime"))
      .sendKeys(offer.startDateTime);
    await driver.findElement(By.id("endDateTime")).sendKeys(offer.endDateTime);
    await driver
      .findElement(By.id("maximumValue"))
      .sendKeys(offer.maximumValue);

    await driver.findElement(By.css('button[type="submit"]')).click();

    await driver.wait(until.urlIs(url + "/auctions/add-auction-form"), 5000);

    const currentUrl = await driver.getCurrentUrl();

    strictEqual(
      currentUrl,
      url + "/auctions/add-auction-form",
      "Przekierowanie do strony strony z potwierdzieniem transakcji nie powiodło się"
    );

    const messageElement = await driver.findElement(
      By.css(".main__landing__description__header")
    );
    const messageText = await messageElement.getText();

    const expectedMessage = "Twoja oferta została dodana";
    strictEqual(
      messageText,
      expectedMessage,
      `Wyświetlono wiadomość: ${messageText}, oczekiwano: ${expectedMessage}`
    );
  } catch (error) {
    errorMessage = error.message;
  } finally {
    await driver.quit();
  }

  if (!errorMessage) console.log("addingOffer ✅");
  else console.log("addingOffer ❌ - " + errorMessage);
}

async function activeOfferPageDisplay(url) {
  let driver = await new Builder().forBrowser("chrome").build();
  let errorMessage = "";

  try {
    await driver.get(`${url}/auctions/active-auctions`);

    const headerText = await driver
      .findElement(By.className("main__landing__description__header"))
      .getText();
    strictEqual(
      headerText,
      "Lista aktualnie trwających przetargów:",
      "Nieprawidłowa nagłówek aktywnych przetargów"
    );

    const thElements = await driver.findElements(
      By.css(".main__landing__description__array table thead th")
    );
    const expectedThTexts = [
      "Lp.",
      "Nazwa przetargu",
      "Data i Godzina Rozpoczęcia",
      "Data i Godzina Zakończenia",
    ];

    for (let i = 0; i < thElements.length; i++) {
      const thText = await thElements[i].getText();
      strictEqual(
        thText,
        expectedThTexts[i],
        `Nagłówek aktywnych ogłoszeń nieprawidłowy. Oczekiwano: ${expectedThTexts[i]} otrzymano: ${thText}`
      );
    }
  } catch (error) {
    errorMessage = error.message;
  } finally {
    await driver.quit();
  }

  if (!errorMessage) console.log("activeOfferPageDisplay ✅");
  else console.log("activeOfferPageDisplay ❌ - " + errorMessage);
}

async function displayingAddedOfferTitle(offer, url) {
  let driver = await new Builder().forBrowser("chrome").build();
  let errorMessage = "";

  try {
    await driver.get(`${url}/auctions/active-auctions`);

    const offerTitleElements = await driver.findElements(
      By.xpath(`//table/tbody/tr/td/a[contains(text(), "${offer.title}")]`)
    );

    ok(offerTitleElements[0], "element offerTitleElements[0] nie istnieje");

    strictEqual(
      await offerTitleElements[0].getText(),
      offer.title,
      `Oferta o nazwie: "${offer.title}" nie została znaleziona`
    );
  } catch (error) {
    errorMessage = error.message;
  } finally {
    await driver.quit();
  }

  if (!errorMessage) console.log("displayingAddedOfferTitle ✅");
  else console.log("displayingAddedOfferTitle ❌ - " + errorMessage);
}

async function displayingAddedOfferStartDate(offer, url) {
  let driver = await new Builder().forBrowser("chrome").build();
  let errorMessage = "";

  try {
    await driver.get(`${url}/auctions/active-auctions`);

    const offerStartDateTimeElement = await driver.findElements(
      By.xpath(
        `//table/tbody/tr/td[contains(text(), "${offer.startDateTime}")]`
      )
    );

    ok(
      offerStartDateTimeElement[0],
      "element offerStartDateTimeElement[0] nie istnieje"
    );

    strictEqual(
      await offerStartDateTimeElement[0].getText(),
      offer.startDateTime,
      `Oferta z szukaną datą rozpoczęcia: "${offer.startDateTime}" nie została znaleziona`
    );
  } catch (error) {
    errorMessage = error.message;
  } finally {
    await driver.quit();
  }

  if (!errorMessage) console.log("displayingAddedOfferStartDate ✅");
  else console.log("displayingAddedOfferStartDate ❌ - " + errorMessage);
}

async function displayingAddedOfferEndDate(offer, url) {
  let driver = await new Builder().forBrowser("chrome").build();

  let errorMessage = "";

  try {
    await driver.get(`${url}/auctions/active-auctions`);

    const offerEndDateTimeElements = await driver.findElements(
      By.xpath(`//table/tbody/tr/td[contains(text(), "${offer.endDateTime}")]`)
    );

    ok(
      offerEndDateTimeElements[0],
      "element offerEndDateTimeElements[0] nie istnieje"
    );

    strictEqual(
      await offerEndDateTimeElements[0].getText(),
      offer.endDateTime,
      `Oferta z szukaną datą zakończenia: "${offer.endDateTime}" nie została znaleziona`
    );
  } catch (error) {
    errorMessage = error.message;
  } finally {
    await driver.quit();
  }

  if (!errorMessage) console.log("displayingAddedOfferEndDate ✅");
  else console.log("displayingAddedOfferEndDate ❌ - " + errorMessage);
}

async function correctActiveStartDatesDisplayed(url) {
  let driver = await new Builder().forBrowser("chrome").build();

  let errorMessage = "";

  try {
    await driver.get(`${url}/auctions/active-auctions`);

    const arrayElements = await driver.findElements(
      By.xpath(`//table/tbody/tr`)
    );
    for (let element of arrayElements) {
      const rowText = await element.getText();
      const rows = rowText.split(" ");

      let combinedDate = rows[3] + rows[4] + rows[5];

      let inputedDate = parseDate(combinedDate);

      const currentDate = new Date();

      // validate date object
      const isValidDate = !isNaN(currentDate.getTime());
      ok(isValidDate, "Data wyświetlana w nieprawidłowym formacie");

      // validate date
      const isBeforeCurrentDate = inputedDate < currentDate;
      strictEqual(
        isBeforeCurrentDate,
        true,
        `${combinedDate} jest przed dzisiejszą datą.`
      );
    }
  } catch (error) {
    errorMessage = error.message;
  } finally {
    await driver.quit();
  }

  if (!errorMessage) console.log("correctActiveStartDatesDisplayed ✅");
  else console.log("correctActiveStartDatesDisplayed ❌ - " + errorMessage);
}

async function correctActiveEndDatesDisplayed(url) {
  let driver = await new Builder().forBrowser("chrome").build();
  let errorMessage = "";

  try {
    await driver.get(`${url}/auctions/active-auctions`);

    const arrayElements = await driver.findElements(
      By.xpath(`//table/tbody/tr`)
    );

    for (let element of arrayElements) {
      const rowText = await element.getText();
      const rows = rowText.split(" ");

      let combinedDate = rows[6] + rows[7] + rows[8];

      let inputedDate = parseDate(combinedDate);

      const currentDate = new Date();

      // validate date object
      const isValidDate = !isNaN(currentDate.getTime());
      ok(isValidDate, "Data wyświetlana w nieprawidłowym formacie");

      // validate date
      const isAfterCurrentDate = inputedDate > currentDate;
      strictEqual(
        isAfterCurrentDate,
        true,
        `${combinedDate} jest po dzisiejszej dacie.`
      );
    }
  } catch (error) {
    errorMessage = error.message;
  } finally {
    await driver.quit();
  }

  if (!errorMessage) console.log("correctActiveEndDatesDisplayed ✅");
  else console.log("correctActiveEndDatesDisplayed ❌ - " + errorMessage);
}

async function checkActiveOffersLinks(url) {
  let driver = await new Builder().forBrowser("chrome").build();
  let errorMessage = "";

  try {
    await driver.get(`${url}/auctions/active-auctions`);

    let links = await driver.findElements(By.css('.main__landing__description__array table tbody tr td a'));

    for (let link of links) {
      let href = await link.getAttribute('href');

      const match = href.match(/\/auctions\/auction\/(\d+)$/);

      const isValidLink = (match && match[1]);
      ok(isValidLink, `Nieprawidłowa struktura linku: ${href}`);

      const id = parseInt(match[1]);
      const validID = !isNaN(id) && Number.isInteger(id);
      ok(validID, `Nieprawidłowe id przekierowania: ${href}`);
    } 

  } catch (error) {
    errorMessage = error.message;
  } finally {
    await driver.quit();
  }

  if (!errorMessage) console.log("checkActiveOffersLinks ✅");
  else console.log("checkActiveOffersLinks ❌ - " + errorMessage);
}

async function visitActiveOffersLinks(url) {
  let driver = await new Builder().forBrowser("chrome").build();
  let errorMessage = "";
  
  try {
    await driver.get(`${url}/auctions/active-auctions`);

    let links = await driver.findElements(By.css('.main__landing__description__array table tbody tr td a'));
    let hrefs = [];

    for (let link of links) {
      let href = await link.getAttribute('href');
      hrefs.push(href);
    } 

    for (let href of hrefs) {
      
      await driver.get(href);

      let preTags = await driver.findElements(By.css('pre'));

      if (preTags.length > 0) {
        let errorMessage = `Cannot GET ${href}`;
        const errorDisplayed = (await preTags[0].getText()) === errorMessage;
        ok(!errorDisplayed, `Nie udało się przekierować do linku: ${errorDisplayed}`);
      }

      await driver.get(`${url}/auctions/active-auctions`);
    }


  } catch (error) {
    errorMessage = error.message;
  } finally {
    await driver.quit();
  }

  if (!errorMessage) console.log("visitActiveOffersLinks ✅");
  else console.log("visitActiveOffersLinks ❌ - " + errorMessage);
}

async function validateOfferPage(url) {
  let driver = await new Builder().forBrowser("chrome").build();
  let errorMessage = "";
  
  try {
    await driver.get(`${url}/auctions/auction/1`);

    await driver.wait(until.elementLocated(By.css('.main__landing__description')), 5000);

    async function checkElementExists(selector) {
      let elements = await driver.findElements(By.xpath(`//p[strong/span[contains(text(), '${selector}')]]`));
      ok(elements, `Element przetargu: ${selector} nie znaleziony.`);
    }

    await checkElementExists("Opis przetargu:");
    await checkElementExists("Organizacja zamawiająca:");
    await checkElementExists("Data rozpoczęcia:");
    await checkElementExists("Data zakończenia:");

  } catch (error) {
    errorMessage = error.message;
  } finally {
    await driver.quit();
  }

  if (!errorMessage) console.log("validateOfferPage ✅");
  else console.log("validateOfferPage ❌ - " + errorMessage);
}

async function validateOfferPageData(offer, url) {
  let driver = await new Builder().forBrowser("chrome").build();
  let errorMessage = "";
  
  try {
    await driver.get(`${url}/auctions/auction/1`);

    await driver.wait(until.elementLocated(By.css('.main__landing__description')), 5000);

    
    let titleElement = await driver.findElement(By.css('.main__landing__description__data-box h3'));
    let title = await titleElement.getText();
    console.assert(title === offer.title, `Oczekiwano nazwy aukcji: ${offer.title}, otrzymano: '${title}'`);

    const pPoints = await driver.findElements(By.css('.main__landing__description__data-box p'));

    const prefixes = ["Opis przetargu:", "Organizacja zamawiająca:", "Data rozpoczęcia:", "Data zakończenia:"];
    const acqData = [];

    const expectedData = [offer.description, offer.organizationName, offer.startDateTime, offer.endDateTime];

    for (let i = 0; i < pPoints.length; i++) {
      const text = await pPoints[i].getText();
      acqData.push(text);
    }

    for (let i=0; i < prefixes.length; i++) {
      const fullData = "subdirectory_arrow_right" + prefixes[i]+ " " + expectedData[i];
      strictEqual(fullData, acqData[i], `Nieprawidłowe dane zamówienia, oczekiwano: ${fullData}, otrzymano: ${fullData}`);
    }

  } catch (error) {
    errorMessage = error.message;
  } finally {
    await driver.quit();
  }

  if (!errorMessage) console.log("validateOfferPageData ✅");
  else console.log("validateOfferPageData ❌ - " + errorMessage);
}

async function addOfferButtonCheck(url) {
  let driver = await new Builder().forBrowser("chrome").build();
  let errorMessage = "";
  
  try {
    await driver.get(`${url}/auctions/auction/1`);

    await driver.wait(until.elementLocated(By.css('.main__landing__description')), 5000);

    const button = await driver.findElements(By.linkText("Złóż ofertę"));

    const buttonFound = button.length > 0;
    ok(buttonFound, 'Nie znaleziono przycisku');

  } catch (error) {
    errorMessage = error.message;
  } finally {
    await driver.quit();
  }

  if (!errorMessage) console.log("addOfferButtonCheck ✅");
  else console.log("addOfferButtonCheck ❌ - " + errorMessage);
}

async function redirectAddOfferButton(url) {
  let driver = await new Builder().forBrowser("chrome").build();
  let errorMessage = "";
  
  try {
    await driver.get(`${url}/auctions/auction/1`);

    await driver.wait(until.elementLocated(By.css('.main__landing__description')), 5000);

    const button = await driver.findElements(By.linkText("Złóż ofertę"));

    if(button.length > 0) {
      button[0].click();

      const expectedUrl = `${url}/offer/show-submit-offer/1`;
      await driver.wait(until.urlIs(expectedUrl), 5000);

      const currentUrl = await driver.getCurrentUrl();
      
      strictEqual(
        currentUrl,
        expectedUrl,
        `Przejście do ${expectedUrl} nie udało się, otrzymano podstronę: ${currentUrl}`
      );

    }

  } catch (error) {
    errorMessage = error.message;
  } finally {
    await driver.quit();
  }

  if (!errorMessage) console.log("redirectAddOfferButton ✅");
  else console.log("redirectAddOfferButton ❌ - " + errorMessage);
}

async function addBid(bid, url) {
  let driver = await new Builder().forBrowser("chrome").build();
  let errorMessage = "";
  
  try {
    await driver.get(`${url}/offer/show-submit-offer/1`);

    await driver.wait(until.elementLocated(By.css('.main__landing__description__form-box')), 10000);
        
    const nameInput = await driver.findElement(By.name('name'));
    await nameInput.sendKeys(bid.name);
    
    const valueInput = await driver.findElement(By.name('value'));
    await valueInput.sendKeys(bid.value);

    const submitButton = await driver.findElement(By.css('button[type="submit"]'));
    await submitButton.click();


    const expectedUrl = `${url}/offer/submit-offer/1`;
    await driver.wait(until.urlIs(expectedUrl), 5000);

    const currentUrl = await driver.getCurrentUrl();
    
    strictEqual(
      currentUrl,
      expectedUrl,
      `Przejście do ${expectedUrl} nie udało się, otrzymano podstronę: ${currentUrl}`
    );

  
  } catch (error) {
    errorMessage = error.message;
  } finally {
    await driver.quit();
  }

  if (!errorMessage) console.log("addBid ✅");
  else console.log("addBid ❌ - " + errorMessage);
}


async function displayingExpiredOffer(url) {
  let driver = await new Builder().forBrowser("chrome").build();
  let errorMessage = "";
  
  try {
    await driver.get(`${url}/auctions/auction/1`);


  } catch (error) {
    errorMessage = error.message;
  } finally {
    await driver.quit();
  }

  if (!errorMessage) console.log("correctActiveEndDatesDisplayed ✅");
  else console.log("correctActiveEndDatesDisplayed ❌ - " + errorMessage);
}




await navigationTest(url);
await webTitleTest(url);

await homePageHeadersDisplay(url);
await homePageTextBoxesDisplay(url);
await homePageFunctionalitiesDisplay(url);

await addOfferPageFormDisplay(url);
await addingOffer(offer, url);
await activeOfferPageDisplay(url);
await displayingAddedOfferTitle(existingOffer, url);
await displayingAddedOfferStartDate(existingOffer, url);
await displayingAddedOfferEndDate(existingOffer, url);
await correctActiveStartDatesDisplayed(url);
await correctActiveEndDatesDisplayed(url);
await checkActiveOffersLinks(url);
await visitActiveOffersLinks(url);

await validateOfferPage(url);
await validateOfferPageData(existingOffer, url);
await addOfferButtonCheck(url);
await redirectAddOfferButton(url);
await addBid(bid, url);