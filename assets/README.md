# Assets Folder Structure

This folder contains all the images, documents, and media files for your portfolio website.

## 📁 Folder Organization

### `/images/`
- **`profile/`** - Your personal photos
  - `profile-photo.jpg` - Main profile picture for homepage and about page
  - `linkedin-photo.jpg` - LinkedIn profile photo (backup)

- **`thumbnails/`** - Project and video thumbnails
  - `business-analytics-thumbnail.jpg` - Thumbnail for Business Analytics CTA button
  - `video-production-thumbnail.jpg` - Thumbnail for Video Production CTA button
  - `excel-icon.jpg` - Excel project thumbnail
  - `tableau-icon.jpg` - Tableau project thumbnail
  - `python-icon.jpg` - Python project thumbnail
  - `r-icon.jpg` - R project thumbnail

### `/documents/`
- **`resume/`** - Resume and CV files
  - `joseph-korman-resume.pdf` - Your main resume PDF
  - `joseph-korman-cv.pdf` - Extended CV (optional)

- **`excel-projects/`** - Excel project files
  - `independent-projects/`
    - `yearly-budget.xlsx`
    - `job-application-record.xlsx`
    - `sports-standings.xlsx`
    - `leining-record.xlsx`
    - `grade-yourself.xlsx`
    - `page-numbers-koren.xlsx`
  - `business-projects/`
    - `residence-pivot-table.xlsx`
    - `klapore-salary-report.xlsx`
    - `frangold-real-estate-budget.xlsx`
    - `manola-financial-projection.xlsx`
    - `airport-revenue.xlsx`
    - `bank-account-managers.xlsx`
    - `billable-history.xlsx`
    - `budget-planning.xlsx`
    - `consolidated-expenses.xlsx`
    - `loan-payment-calculator.xlsx`
    - `mortgage-payment-calculator.xlsx`
    - `annual-payroll.xlsx`
    - `restaurant-supply.xlsx`
    - `sales-analysis-template.xlsx`
    - `shipment-logistics.xlsx`
    - `insurance-analysis.xlsx`
    - `physical-therapy-codes.xlsx`

### `/videos/`
- **`thumbnails/`** - Video thumbnail images
  - `independent/`
    - `airmatic-5000.jpg`
    - `leaf-in-river.jpg`
    - `view-club.jpg`
    - `methods-of-montage.jpg`
    - `nadav-short-film.jpg`
  - `freelance/`
    - `jlic-fundraiser.jpg`
    - `farber-class-2024.jpg`
    - `kaskeset-halftime.jpg`
    - `urology-holiday-dinner.jpg`
    - `goodbye-menoras.jpg`
  - `professional/`
    - `harpur-edge/`
    - `camp-sports/`
    - `wynn-productions/`

## 📋 File Naming Conventions

- Use lowercase letters
- Separate words with hyphens (-)
- Use descriptive names
- Keep file names under 50 characters
- Use appropriate file extensions (.jpg, .png, .pdf, .xlsx)

## 🖼️ Image Guidelines

### Profile Photos
- **Size**: 400x400 pixels minimum
- **Format**: JPG or PNG
- **File size**: Under 500KB
- **Quality**: High resolution, professional appearance

### Thumbnails
- **Size**: 400x300 pixels (4:3 aspect ratio)
- **Format**: JPG
- **File size**: Under 200KB
- **Quality**: Clear, representative of content

### Background Images
- **Size**: 1920x1080 pixels (Full HD)
- **Format**: JPG
- **File size**: Under 1MB
- **Quality**: High resolution, subtle/subtle enough for text overlay

## 📄 Document Guidelines

### Resume/CV
- **Format**: PDF
- **File size**: Under 2MB
- **Quality**: Print-ready, clear text

### Excel Projects
- **Format**: .xlsx
- **File size**: Under 5MB each
- **Quality**: Clean, professional formatting

## 🚀 How to Use

1. **Upload your files** to the appropriate folders
2. **Update the HTML files** to reference the new file paths
3. **Test the website** to ensure all links work
4. **Optimize file sizes** for faster loading

## 🔗 File Path Examples

After uploading files, update your HTML like this:

```html
<!-- Profile photo -->
<img src="assets/images/profile/profile-photo.jpg" alt="Joseph Korman">

<!-- Resume PDF -->
<iframe src="assets/documents/resume/joseph-korman-resume.pdf"></iframe>

<!-- Excel project download -->
<a href="assets/documents/excel-projects/independent-projects/yearly-budget.xlsx">Download</a>
```

## 💡 Tips

- **Compress images** before uploading (use TinyPNG or similar)
- **Test all links** after uploading
- **Keep backups** of your original files
- **Use consistent naming** across all files
- **Update file paths** in HTML when you add new files
