# Joseph Korman Portfolio Website

A modern, responsive portfolio website showcasing business analytics and video production work.

## Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Interactive Elements**: Video modals, filtering systems, and contact forms
- **SEO Optimized**: Proper meta tags and semantic HTML structure
- **Fast Loading**: Optimized images and efficient CSS/JavaScript

## Pages

1. **Home** (`index.html`) - Landing page with hero section and CTA buttons
2. **About** (`about.html`) - Personal bio and skills showcase
3. **Business Analytics** (`business-analytics.html`) - Excel projects and data analysis work
4. **Video Production** (`video-production.html`) - Categorized video portfolio
5. **Resume** (`resume.html`) - PDF embed and skills breakdown
6. **Contact** (`contact.html`) - Contact form and social media links

## Setup Instructions

### 1. Update Personal Information

Before deploying, update the following:

- **Profile Image**: Replace the LinkedIn image URL in all HTML files with your actual profile photo
- **Resume PDF**: Upload your resume PDF and update the iframe source in `resume.html`
- **Project Files**: Add actual download links for your Excel projects in `business-analytics.html`
- **Contact Email**: The contact form is set to send emails to `josephkorman79@gmail.com`

### 2. Deploy to GitHub Pages

1. Create a new GitHub repository
2. Upload all files to the repository
3. Go to Settings > Pages
4. Select "Deploy from a branch" and choose "main"
5. Your site will be available at `https://yourusername.github.io/repository-name`

### 3. Custom Domain (Optional)

To use a custom domain:
1. Add a `CNAME` file with your domain name
2. Update DNS settings to point to GitHub Pages
3. Enable HTTPS in repository settings

## File Structure

```
portfolio/
├── index.html              # Homepage
├── about.html              # About page
├── business-analytics.html # Analytics projects
├── video-production.html   # Video portfolio
├── resume.html             # Resume page
├── contact.html            # Contact page
├── styles.css              # Main stylesheet
├── script.js               # JavaScript functionality
└── README.md               # This file
```

## Customization

### Colors
The website uses a blue color scheme. To change colors, update the CSS variables in `styles.css`:
- Primary: `#2563eb`
- Secondary: `#1d4ed8`
- Text: `#1f2937`
- Background: `#ffffff`

### Fonts
Currently using Inter font from Google Fonts. To change, update the font import in HTML files.

### Images
- Replace placeholder images with your actual photos
- Optimize images for web (use tools like TinyPNG)
- Ensure images are properly sized for different screen resolutions

## Features Explained

### Video Portfolio
- Videos are embedded using YouTube/Vimeo iframes
- Clicking thumbnails opens videos in modal overlays
- Categories can be filtered using the category buttons
- Professional work is further subdivided by company and format

### Business Analytics
- Projects are organized by software (Excel, Tableau, R, Python)
- Each project has a description and download link
- "Coming Soon" sections for future content

### Contact Form
- Uses mailto links to open user's email client
- Pre-fills subject and body with form data
- Includes social media links for additional contact methods

### Responsive Design
- Mobile-first approach
- Hamburger menu for mobile navigation
- Flexible grid layouts that adapt to screen size
- Touch-friendly buttons and links

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Tips

1. **Optimize Images**: Compress images before uploading
2. **Minify CSS/JS**: Use tools to minify files for production
3. **Enable Caching**: Set up proper cache headers
4. **Use CDN**: Consider using a CDN for faster loading

## Maintenance

- Regularly update project links and descriptions
- Add new videos and projects as they become available
- Monitor website performance and loading times
- Keep contact information current

## Support

For questions or issues with the website, contact josephkorman79@gmail.com

## License

This portfolio website is for personal use. All rights reserved.

