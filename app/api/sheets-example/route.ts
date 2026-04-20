/**
 * Example API route to fetch data from Google Sheets
 * Replace SHEET_ID and RANGE with your own values
 */

export async function GET() {
  try {
    // Example: Using Google Sheets API
    // Sheet ID from the URL: https://docs.google.com/spreadsheets/d/{SHEET_ID}
    const SHEET_ID = "YOUR_SHEET_ID_HERE";
    
    // Format: SheetName!A1:B10
    const RANGE = "Sheet1!A1:B10";
    
    // Get from: https://console.cloud.google.com/
    const API_KEY = process.env.GOOGLE_SHEETS_API_KEY;

    if (!API_KEY) {
      return Response.json(
        { error: "Google Sheets API key not configured" },
        { status: 400 }
      );
    }

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    return Response.json(data);
  } catch (error) {
    console.error("Sheets API error:", error);
    return Response.json({ error: "Failed to fetch sheets data" }, { status: 500 });
  }
}
