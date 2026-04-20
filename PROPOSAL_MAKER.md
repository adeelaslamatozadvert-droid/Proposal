# 💼 Proposal Maker Guide

## Features

- **Dashboard**: Select services/items with checkboxes
- **Add Custom Items**: Create your own service items with prices
- **Live Preview**: See proposal update in real-time
- **Print/PDF**: Print directly or save as PDF from browser
- **Google Sheets Export**: Auto-save proposals to Google Sheets
- **Professional Template**: Beautiful, print-ready proposal format

## Quick Start

### 1. Access the App
Go to: `http://localhost:3000/proposal-maker`

### 2. Set Up Google Sheets (Optional)

If you want to export proposals to Google Sheets:

1. Create a new Google Sheet named "Proposals"
2. Add headers in the first row:
   - Column A: **Date**
   - Column B: **Client Name**
   - Column C: **Project Title**
   - Column D: **Services**
   - Column E: **Total**
   - Column F: **Notes**
   - Column G: **Valid Until**

3. Get your Google Sheets API key from [Google Cloud Console](https://console.cloud.google.com/)
4. Update `.env.local`:
   ```
   GOOGLE_SHEETS_API_KEY=your_key_here
   GOOGLE_SHEETS_ID=your_sheet_id_here
   ```

### 3. Create a Proposal

1. **Enter Client Info**
   - Client Name
   - Project Title
   - Valid Until (optional)

2. **Select Services**
   - Check boxes next to services you want to include
   - Prices update automatically
   - Total shows at the bottom

3. **Add Custom Items** (Optional)
   - Click "+ Add Item"
   - Enter name, price, and description
   - Click "Add"
   - Custom items appear under "Custom" category

4. **Add Notes**
   - Any additional notes or terms

5. **Preview & Export**
   - See proposal on the right side
   - Use "Print / Save as PDF" for PDF download
   - Use "Download HTML" for HTML file
   - Use "Export to Google Sheets" to save to your sheet

## Default Services

### Design
- Web Design - $1,500

### Development
- Web Development - $3,000
- Mobile Development - $4,000
- API Development - $2,000
- Database Setup - $1,000

### Marketing
- SEO Optimization - $800
- Content Writing - $600

### Support
- Maintenance & Support (3 months) - $1,200

## Tips

- **Add your company info**: Edit the "From" section in `app/components/ProposalPreview.tsx` to show your company details
- **Customize footer**: Update terms and conditions in the preview component
- **Save templates**: Keep useful proposals as HTML files for reference
- **Bulk export**: Google Sheets will collect all proposals for easy tracking

## Payments & Terms

The default proposal includes standard terms:
- 50% deposit to begin
- Balance due on completion
- Timeline starts after deposit

Edit these in `ProposalPreview.tsx` as needed.

## Troubleshooting

**"Google Sheets configuration not found"**
- Make sure `.env.local` has both API key and Sheet ID
- Restart the dev server after updating `.env.local`

**Export not working**
- Check that your Google Sheet has the right headers
- Verify the Sheet ID in `.env.local` is correct
- Ensure API key has Sheets API enabled

**PDF looks weird**
- Use Chrome/Edge for best print results
- Adjust margins in print dialog if needed

---

Happy proposing! 📝
