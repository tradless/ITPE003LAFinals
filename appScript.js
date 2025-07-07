function doPost(e) {
  const sheet = SpreadsheetApp.openById('1S7J2_bf7n8M5wYI4o6iyeDevlIgdayRXoveob6F72YQ').getSheetByName('FormResponses');
  const data = e.parameter;

  // Handle specialtyTraits: always convert to comma-separated string
  let traitsArr = e.parameters.specialtyTraits;
  let traits = '';
  if (traitsArr) {
    if (Array.isArray(traitsArr)) {
      traits = traitsArr.join(', ');
    } else if (typeof traitsArr === 'string') {
      traits = traitsArr;
    }
  }

  sheet.appendRow([
    new Date(),
    data.umaMusumeName || '',
    data.trainerEmail || '',
    data.aspiration || '',
    data.preferredTrack || '',
    data.preferredDistance || '',
    data.preferredStyle || '',
    traits
  ]);

  return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
}

function doGet(e) {
  const sheet = SpreadsheetApp.openById('1S7J2_bf7n8M5wYI4o6iyeDevlIgdayRXoveob6F72YQ').getSheetByName('FormResponses');
  const data = sheet.getDataRange().getValues();

  const rows = data.slice(1).filter(row => row[1] && row[2]).map(row => ({
    date: row[0],
    umaMusumeName: row[1],
    trainerEmail: row[2],
    aspiration: row[3],
    preferredTrack: row[4],
    preferredDistance: row[5],
    preferredStyle: row[6],
    specialtyTraits: row[7]
  }));

  return ContentService.createTextOutput(JSON.stringify(rows)).setMimeType(ContentService.MimeType.JSON);
}