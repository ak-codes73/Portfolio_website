# Aryan Kedar | Freelance Portfolio

A one-page, dark-theme portfolio. Plain HTML, CSS and vanilla JavaScript. No build step.

## Files

```
index.html          Main page
404.html            Not-found page
css/style.css       All styles
js/main.js          Contact constants, WhatsApp messages, POLICIES, behaviour
assets/favicon.svg  Favicon
assets/images/      Project screenshots
README.md           This file
```

## Run locally

Open `index.html` in a browser, or run a tiny server:

```
python3 -m http.server 8000
```

Then visit http://localhost:8000.

## Edit contact details

Open `js/main.js`. The constants are at the very top:

```js
const WHATSAPP_NUMBER = "917058868741";   // country code + number, no + or spaces
const EMAIL = "ak.codes73@gmail.com";
const INSTAGRAM = "https://instagram.com/introvertguy_73";
```

Every WhatsApp button, the email link, the Instagram link and the contact form use these values.

To change the pre-filled WhatsApp text for a button, edit `WA_MESSAGES` just below.

## Edit the policies

In `js/main.js`, find `POLICIES`. Each item has a `title` and `text`:

```js
{ title: "Revisions", text: "Includes 2 rounds of revisions." }
```

- Add an item to add a policy. Delete an item to remove it.
- If the array is empty, the whole Policies block is hidden.
- **Replace any text in [square brackets].** On localhost, those items show a yellow "to be completed" tag. The tag never shows on the live site, so check them before you deploy.
- Edit the starter policies before going live. Right now the timeline policy, the hosting and domain policy and the cancellation policy are short and informal. Make sure they say exactly what you want clients to rely on.

## Replace images

Put screenshots in `assets/images/` with these names:

- `kedar-farmhouse.jpg`
- `foodexpress.jpg`
- `my-shop-store.jpg`

The About section uses `assets/images/character.png`. Replace that file to change the character.

Use landscape images, about 1600x1000 for the project screenshots. If a file is missing, a dark placeholder shows instead. To use other names, change the `src` in `index.html`.

## Add a social preview image (optional)

Open Graph images need a full URL. After deploying, add this to the `<head>` of `index.html`:

```html
<meta property="og:image" content="https://YOUR-DOMAIN/assets/images/og-image.png">
<meta property="og:url" content="https://YOUR-DOMAIN/">
```

Use an image about 1200x630.

## Update the work cards

The Work section is a carousel (arrow buttons, dots, swipe on mobile). Add another project by copying one `<article class="card project">` block inside `#work-track`.

Project text, tags and links live in the Work section of `index.html`.
When "My Shop Store" is ready, replace its disabled "Coming soon" button with a link, like the other two cards.

## Deploy to Vercel via GitHub

1. Create a new repository on GitHub.
2. Upload this folder's contents, or from the terminal:
   ```
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/YOUR-USER/YOUR-REPO.git
   git push -u origin main
   ```
3. Go to vercel.com and sign in with GitHub.
4. Click **Add New > Project** and import the repository.
5. Framework Preset: **Other**. Leave build command and output directory empty.
6. Click **Deploy**.

Vercel serves `404.html` automatically for unknown URLs. Every push to `main` redeploys the site.

## Before going live checklist

- [ ] Add the three project screenshots
- [ ] Review and edit every policy in `POLICIES`
- [ ] Replace any [bracketed] policy text
- [ ] Check the WhatsApp number by clicking a button
- [ ] Confirm the three project links open correctly
- [ ] Add `og:image` and `og:url` after you know your final URL
- [ ] Check the site on your phone
