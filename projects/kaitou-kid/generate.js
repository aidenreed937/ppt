const pptxgen = require('pptxgenjs');
const html2pptx = require('../../.claude/skills/pptx/scripts/html2pptx');
const path = require('path');

const SLIDES_DIR = path.join(__dirname, 'slides');
const IMAGES_DIR = path.join(__dirname, 'images');
const OUTPUT_DIR = path.join(__dirname, 'output');

// Image mapping for each slide
const slideConfig = [
  { html: 'slide01-cover.html', image: '{EA85359D-DE39-E0D5-C52E-E8D6C4BBF092}.jpg', placeholder: 'cover-image' },
  { html: 'slide02-contents.html', image: null },
  { html: 'slide03-profile.html', image: '{3B5B7558-F4DD-6356-70A0-503720698782}.jpg', placeholder: 'profile-image' },
  { html: 'slide04-abilities.html', image: '{0F22DCBA-A8DA-5E57-94B3-F0AE7D7402C2}.jpg', placeholder: 'abilities-image' },
  { html: 'slide05-moonlight.html', image: '{EA85359D-DE39-E0D5-C52E-E8D6C4BBF092}.jpg', placeholder: 'moonlight-image' },
  { html: 'slide06-notice.html', image: '{ED8F7436-5236-4343-3C35-52112380FEF1}.jpg', placeholder: 'notice-image' },
  { html: 'slide07-vs-conan.html', image: '{02400D21-E714-1F3C-502B-D52284960E21}.jpg', placeholder: 'vs-conan-image' },
  { html: 'slide08-relationship.html', image: '{706C239B-2195-CDEC-32C6-6B22E9052A04}.jpg', placeholder: 'relation-image' },
  { html: 'slide09-network.html', image: '{60DCC378-8838-37B2-B08D-75ADFC3C3F72}.jpg', placeholder: 'center-kid' },
  { html: 'slide10-costume.html', image: '{BA76D452-09DE-3490-7497-5A2E43D23C19}.jpg', placeholder: 'costume-image' },
  { html: 'slide11-elements.html', image: '{3B5B7558-F4DD-6356-70A0-503720698782}.jpg', placeholder: 'symbol-image' },
  { html: 'slide12-ending.html', image: '{F48F2551-DCDA-3CC7-6AC6-59D5CF72DB31}.jpg', placeholder: 'ending-image' },
];

async function createPresentation() {
  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_16x9';
  pptx.title = '怪盗基德 - 角色介绍';
  pptx.author = 'Claude';

  for (let i = 0; i < slideConfig.length; i++) {
    const config = slideConfig[i];
    console.log(`Processing slide ${i + 1}: ${config.html}`);

    try {
      const htmlPath = path.join(SLIDES_DIR, config.html);
      const { slide, placeholders } = await html2pptx(htmlPath, pptx);

      // Add image if configured
      if (config.image && config.placeholder) {
        const imagePath = path.join(IMAGES_DIR, config.image);
        const placeholder = placeholders.find(p => p.id === config.placeholder);

        if (placeholder) {
          slide.addImage({
            path: imagePath,
            x: placeholder.x,
            y: placeholder.y,
            w: placeholder.w,
            h: placeholder.h,
            sizing: { type: 'cover', w: placeholder.w, h: placeholder.h }
          });
        } else {
          console.warn(`  Placeholder '${config.placeholder}' not found, skipping image`);
        }
      }

      console.log(`  Slide ${i + 1} completed`);
    } catch (err) {
      console.error(`  Error on slide ${i + 1}:`, err.message);
    }
  }

  // Save the presentation
  const outputPath = path.join(OUTPUT_DIR, '怪盗基德.pptx');
  await pptx.writeFile({ fileName: outputPath });
  console.log(`\nPresentation saved to: ${outputPath}`);
}

createPresentation().catch(console.error);
